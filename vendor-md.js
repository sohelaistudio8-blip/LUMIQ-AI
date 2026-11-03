/* Safe Markdown renderer: adapted copy of a previously browser-tested renderer. Escapes all HTML; only https/http links. */

const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function inl(s){return s.split(/(`[^`]+`)/).map((x,i)=>i%2?`<code>${x.slice(1,-1)}</code>`:x.replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g,"$1<i>$2</i>").replace(/!?\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')).join("")}
const LI=/^\s*([-*•]|\d+[.)])\s+/,HR=/^\s*(-{3,}|\*{3,})\s*$/,SEP=/^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
function blocks(t){const L=t.split("\n"),o=[];let i=0,m;
 while(i<L.length){const l=L[i];
  if(!l.trim()){i++;continue}
  if(m=l.match(/^(#{1,4})\s+(.*)/)){const n=m[1].length+2>5?5:m[1].length+2;o.push(`<h${n}>${inl(esc(m[2]))}</h${n}>`);i++;continue}
  if(HR.test(l)){o.push("<hr>");i++;continue}
  if(l.includes("|")&&i+1<L.length&&SEP.test(L[i+1])){const row=r=>r.trim().replace(/^\||\|$/g,"").split("|").map(c=>inl(esc(c.trim())));
   const h=row(l),b=[];i+=2;while(i<L.length&&L[i].trim()&&L[i].includes("|")){b.push(row(L[i]));i++}
   o.push(`<div class="tw"><table><thead><tr>${h.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${b.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);continue}
  if(LI.test(l)){const ord=/^\s*\d+[.)]/.test(l),it=[];while(i<L.length&&LI.test(L[i])){it.push(inl(esc(L[i].replace(LI,""))));i++}
   const tg=ord?"ol":"ul";o.push(`<${tg}>${it.map(x=>`<li>${x}</li>`).join("")}</${tg}>`);continue}
  if(/^>\s?/.test(l)){const q=[];while(i<L.length&&/^>\s?/.test(L[i])){q.push(inl(esc(L[i].replace(/^>\s?/,""))));i++}o.push(`<blockquote>${q.join("<br>")}</blockquote>`);continue}
  const p=[];while(i<L.length&&L[i].trim()&&!/^(#{1,4}\s|>)/.test(L[i])&&!LI.test(L[i])&&!HR.test(L[i])){p.push(inl(esc(L[i])));i++}
  if(!p.length){p.push(inl(esc(L[i])));i++}
  o.push(`<p>${p.join("<br>")}</p>`)}
 return o.join("")}
function code(p){const m=p.match(/^```([^\n`]*)\n?([\s\S]*?)(?:```)?$/),lg=esc((m[1]||"").trim().slice(0,20));
 return `<div class="cb"><div class="cbh"><span>${lg||"code"}</span><button data-a="cc">Copy</button></div><pre><code>${esc(m[2].replace(/\n$/,""))}</code></pre></div>`}
const md=s=>s.split(/(```[\s\S]*?(?:```|$))/g).map((p,i)=>i%2?code(p):blocks(p)).join("");
