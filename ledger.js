// Advanciana Alpha 0.12 — Ledger Town + first Haven extension
S.quizDone=S.quizDone||false;S.starterRoom=S.starterRoom||false;
stages.ledger={w:2100,h:1450,cls:'ledgerWorld',place:'Ledger Town',phase:'Day',lead:'Explore Ledger Town. Find somewhere that can help you make sense of this place.',hot:[{id:'ledgerSign',x:300,y:1110,r:90,label:'Ledger Town'},{id:'exchange',x:610,y:780,r:115,label:'The Exchange'},{id:'clock',x:1080,y:540,r:125,label:'Clock Tower'},{id:'counting',x:850,y:680,r:105,label:'Counting House'},{id:'industria',x:1390,y:690,r:115,label:'Industria Office'},{id:'vault',x:1720,y:790,r:110,label:'Vault'},{id:'ledgerHaven',x:1570,y:1090,r:120,label:'Butterfly Cabin'}]};
stages.haven={w:1800,h:1200,cls:'havenWorld',place:'Advan Haven',phase:'Day',lead:'Look around the Haven.',hot:[{id:'store',x:480,y:690,r:125,label:'Store'},{id:'healing',x:1120,y:650,r:120,label:'Healing'},{id:'lodging',x:1200,y:930,r:115,label:'Lodging ↓'},{id:'quizDoor',x:1530,y:570,r:110,label:'Side Room'},{id:'havenExit',x:190,y:930,r:105,label:'Ledger Town'}]};
stages.quizroom={w:1500,h:1050,cls:'quizWorld',place:'Advan Haven · Discovery Room',phase:'Day',lead:'Take the compatibility quiz.',hot:[{id:'quizDesk',x:1120,y:300,r:115,label:'Quiz Desk'},{id:'playArea',x:760,y:650,r:150,label:'Play Area'},{id:'bench',x:260,y:650,r:110,label:'Bench'},{id:'quizExit',x:1320,y:900,r:95,label:'Main Haven'}]};
const oldInteract=interact;
interact=function(id){
 if(S.stage==='ledger'){
  if(id==='ledgerSign'){addLog('Ledger Town','Brick streets, warm lamps and a clock tower mark the first town beyond the Preserve.');showDialog('LEDGER TOWN — Numbers Build Brighter Tomorrows. Beyond the sign, cobblestone streets climb toward a towering clock.');}
  if(id==='exchange')showDialog('THE EXCHANGE — Buy · Sell · Trade · Supplies. Warm light spills through its windows, but you still have no idea what half the signs inside mean.');
  if(id==='clock')showDialog('The Clock Tower dominates the skyline. A navy banner hangs beneath its enormous face. Whatever this town is built around, time and numbers seem to matter here.');
  if(id==='counting')showDialog('COUNTING HOUSE — Records · Administration. People move in and out carrying ledgers and folders.');
  if(id==='industria')showDialog('INDUSTRIA OFFICE — Mackenna. Something about the building feels important, but you have more basic questions first.');
  if(id==='vault')showDialog('VAULT — Secure Storage. Heavy doors and brass fixtures make its purpose fairly obvious.');
  if(id==='ledgerHaven'){addLog('Advan Haven','A familiar butterfly marks a cabin in Ledger Town. This one is open — and occupied.');S.x=300;S.y=900;S.zoom=.76;S.camX=S.camY=0;persist();loadStage('haven');}
  persist();return;
 }
 if(S.stage==='haven'){
  if(id==='store')showDialog('Shelves fill the wide windowed side of the cabin: balms, aromatics, food, travel gear and supplies. A small sign reads STORE.');
  if(id==='healing')showDialog('The back area is arranged for care rather than cooking — padded spaces, clean supplies and the same butterfly emblem. This is where injured Advans are treated.');
  if(id==='lodging')showDialog('A staircase descends to traveler lodging below. For the first time since stepping through the doorway, you realize you could actually sleep somewhere safe.');
  if(id==='quizDoor'){S.x=1240;S.y=850;S.zoom=.8;S.camX=S.camY=0;persist();loadStage('quizroom');addLog('Discovery Room','A side room in the Haven is set aside for meeting Advans, not buying them.');}
  if(id==='havenExit'){S.x=1570;S.y=1170;S.zoom=.68;S.camX=S.camY=0;persist();loadStage('ledger');}
  return;
 }
 if(S.stage==='quizroom'){
  if(id==='bench')showDialog('A sturdy bench runs along the wall beside an open play space scattered with a ball, a chew toy and a few strange objects you cannot identify.');
  if(id==='playArea'){if(!S.quizDone)showDialog('The room is clearly meant for creatures to play in, but it is quiet right now. Someone has carefully prepared three separate spaces along the far wall.');else showDialog('Three small spaces wait beyond the play area. You hear movement behind them. Your quiz did not choose for you — it only helped decide who you should meet.');}
  if(id==='quizDesk')startStarterQuiz();
  if(id==='quizExit'){S.x=1500;S.y=650;S.zoom=.76;S.camX=S.camY=0;persist();loadStage('haven');}
  return;
 }
 oldInteract(id);
};
function startStarterQuiz(){
 if(S.quizDone){showDialog('Your answers are already recorded. The important part comes next: meeting them.');return;}
 const answers=[];
 const q=[['When something unfamiliar appears in front of you, what feels most natural?',['Move toward it and figure it out.','Watch carefully before deciding.','Look for another way to understand it.']],['What matters most in a companion?',['Courage when things get difficult.','Trust and connection.','Curiosity and growth.']],['You find a path nobody seems to have taken. What do you do?',['Take the first step.','Study where it leads.','See what is growing around it first.']]];
 let n=0;function ask(){let [t,a]=q[n];showDialog(t,a.map((label,i)=>({label,go:()=>{answers.push(i);n++;if(n<q.length)ask();else finish();}})));}
 function finish(){let score=[0,0,0];answers.forEach(x=>score[x]++);let best=score.indexOf(Math.max(...score));let names=['Zavie','Kitara','Groki'];S.quizDone=true;S.quizHint=names[best];persist();addLog('Compatibility Quiz','The Haven quiz suggested a first introduction, but the choice — and the bond — still belongs to you and the Advans.');showDialog(`The result settles on a name: ${names[best]}.\n\n“That's only where we'll start,” the Haven keeper explains. “A quiz can't choose a bond for you. Come meet them.”`,[{label:'ENTER THE PLAY AREA',go:starterReveal}]);}
 ask();
}
function starterReveal(){S.starterRoom=true;persist();showDialog('A divider opens at the far end of the room. Three very different little creatures look back at you. One flickers with warmth, one watches with bright blue eyes, and one peers out from beneath tiny leaves.\n\nFor the first time, you are face-to-face with Advans.\n\nYou are not choosing from a menu. You can meet them first.');$('leadText').textContent='Meet the Advans. Your first bond begins here.';}
ledgerTease=function(){S.stage='ledgerTrail';persist();$('game').classList.add('hidden');$('cinematic').classList.remove('hidden');$('cinematic').style.backgroundImage='linear-gradient(155deg,#9fc5d0 0%,#426856 38%,#253b32 65%,#111b20 100%)';$('cinText').innerHTML='The trail winds downward through evergreen forest. Waterfalls thunder somewhere below.<br><br>Then, between the trees, you see brick rooftops — and a clock tower rising above them.';$('cinematic').onclick=()=>{S.stage='ledger';S.x=280;S.y=1190;S.zoom=.68;S.camX=S.camY=0;persist();$('cinematic').classList.add('hidden');$('game').classList.remove('hidden');loadStage('ledger');addLog('The Mountain Trail','The Preserve trail descended through waterfalls and forest until Ledger Town appeared below.');};};
const oldResume=resume;resume=function(){$('menu').classList.add('hidden');if(['ledger','haven','quizroom'].includes(S.stage)){loadStage(S.stage);return}if(S.stage==='ledgerTrail'){ledgerTease();return}oldResume();};