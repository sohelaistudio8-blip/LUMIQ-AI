/* Integration boundaries (Phase 1: all DISABLED). Nothing here contacts a network or fakes a result.
   Each adapter is replaced when its external setup is approved, verified and configured server-side. */
LQ.integrations=(()=>{const off=(id,why)=>({id,status:"awaiting_setup",why,async call(){throw{code:"NOT_CONFIGURED",message:why}}});
 return{tutor:off("OpenAI AI Tutor","Needs an approved adult-owned OpenAI account, under-18 safeguards, a server-side key and your approval"),
 auth:off("Accounts (Supabase)","Needs a Supabase project and verified RLS"),voice:off("Voice (speech & TTS)","Needs a device test and provider approval; voice cloning stays disabled"),
 support:off("Support email & tickets","support.lumiq@gmail.com is proposed, not confirmed"),admin:off("Admin dashboard","Needs server-side roles"),ads:off("Advertising","Needs policy, legal and minors checks; no ads without approval")}})();
