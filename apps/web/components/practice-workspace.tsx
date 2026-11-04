"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { calculateLiveMetrics } from "@typenova/typing-engine";

type Book = { id:string; title:string; author:string; category:string; description:string; accent:string; content:string; custom?:boolean };
type Progress = Record<string, number>;
type Session = { date:string; book:string; title:string; wpm:number; accuracy:number; characters:number };
type View = "library" | "reader" | "stats";

const STARTER_BOOKS:Book[] = [
 {id:"alice",title:"Alice's Adventures in Wonderland",author:"Lewis Carroll",category:"Adventure",description:"Follow Alice down the rabbit hole into a curious world of impossible things.",accent:"rose",content:`Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it.

So she was considering in her own mind whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” But when the Rabbit actually took a watch out of its waistcoat-pocket, Alice started to her feet.`},
 {id:"sherlock",title:"The Adventures of Sherlock Holmes",author:"Arthur Conan Doyle",category:"Mystery",description:"A quiet room, a sharp mind, and details that everyone else overlooks.",accent:"amber",content:`To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.

It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise, but admirably balanced mind.

The facts were simple, but the meaning was hidden. Holmes leaned back in his chair, closed his eyes, and asked me to tell the story once more, this time without leaving out the smallest detail.`},
 {id:"pride",title:"Pride and Prejudice",author:"Jane Austen",category:"Classic",description:"Sharp observations, first impressions, and the complicated business of the heart.",accent:"sage",content:`It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families that he is considered the rightful property of someone or other of their daughters.

The evening passed quietly. Conversation moved from the weather to the latest news, while every person in the room seemed to be measuring the meaning behind each polite remark.`},
 {id:"time-machine",title:"The Time Machine",author:"H. G. Wells",category:"Science Fiction",description:"A traveller looks beyond the limits of the present and into an unknown future.",accent:"blue",content:`The Time Traveller was expounding a recondite matter to us. His grey eyes shone and twinkled, and his usually pale face was flushed and animated.

The fire burned brightly, and the soft radiance of the incandescent lights caught the bubbles that flashed and passed in our glasses. Our chairs, being his patents, embraced and caressed us rather than submitted to be sat upon.

He placed a small model upon the table. It was delicate, strange, and difficult to understand, yet he spoke of it as if it were the most ordinary object in the world.`},
 {id:"frankenstein",title:"Frankenstein",author:"Mary Shelley",category:"Gothic",description:"An ambitious experiment, a storm-lit night, and the cost of creation.",accent:"violet",content:`You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings.

I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking. The cold is severe, yet my spirits remain high.

The mountains rose around us like silent guardians. Their summits disappeared into the clouds, and the wind carried a sound that seemed to come from a world far beyond our own.`},
 {id:"little-women",title:"Little Women",author:"Louisa May Alcott",category:"Classic",description:"Four sisters, one home, and the small moments that make a life.",accent:"peach",content:`“Christmas won't be Christmas without any presents,” grumbled Jo, lying on the rug.

It was a cold morning, and the little room looked cheerful in spite of the plain furniture. The sisters gathered close to the fire, each thinking of the people they loved and the work that waited for them.

They had very little money, but they had plans, hopes, and one another. That, they decided, was enough to begin with.`},
 {id:"uploaded-welcome",title:"The Art of Focus",author:"TypeNova Editors",category:"Personal Growth",description:"An original short reading about attention, patience, and deliberate practice.",accent:"ink",content:`Focus is not the absence of distraction. It is the quiet decision to return to the thing that matters, again and again.

A good practice session does not need to be long. It needs to be intentional. Give your attention to one sentence, notice each movement, and let accuracy become the foundation for speed.

Progress often arrives quietly. One day the keys feel familiar, the next the words begin to flow, and eventually a skill that once demanded effort becomes part of the way you think.`}
];

const CATEGORIES = ["All books","Classic","Adventure","Mystery","Science Fiction","Gothic","Personal Growth","My books"];
const STORE = "typenova:book-progress";
const LIBRARY_STORE = "typenova:personal-books";
const SESSIONS_STORE = "typenova:book-sessions";
const THEME_STORE = "typenova:theme";

function paragraphs(book:Book){return book.content.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean)}
function readJson<T>(key:string,fallback:T):T{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback}catch{return fallback}}

export function PracticeWorkspace(){
 const [view,setView]=useState<View>("library");
 const [mode,setMode]=useState<"read"|"type">("type");
 const [theme,setTheme]=useState<"dark"|"light">("light");
 const [query,setQuery]=useState("");
 const [category,setCategory]=useState("All books");
 const [personalBooks,setPersonalBooks]=useState<Book[]>([]);
 const [progress,setProgress]=useState<Progress>({});
 const [sessions,setSessions]=useState<Session[]>([]);
 const [activeId,setActiveId]=useState("alice");
 const [paragraphIndex,setParagraphIndex]=useState(0);
 const [typed,setTyped]=useState("");
 const [startedAt,setStartedAt]=useState<number|null>(null);
 const [now,setNow]=useState(Date.now());
 const [loaded,setLoaded]=useState(false);
 const [notice,setNotice]=useState("");
 const [fontSize,setFontSize]=useState(19);
 const [lineSpacing,setLineSpacing]=useState(1.85);
 const allBooks=[...STARTER_BOOKS,...personalBooks];
 const activeBook=allBooks.find(book=>book.id===activeId)??STARTER_BOOKS[0]!;
 const chunks=paragraphs(activeBook);
 const passage=chunks[Math.min(paragraphIndex,chunks.length-1)]??"";
 const elapsed=startedAt===null?0:Math.max(0,(now-startedAt)/1000);
 const metrics=useMemo(()=>calculateLiveMetrics(passage,typed,elapsed),[passage,typed,elapsed]);
 const currentProgress=progress[activeId]??0;
 const totalWords=activeBook.content.trim().split(/\s+/).filter(Boolean).length;
 const completedWords=chunks.slice(0,currentProgress).join(" ").trim().split(/\s+/).filter(Boolean).length;
 const completed=typed.length>=passage.length&&passage.length>0;
 const filtered=allBooks.filter(book=>{
  const matchesCategory=category==="All books"||(category==="My books"?!!book.custom:book.category===category);
  const q=query.trim().toLowerCase();
  return matchesCategory&&(!q||book.title.toLowerCase().includes(q)||book.author.toLowerCase().includes(q)||book.category.toLowerCase().includes(q));
 });
 const chars=passage.split("").map((char,index)=>{
  const value=typed[index];
  const state=value===undefined?(index===typed.length?"current":"pending"):value===char?"correct":"incorrect";
  return <span className={"book-char book-char--"+state} key={index}>{char}</span>;
 });
 const clock=(n:number)=>{const sec=Math.floor(n);return `${Math.floor(sec/60).toString().padStart(2,"0")}:${(sec%60).toString().padStart(2,"0")}`};
 const best=sessions.length?Math.max(...sessions.map(s=>s.wpm)):0;
 const average=sessions.length?Math.round(sessions.reduce((sum,s)=>sum+s.accuracy,0)/sessions.length):0;

 useEffect(()=>{
  const savedTheme=readJson<"dark"|"light">(THEME_STORE,"light");
  setTheme(savedTheme);
  setProgress(readJson<Progress>(STORE,{}));
  setPersonalBooks(readJson<Book[]>(LIBRARY_STORE,[]));
  setSessions(readJson<Session[]>(SESSIONS_STORE,[]));
  setLoaded(true);
 },[]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.body.dataset.theme=theme;try{localStorage.setItem(THEME_STORE,theme)}catch{}},[theme]);
 useEffect(()=>{if(startedAt===null)return;const timer=window.setInterval(()=>setNow(Date.now()),250);return()=>window.clearInterval(timer)},[startedAt]);
 useEffect(()=>{if(notice==="")return;const timer=window.setTimeout(()=>setNotice(""),3200);return()=>window.clearTimeout(timer)},[notice]);

 function saveProgress(bookId:string,index:number){
  setProgress(old=>{const next={...old,[bookId]:index};try{localStorage.setItem(STORE,JSON.stringify(next))}catch{}return next});
 }
 function openBook(book:Book,nextMode:"read"|"type"="type"){
  setActiveId(book.id);setParagraphIndex(Math.min(progress[book.id]??0,Math.max(0,paragraphs(book).length-1)));setTyped("");setStartedAt(null);setNow(Date.now());setMode(nextMode);setView("reader");
 }
 function nextParagraph(){
  const next=Math.min(paragraphIndex+1,chunks.length);
  saveProgress(activeId,next);setParagraphIndex(Math.min(next,chunks.length-1));setTyped("");setStartedAt(null);setNow(Date.now());
  if(next>=chunks.length){setNotice("You reached the end of this book. Lovely work.");setView("library")}
 }
 function finishParagraph(){
  if(!typed.trim())return;
  const row:Session={date:new Date().toISOString(),book:activeId,title:activeBook.title,wpm:metrics.wpm,accuracy:metrics.accuracy,characters:typed.length};
  setSessions(old=>{const next=[row,...old].slice(0,500);try{localStorage.setItem(SESSIONS_STORE,JSON.stringify(next))}catch{}return next});
  saveProgress(activeId,Math.min(paragraphIndex+1,chunks.length));
  setNotice("Paragraph saved to your reading progress.");
  if(paragraphIndex+1<chunks.length){setParagraphIndex(paragraphIndex+1);setTyped("");setStartedAt(null);setNow(Date.now())}
  else {setView("library");setTyped("");setStartedAt(null)}
 }
 function onTyping(value:string){
  if(value.length>passage.length)value=value.slice(0,passage.length);
  if(startedAt===null&&value.length)setStartedAt(Date.now());
  setTyped(value);
 }
 async function importText(event:ChangeEvent<HTMLInputElement>){
  const file=event.target.files?.[0];if(!file)return;
  if(!/\.(txt|md)$/i.test(file.name)){setNotice("For now, import a .txt or .md text file.");event.target.value="";return}
  if(file.size>2_000_000){setNotice("Please keep imported books under 2 MB.");event.target.value="";return}
  const text=await file.text();
  const clean=text.replace(/\r/g,"").trim();
  if(clean.length<80){setNotice("That file is too short to make a reading book.");event.target.value="";return}
  const title=file.name.replace(/\.(txt|md)$/i,"").replace(/[-_]/g," ");
  const book:Book={id:"custom-"+Date.now(),title,author:"Your import",category:"My books",description:"Your own imported reading material.",accent:"ink",content:clean,custom:true};
  setPersonalBooks(old=>{const next=[book,...old];try{localStorage.setItem(LIBRARY_STORE,JSON.stringify(next))}catch{}return next});
  setCategory("My books");setQuery("");setNotice("Your book has been added to the library.");event.target.value="";
 }
 function exportBackup(){
  const payload={version:1,progress,sessions,personalBooks};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="typenova-library-backup.json";link.click();URL.revokeObjectURL(url);
 }
 function toggleTheme(){setTheme(value=>value==="dark"?"light":"dark")}
 function renderLibrary(){
  return <section className="book-library">
   <div className="library-hero"><div><span className="book-eyebrow">A QUIETER KIND OF PROGRESS</span><h1>Read a little.<br/><em>Type a lot.</em></h1><p>Build a daily typing habit with the books you love.</p><div className="library-actions"><button className="book-primary" onClick={()=>openBook(STARTER_BOOKS[0]!,"type")}>Continue reading <span>↗</span></button><label className="book-secondary">＋ Import a book<input type="file" accept=".txt,.md,text/plain,text/markdown" onChange={importText} hidden/></label></div></div><div className="library-hero-art"><div className="hero-book hero-book-one"/><div className="hero-book hero-book-two"/><div className="hero-book hero-book-three"/><span>THE JOY OF<br/>SLOW READING</span></div></div>
   <div className="library-toolbar"><div><span className="book-eyebrow">YOUR BOOKSHELF</span><h2>Find your next chapter</h2></div><input className="book-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search books or authors…" aria-label="Search books"/></div>
   <div className="category-tabs">{CATEGORIES.map(item=><button key={item} className={category===item?"active":""} onClick={()=>setCategory(item)}>{item}</button>)}</div>
   <div className="book-grid">{filtered.map(book=><article className="library-book-card" key={book.id}><button className={"book-cover cover-"+book.accent} onClick={()=>openBook(book,"type")} aria-label={"Open "+book.title}><span className="cover-top">{book.custom?"YOUR COPY":"A TYPE NOVA READING EDITION"}</span><span className="cover-ornament">✳</span><strong>{book.title}</strong><small>{book.author}</small><i/></button><div className="book-card-info"><div><span>{book.category}</span><small>{Math.min(100,Math.round(((progress[book.id]??0)/paragraphs(book).length)*100))}% complete</small></div><h3>{book.title}</h3><p>{book.author}</p><div className="book-card-actions"><button onClick={()=>openBook(book,"type")}>Type this book</button><button onClick={()=>openBook(book,"read")}>Read</button></div></div></article>)}</div>
   {filtered.length===0&&<div className="book-empty">No books found. Try another search or import a text file.</div>}
   <div className="library-footnote">Starter shelf features classic works and original TypeNova reading selections. Your imported books and progress stay in this browser.</div>
  </section>
 }
 function renderReader(){
  return <section className="reader-view">
   <div className="reader-toolbar"><button className="reader-back" onClick={()=>setView("library")}>← Library</button><div><span>{activeBook.author}</span><strong>{activeBook.title}</strong></div><div className="reader-mode-switch"><button className={mode==="read"?"active":""} onClick={()=>{setMode("read");setTyped("");setStartedAt(null)}}>Read</button><button className={mode==="type"?"active":""} onClick={()=>setMode("type")}>Type</button></div></div>
   <div className="reader-progress"><span>PARAGRAPH {paragraphIndex+1} OF {chunks.length}</span><div><i style={{width:((paragraphIndex+(completed?1:0))/chunks.length*100)+"%"}}/></div><span>{Math.round((paragraphIndex/chunks.length)*100)}%</span></div>
   <div className="reader-paper"><div className="paper-heading"><span>{activeBook.category.toUpperCase()} · {activeBook.author.toUpperCase()}</span><h1>{activeBook.title}</h1><small>CHAPTER EXCERPT</small></div>
    {mode==="read"?<div className="reading-text" style={{fontSize,lineHeight:lineSpacing}}>{passage}</div>:<><div className="typing-instruction">TYPE THE PASSAGE BELOW · YOUR PROGRESS SAVES AUTOMATICALLY</div><div className="book-typing-text" style={{fontSize,lineHeight:lineSpacing}}>{chars}</div><textarea className="book-typing-input" value={typed} onChange={e=>onTyping(e.target.value)} placeholder="Start typing the paragraph here…" autoFocus spellCheck={false} autoCapitalize="off" autoCorrect="off" onPaste={e=>e.preventDefault()} aria-label="Type the displayed paragraph"/></>}
    <div className="paper-controls"><div className="reading-settings"><label>Text size <input type="range" min="16" max="26" value={fontSize} onChange={e=>setFontSize(Number(e.target.value))}/></label><label>Spacing <input type="range" min="1.4" max="2.2" step=".05" value={lineSpacing} onChange={e=>setLineSpacing(Number(e.target.value))}/></label></div><button className="book-primary" onClick={mode==="read"?nextParagraph:finishParagraph} disabled={mode==="type"&&!completed}>{paragraphIndex+1===chunks.length?"Finish book":"Next paragraph"} <span>→</span></button></div>
   </div>
   {mode==="type"&&<div className="reader-live-stats"><div><span>LIVE SPEED</span><strong>{metrics.wpm} <small>WPM</small></strong></div><div><span>ACCURACY</span><strong>{metrics.accuracy}<small>%</small></strong></div><div><span>TIME</span><strong>{clock(elapsed)}</strong></div><div><span>CHARACTERS</span><strong>{typed.length}<small>/{passage.length}</small></strong></div><div className="reader-stat-actions"><button onClick={()=>{setTyped("");setStartedAt(null);setNow(Date.now())}}>Reset paragraph</button></div></div>}
  </section>
 }
 function renderStats(){
  return <section className="stats-view"><div className="stats-heading"><span className="book-eyebrow">YOUR READING JOURNEY</span><h1>Small pages.<br/><em>Big progress.</em></h1><p>Every paragraph you practise is another step forward.</p></div><div className="book-stat-grid"><div><span>SESSIONS</span><strong>{sessions.length}</strong></div><div><span>BEST SPEED</span><strong>{best}<small> WPM</small></strong></div><div><span>AVG. ACCURACY</span><strong>{average}<small>%</small></strong></div><div><span>WORDS PRACTISED</span><strong>{sessions.reduce((sum,s)=>sum+Math.round(s.characters/5),0)}</strong></div></div><div className="stats-history"><div className="stats-history-head"><h2>Recent sessions</h2><button onClick={exportBackup}>Export backup ↓</button></div>{sessions.length===0?<p>Your first completed paragraph will appear here.</p>:sessions.slice(0,20).map((s,i)=><div className="stats-session" key={s.date+i}><div><strong>{s.title}</strong><span>{new Date(s.date).toLocaleString()}</span></div><b>{s.wpm} WPM</b><b>{s.accuracy}%</b></div>)}</div></section>
 }
 return <main className="typenova-book-app" data-theme={theme}>
  <aside className="book-sidebar"><button className="book-brand" onClick={()=>setView("library")}><span>t</span> typenova</button><div className="book-nav-label">YOUR SPACE</div><nav><button className={view==="library"?"selected":""} onClick={()=>setView("library")}>▤ <span>Library</span></button><button className={view==="reader"?"selected":""} onClick={()=>setView("reader")}>⌁ <span>Reading room</span></button><button className={view==="stats"?"selected":""} onClick={()=>setView("stats")}>◷ <span>My progress</span></button></nav><div className="book-sidebar-note"><span>✳</span><p>A page a day is a page closer to your goal.</p></div><div className="book-sidebar-user"><i/> <div><strong>Guest reader</strong><span>Progress saved on this device</span></div></div></aside>
  <section className="book-main"><header className="book-topbar"><div><span>YOUR PERSONAL READING SPACE</span><strong>{view==="library"?"The library":view==="reader"?"Reading room":"Your progress"}</strong></div><div className="book-top-actions"><button onClick={()=>setTheme(v=>v==="dark"?"light":"dark")}>{theme==="light"?"☾ Dark":"☼ Light"}</button><button onClick={exportBackup}>Export data</button></div></header>{view==="library"?renderLibrary():view==="reader"?renderReader():renderStats()}<footer className="book-footer">TYPE WITH INTENTION <i>✳</i> READ WITH CURIOSITY</footer></section>
  {notice&&<div className="book-toast" role="status">{notice}</div>}
  {!loaded&&<div className="book-loading">Opening your bookshelf…</div>}
 </main>;
}
