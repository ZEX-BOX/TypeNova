"use client";
import { useEffect, useMemo, useState } from "react";
import { calculateLiveMetrics } from "@typenova/typing-engine";
const LESSONS = [
 {id:"moonlit-dojo",title:"The Moonlit Dojo",level:"BEGINNER",text:"At sunset, Aiko entered the quiet dojo with a wooden sword in her hand. Her master smiled and asked her to begin with one perfect move."},
 {id:"crimson-comet",title:"Crimson Comet",level:"BEGINNER",text:"A crimson comet crossed the sky above the academy. Ren made a promise beneath its light: he would never abandon his friends again."},
 {id:"spirit-gate",title:"The Spirit Gate",level:"INTERMEDIATE",text:"Beyond the old torii gate, blue lanterns floated between ancient trees. A tiny spirit bowed politely and pointed toward the hidden mountain path."},
 {id:"last-train",title:"The Last Train",level:"BEGINNER",text:"The last train rattled through the sleeping city. Hana watched the neon lights pass by and wondered what adventure waited at the next station."},
 {id:"dragon-heart",title:"Dragon Heart",level:"INTERMEDIATE",text:"A young dragon curled around the tower while its rider studied the stars. Trust was stronger than fire, and their bond could cross any storm."},
 {id:"shadow-clan",title:"Shadow Clan",level:"INTERMEDIATE",text:"The shadow clan moved silently across the rooftops. Their mission was simple: protect the village before the first bell rang at dawn."},
 {id:"sakura-promise",title:"Sakura Promise",level:"BEGINNER",text:"Pink petals drifted across the school courtyard. Yuna held out her hand and promised to meet her teammate beneath the same tree next spring."},
 {id:"sky-pirates",title:"Sky Pirates",level:"INTERMEDIATE",text:"The sky pirates raised their silver sails above the clouds. Their captain unfolded a map and marked the island that appeared only during a thunderstorm."},
 {id:"forgotten-power",title:"Forgotten Power",level:"ADVANCED",text:"A forgotten power awakened inside the crystal chamber. Its keeper felt the floor tremble, yet chose patience over the temptation to strike first."},
 {id:"festival-lights",title:"Festival of Lights",level:"BEGINNER",text:"Paper lanterns glowed along the river as the summer festival began. Friends shared warm noodles, traded lucky charms, and laughed beneath the fireworks."},
 {id:"mecha-pilot",title:"The New Pilot",level:"INTERMEDIATE",text:"The giant mecha powered up with a deep metallic roar. Its nervous pilot checked every control twice before stepping onto the training field."},
 {id:"forest-spirit",title:"Forest Spirit",level:"BEGINNER",text:"A forest spirit appeared beside the waterfall with leaves tangled in its hair. It offered the travelers a glowing seed and a mysterious warning."},
 {id:"rival-duel",title:"Friendly Rival",level:"INTERMEDIATE",text:"Two rivals faced each other in the arena, both eager to prove their progress. They bowed before the match because respect mattered more than victory."},
 {id:"star-academy",title:"Star Academy",level:"BEGINNER",text:"At Star Academy, every student trained with a different kind of magic. Kaito practiced light spells until the classroom filled with tiny golden birds."},
 {id:"winter-episode",title:"Winter Episode",level:"BEGINNER",text:"Snow covered the rooftops of the little town. The team gathered near the heater, shared their favorite stories, and planned tomorrow's journey."},
 {id:"ancient-scroll",title:"The Ancient Scroll",level:"ADVANCED",text:"The ancient scroll described a technique that required calm breathing and perfect timing. One careless movement could break the seal protecting the valley."},
 {id:"portal-world",title:"Portal to Another World",level:"INTERMEDIATE",text:"A violet portal opened inside the abandoned station. Mira stepped forward carefully, carrying a compass, a notebook, and a promise to return."},
 {id:"hero-training",title:"Hero Training",level:"BEGINNER",text:"The young hero ran up the hill before sunrise. Each lap made the backpack feel lighter, and each failure taught a useful lesson."},
 {id:"thunder-sword",title:"Thunder Sword",level:"ADVANCED",text:"Lightning flashed along the blade as the warrior entered the storm. The secret technique demanded focus, balance, and a heart free from doubt."},
 {id:"summer-finale",title:"Summer Finale",level:"BEGINNER",text:"The class watched the final sunset from the school roof. Nobody wanted the festival to end, so they agreed to create one more unforgettable memory."},
 {id:"crystal-cavern",title:"Crystal Cavern",level:"INTERMEDIATE",text:"Inside the crystal cavern, every footstep returned as a soft echo. A blue butterfly led the explorers toward a door hidden behind the waterfall."},
 {id:"fox-mask",title:"The Fox Mask",level:"BEGINNER",text:"A little fox wearing a red mask waited beside the shrine. It wagged its tail twice, then dashed away with the hero's missing key."},
 {id:"battle-strategy",title:"Battle Strategy",level:"ADVANCED",text:"The commander studied the arena before choosing a formation. Speed could create an opening, but teamwork would decide whether the squad held its ground."},
 {id:"floating-island",title:"Floating Island",level:"INTERMEDIATE",text:"A floating island drifted above the clouds, covered in bright flowers and old stone bridges. The crew anchored their airship and began exploring."},
 {id:"magic-library",title:"Magic Library",level:"INTERMEDIATE",text:"Books whispered softly in the magic library. Nori searched for a healing spell while a sleepy owl guarded the staircase to the forbidden archive."},
 {id:"midnight-race",title:"Midnight Race",level:"BEGINNER",text:"Engines hummed beneath the midnight sky as the racers lined up. Kai tightened his gloves, smiled at his friends, and waited for the signal."},
 {id:"phoenix-reborn",title:"Phoenix Reborn",level:"ADVANCED",text:"The phoenix rose from the ashes with wings of burning gold. Its return marked the beginning of a new age, but the kingdom still needed a brave guardian."},
 {id:"hidden-village",title:"Hidden Village",level:"BEGINNER",text:"A narrow path led to a village tucked between green mountains. Children practiced their moves in the square while elders prepared a welcome feast."},
 {id:"clockwork-city",title:"Clockwork City",level:"INTERMEDIATE",text:"Gears turned beneath the streets of the clockwork city. An apprentice mechanic followed the ticking sound and discovered a machine no one remembered building."},
 {id:"final-exam",title:"The Final Exam",level:"INTERMEDIATE",text:"The final exam tested more than strength. Each student had to solve a puzzle, help a teammate, and keep a clear mind under pressure."},
 {id:"ocean-kingdom",title:"Ocean Kingdom",level:"BEGINNER",text:"The ocean kingdom shimmered beneath the waves. A young merfolk guide showed the visitors a garden where glowing fish danced around coral towers."},
 {id:"paper-crane",title:"A Thousand Cranes",level:"BEGINNER",text:"Emi folded a paper crane for every wish her team had made. By sunrise, the windowsill was full of bright wings and quiet hope."},
 {id:"storm-riders",title:"Storm Riders",level:"ADVANCED",text:"The storm riders launched their gliders into the fierce wind. Their route crossed a field of lightning, so every turn had to be precise."},
 {id:"comet-cafe",title:"Comet Cafe",level:"BEGINNER",text:"After training, the friends met at the Comet Cafe for sweet buns and warm tea. Their captain listened carefully while everyone shared one small victory."},
 {id:"guardian-beast",title:"Guardian Beast",level:"INTERMEDIATE",text:"A giant guardian beast blocked the bridge but did not attack. The hero lowered the sword, noticed its injured paw, and offered help instead."},
 {id:"echoing-canyon",title:"Echoing Canyon",level:"INTERMEDIATE",text:"A strange melody echoed through the canyon at dusk. The team followed its rhythm until they found a hidden chamber beneath the red cliffs."},
 {id:"spellbook-secret",title:"Spellbook Secret",level:"ADVANCED",text:"The spellbook revealed its final page only when moonlight touched the ink. Its message challenged the apprentice to choose wisdom instead of power."},
 {id:"festival-duel",title:"Festival Duel",level:"BEGINNER",text:"The festival duel began with a playful bow and a burst of colored sparks. Both friends laughed when their wooden swords landed at exactly the same moment."},
 {id:"new-horizon",title:"New Horizon",level:"INTERMEDIATE",text:"The crew reached the edge of the map and saw a new continent below the sunrise. They raised their flag, checked their supplies, and set off together."},
 {id:"silent-sentinel",title:"Silent Sentinel",level:"ADVANCED",text:"The silent sentinel guarded the mountain pass for a hundred years. When the lost child arrived, the ancient warrior finally stepped away from the stone throne."},
];
type View="practice"|"learn"|"insights"; type Mode="practice"|"speed";
type Session={date:string;wpm:number;accuracy:number;mode:Mode};
export function PracticeWorkspace(){
 const [view,setView]=useState<View>("practice"),[mode,setMode]=useState<Mode>("practice"),[lessonId,setLessonId]=useState("focus");
 const [typed,setTyped]=useState(""),[startedAt,setStartedAt]=useState<number|null>(null),[now,setNow]=useState(Date.now()),[finished,setFinished]=useState(false);
 const [sessions,setSessions]=useState<Session[]>([]),[loaded,setLoaded]=useState(false);
 const [usedPassages,setUsedPassages]=useState<string[]>([]);
 const lesson=LESSONS.find(x=>x.id===lessonId)??LESSONS[0]!,passage=lesson.text;
 const elapsed=startedAt===null?0:Math.max(0,(now-startedAt)/1000),remaining=Math.max(0,60-elapsed);
 const metrics=useMemo(()=>calculateLiveMetrics(passage,typed,elapsed),[passage,typed,elapsed]);
 const complete=finished||(mode==="practice"&&typed.length>=passage.length);
 useEffect(()=>{try{const value=localStorage.getItem("typenova:sessions");if(value)setSessions(JSON.parse(value) as Session[]);const used=localStorage.getItem("typenova:used-passages");if(used)setUsedPassages(JSON.parse(used) as string[])}catch{}setLoaded(true)},[]);
 useEffect(()=>{if(startedAt===null||finished)return;const id=window.setInterval(()=>setNow(Date.now()),200);return()=>window.clearInterval(id)},[startedAt,finished]);
 function finish(){if(finished)return;if(typed.length){const result=calculateLiveMetrics(passage,typed,elapsed);const row:Session={date:new Date().toISOString(),wpm:result.wpm,accuracy:result.accuracy,mode};setSessions(old=>{const next=[row,...old].slice(0,100);try{localStorage.setItem("typenova:sessions",JSON.stringify(next))}catch{}return next})}setFinished(true)}
 useEffect(()=>{if(mode==="speed"&&startedAt!==null&&remaining<=0&&!finished)finish()},[mode,startedAt,remaining,finished]);
 function begin(nextMode:Mode="practice",nextLesson?:string){
  let chosen = LESSONS.find(x=>x.id===nextLesson);
  if(!chosen){
   let available=LESSONS.filter(x=>!usedPassages.includes(x.id)&&x.id!==lessonId);
   if(available.length===0){available=LESSONS.filter(x=>x.id!==lessonId);setUsedPassages([]);try{localStorage.setItem("typenova:used-passages","[]")}catch{}}
   chosen=available[Math.floor(Math.random()*available.length)]??LESSONS[0]!;
   const nextUsed=[...usedPassages,chosen.id];
   setUsedPassages(nextUsed);try{localStorage.setItem("typenova:used-passages",JSON.stringify(nextUsed))}catch{}
  }
  setLessonId(chosen.id);setMode(nextMode);setTyped("");setStartedAt(null);setNow(Date.now());setFinished(false);setView("practice")
 }
 function change(value:string){if(finished)return;if(startedAt===null&&value.length)setStartedAt(Date.now());setTyped(value.slice(0,passage.length))}
 const hour=new Date().getHours(),arc=hour<6?"NIGHT ARC":hour<12?"MORNING ARC":hour<18?"AFTERNOON ARC":"EVENING ARC";
 const chars=passage.split("").map((c,i)=>{const v=typed[i],state=v===undefined?(i===typed.length?"current":"pending"):v===c?"correct":"incorrect";return <span className={"letter letter--"+state} key={i}>{c}</span>});
 const best=sessions.length?Math.max(...sessions.map(x=>x.wpm)):0,avg=sessions.length?Math.round(sessions.reduce((a,x)=>a+x.accuracy,0)/sessions.length):0;
 return <main className="app-shell"><aside className="sidebar">
  <a className="brand" href="#home" onClick={e=>{e.preventDefault();setView("practice")}}><span className="brand-mark">N</span><span>Type<span className="brand-accent">Nova</span></span></a>
  <div className="side-label">YOUR UNIVERSE</div><nav className="nav-list" aria-label="Main navigation">
   <button className={"nav-item "+(view==="practice"?"nav-item--active":"")} onClick={()=>setView("practice")}>⌁ Practice</button>
   <button className={"nav-item "+(view==="learn"?"nav-item--active":"")} onClick={()=>setView("learn")}>▤ Learning path</button>
   <button className={"nav-item "+(view==="insights"?"nav-item--active":"")} onClick={()=>setView("insights")}>◈ My progress</button>
  </nav><div className="sidebar-art"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="moon">✦</div><div className="art-caption">LEVEL UP<br/><b>EVERY DAY</b></div></div>
  <div className="sidebar-bottom"><div className="avatar">G</div><div><strong>Guest learner</strong><span>Saved on this device</span></div><i className="online-dot"/></div>
 </aside><section className="main-area"><header className="topbar"><div className="breadcrumb">TYPENOVA <span>/</span> {view==="practice"?"TRAINING ROOM":view==="learn"?"LEARNING PATH":"YOUR PROGRESS"}</div><div className="top-pill"><i className="status-dot"/> SYSTEM ONLINE</div></header>
 {view==="practice"&&<><section className="hero-row"><div className="hero-copy"><p className="eyebrow">✦ YOUR TRAINING ARC STARTS HERE</p><h1>Become the <span>main character</span><br/>of your own progress.</h1><p className="hero-subtitle">A little practice today. A whole new level tomorrow.</p><div className="hero-actions"><button className="primary-button" onClick={()=>begin("practice")}>Start training ↗</button><button className="outline-button" onClick={()=>setView("learn")}>Explore lessons</button></div></div>
 <div className="hero-visual" aria-label="Anime-inspired character illustration"><div className="visual-ring"/><div className="visual-ring ring-two"/><span className="visual-star star-one">✦</span><span className="visual-star star-two">✧</span><div className="character-halo"/><div className="character"><div className="hair-back"/><div className="face"><i/><i/><b/></div><div className="hair-front"/><div className="collar"/></div><div className="visual-tag">YOUR STORY · CHAPTER 01</div></div></section>
 <div className="section-heading"><div><p className="eyebrow">TRAINING MODULE</p><h2>Choose your challenge</h2></div><span className="subtle-label">FOCUS · FLOW · IMPROVE</span></div>
 <section className="practice-card"><div className="practice-head"><div><span className="eyebrow">{mode==="speed"?"60-SECOND CHALLENGE":"DAILY WARM-UP"}</span><h3>{mode==="speed"?"Speed run":lesson.title}</h3></div><div className="mode-switch"><button className={mode==="practice"?"selected":""} onClick={()=>begin("practice")}>Practice</button><button className={mode==="speed"?"selected":""} onClick={()=>begin("speed")}>60s test</button></div></div>
 <div className="session-options"><span>✦ {lesson.level}</span><span>✧ {arc}</span><span>⌨ QWERTY</span><span>◷ {mode==="speed"?"60 SECONDS":"UNTIMED"}</span><strong className="timer" aria-live="off">{mode==="speed"?`${Math.ceil(remaining)}s LEFT`:`${Math.floor(elapsed/60).toString().padStart(2,"0")}:${Math.floor(elapsed%60).toString().padStart(2,"0")} ELAPSED`}</strong></div><div className="typing-area">{chars}</div>
 <label className="sr-only" htmlFor="typing-input">Type the displayed passage here</label><textarea id="typing-input" className="typing-input" value={typed} onChange={e=>change(e.target.value)} onPaste={e=>e.preventDefault()} placeholder="Click here and start typing… paste is disabled" disabled={complete} spellCheck={false} autoCapitalize="off" autoCorrect="off"/>
 <div className="practice-footer"><span>{typed.length} / {passage.length} characters <i className="progress-track"><i style={{width:Math.min(100,typed.length/passage.length*100)+"%"}}/></i></span><div className="footer-actions"><button className="quiet-button" onClick={()=>begin(mode)}>↻ Restart</button><button className="primary-button" onClick={finish} disabled={!typed.length||finished}>Finish session →</button></div></div></section>
 <section className="metrics-grid"><Metric label="LIVE SPEED" value={String(metrics.wpm)} unit="WPM"/><Metric label="ACCURACY" value={String(metrics.accuracy)} unit="%"/><Metric label="CORRECT" value={String(metrics.correctCharacters)} unit="CHARS"/><Metric label="ERRORS" value={String(metrics.errors)} unit="MISTAKES"/></section>
 {complete&&<div className="completion-note"><span>✦</span><div><strong>Training complete!</strong><p>Your session has been saved on this device.</p></div><button className="quiet-button" onClick={()=>begin(mode)}>Train again ↗</button></div>}</>}
 {view==="learn"&&<section className="content-view"><p className="eyebrow">✦ THE LEARNING PATH</p><h1>Every legend <span>starts somewhere.</span></h1><p className="hero-subtitle">Pick a lesson, build your muscle memory, and unlock your next level.</p><div className="lesson-grid">{LESSONS.map((item,i)=><article className="lesson-card" key={item.id}><div className="lesson-number">0{i+1}</div><span className="eyebrow">{item.level} · GUIDED PRACTICE</span><h3>{item.title}</h3><p>{item.text}</p><button className="outline-button" onClick={()=>begin("practice",item.id)}>Start lesson ↗</button></article>)}</div><div className="info-strip">✧ <p>Accuracy is your foundation. Slow down enough to type cleanly, then let speed grow naturally.</p></div></section>}
 {view==="insights"&&<section className="content-view"><p className="eyebrow">✦ YOUR JOURNEY SO FAR</p><h1>Progress looks <span>good on you.</span></h1><p className="hero-subtitle">Your completed sessions are stored locally in this browser.</p><div className="insight-grid"><Metric label="TOTAL SESSIONS" value={String(sessions.length)} unit="ROUNDS"/><Metric label="PERSONAL BEST" value={String(best)} unit="WPM"/><Metric label="AVG. ACCURACY" value={String(avg)} unit="%"/></div><div className="history-card"><div className="history-head"><h3>Recent sessions</h3><span>{sessions.length} SAVED</span></div>{!loaded?<p className="empty-state">Loading…</p>:sessions.length===0?<div className="empty-state"><span>✦</span><strong>Your story is waiting to be written.</strong><p>Complete your first typing session and stats appear here.</p><button className="primary-button" onClick={()=>begin("practice")}>Start first session ↗</button></div>:<div className="history-list">{sessions.slice(0,10).map((s,i)=><div className="history-row" key={s.date+i}><div><strong>{s.mode==="speed"?"60-second test":"Practice session"}</strong><span>{new Date(s.date).toLocaleString()}</span></div><b>{s.wpm} <small>WPM</small></b><b>{s.accuracy}% <small>ACC</small></b></div>)}</div>}</div></section>}
 <footer className="page-footer">TYPE WITH PURPOSE <span>✦</span> WRITE YOUR NEXT CHAPTER</footer></section></main>;
}
function Metric({label,value,unit}:{label:string;value:string;unit:string}){return <article className="metric-card"><span className="eyebrow">{label}</span><div><strong>{value}</strong><span>{unit}</span></div></article>}
