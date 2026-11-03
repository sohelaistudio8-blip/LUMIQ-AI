/* LUMIQ core: validated local storage, i18n, spaced repetition. Local data is NOT cloud-synchronised. */
window.LQ=(()=>{const KEY="lumiq.v1",L={};
const D0=()=>({profile:null,subjects:[],tasks:[],notes:[],cards:[],quizzes:[],attempts:[],focus:[],plans:[],resources:[],settings:{theme:"auto",lang:"en",big:false,calm:false}});
const ARR=["subjects","tasks","notes","cards","quizzes","attempts","focus","plans","resources"];
L.uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-3);
L.today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
L.note="";
L.normalizeAnswer=v=>String(v??"").normalize("NFKC").trim().replace(/\s+/g," ").toLocaleLowerCase();
function load(){let raw=null;try{raw=localStorage.getItem(KEY)}catch(e){}const d=D0();if(!raw)return d;
 try{const o=JSON.parse(raw);if(!o||typeof o!=="object"||Array.isArray(o))throw 0;
  for(const k of ARR)if(Array.isArray(o[k]))d[k]=o[k].filter(x=>x&&typeof x==="object"&&typeof x.id==="string");
  if(o.profile&&typeof o.profile==="object"){const p=o.profile,c=(v,n)=>String(v||"").slice(0,n);d.profile={name:c(p.name,40),level:c(p.level,30),country:c(p.country,40),goals:c(p.goals,200),pref:c(p.pref,20)}}
  const s=o.settings||{};d.settings={theme:["auto","light","dark"].includes(s.theme)?s.theme:"auto",lang:s.lang==="bn"?"bn":"en",big:s.big===true,calm:s.calm===true};return d}
 catch(e){try{localStorage.setItem(KEY+".bad",raw.slice(0,200000));localStorage.removeItem(KEY)}catch(e2){}L.note="Saved data was unreadable and was reset (a copy was kept).";return D0()}}
L.D=load();
L.save=()=>{try{localStorage.setItem(KEY,JSON.stringify(L.D));return true}catch(e){L.toast("Couldn’t save: storage is full or blocked. Changes last only until you close this page.");return false}};
L.wipe=()=>{try{Object.keys(localStorage).filter(k=>k.startsWith("lumiq.")).forEach(k=>localStorage.removeItem(k))}catch(e){}L.D=D0()};
let tt;L.toast=m=>{const e=document.getElementById("toast");if(!e)return;e.textContent=m;e.hidden=!m;clearTimeout(tt);if(m)tt=setTimeout(()=>e.hidden=true,4500)};
const I={en:{home:"Home",plan:"Planner",notes:"Notes",cards:"Cards",more:"More",hello:"Hello",due:"Cards due",focusmin:"Focus min today",todaytasks:"Today’s tasks",none:"Nothing here yet.",add:"Add",save:"Save",cancel:"Cancel",start:"Get started",login:"Log in",signup:"Sign up",review:"Review cards:",firstnote:"Write your first note",startfocus:"Start a focus session",tutor_off:"AI Tutor is not connected yet (awaiting setup and approval).",hero:"Plan, practise and revise with tools that work on your phone.",local:"Your data stays on this device and is not cloud-synchronised.",subjects:"Subjects",quiz:"Quizzes",focus:"Focus",revision:"Revision",resources:"Resources",progress:"Progress",settings:"Settings",title:"Title",preview:"Preview",edit:"Edit",newnote:"New note",search:"Search…"},
bn:{home:"হোম",plan:"প্ল্যানার",notes:"নোটস",cards:"কার্ড",more:"আরও",hello:"হ্যালো",due:"রিভিশনের কার্ড",focusmin:"আজকের ফোকাস (মিনিট)",todaytasks:"আজকের কাজ",none:"এখনো কিছু নেই।",add:"যোগ করুন",save:"সংরক্ষণ",cancel:"বাতিল",start:"শুরু করুন",login:"লগইন",signup:"সাইন আপ",review:"কার্ড রিভিউ:",firstnote:"প্রথম নোট লিখুন",startfocus:"ফোকাস সেশন শুরু করুন",tutor_off:"AI টিউটর এখনো সংযুক্ত নয় (সেটআপ ও অনুমোদনের অপেক্ষায়)।",hero:"ফোনেই পরিকল্পনা, অনুশীলন ও রিভিশন করুন।",local:"আপনার ডেটা এই ডিভাইসেই থাকে, ক্লাউডে সিঙ্ক হয় না।",subjects:"বিষয়",quiz:"কুইজ",focus:"ফোকাস",revision:"রিভিশন",resources:"রিসোর্স",progress:"অগ্রগতি",settings:"সেটিংস",title:"শিরোনাম",preview:"প্রিভিউ",edit:"সম্পাদনা",newnote:"নতুন নোট",search:"খুঁজুন…"}};
L.t=k=>(I[L.D.settings.lang]||I.en)[k]||I.en[k]||k;
/* Simplified SM-2 spaced repetition. g: 0 again, 1 hard, 2 good, 3 easy */
L.sm2=(c,g,today)=>{let ease=c.ease||2.5,reps=c.reps||0,int=c.int||0;
 if(g===0){reps=0;int=0;ease=Math.max(1.3,ease-.2)}
 else{reps++;ease=Math.max(1.3,ease+(g===1?-.15:g===3?.15:0));int=reps===1?(g===3?4:1):reps===2?(g===1?3:g===3?8:6):Math.round(int*ease*(g===1?.8:g===3?1.3:1))}
 return{...c,ease,reps,int,due:g===0?today:addDays(today,Math.max(1,int))}};
return L})();
