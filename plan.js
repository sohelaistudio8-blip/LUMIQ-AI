/* Revision plan generator (date arithmetic only, no AI). Adapted copy of a unit-tested implementation. */
const addDays=(s,n)=>{const [y,m,d]=s.split("-").map(Number);return new Date(Date.UTC(y,m-1,d+n)).toISOString().slice(0,10)};
const dayDiff=(a,b)=>{const f=s=>{const [y,m,d]=s.split("-").map(Number);return Date.UTC(y,m-1,d)};return Math.round((f(b)-f(a))/864e5)};
function validISODate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s||""))return false;const [y,m,d]=s.split("-").map(Number),x=new Date(Date.UTC(y,m-1,d));return x.getUTCFullYear()===y&&x.getUTCMonth()===m-1&&x.getUTCDate()===d}
function mkPlan(exam,topics,start,uid){const tp=(topics||"").split("\n").map(x=>x.trim()).filter(Boolean).slice(0,60);
 if(!tp.length)return{err:"Add at least one topic."};
 if(!validISODate(exam)||!validISODate(start))return{err:"Choose a valid exam date."};
 const n=dayDiff(start,exam);if(!(n>=1))return{err:"Choose an exam date after today."};if(n>90)return{err:"Plans can cover up to 90 days."};
 const out=[],seen=new Set(),sd=n-1;
 for(let i=0;i<sd;i++){const a=Math.floor(i*tp.length/sd),z=Math.max(a+1,Math.floor((i+1)*tp.length/sd)),g=tp.slice(a,z),fresh=g.some(x=>!seen.has(x));g.forEach(x=>seen.add(x));out.push({id:uid(),d:addDays(start,i),t:(fresh?"Study: ":"Practice: ")+g.join("; "),done:false})}
 out.push({id:uid(),d:addDays(start,n-1),t:"Revision: skim every topic and redo your mistakes",done:false});
 return{plan:out}}
