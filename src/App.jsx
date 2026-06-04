import { useState, useEffect, useRef } from "react";
import { SUBJECTS, SUBJECT_LIST } from "./subjects.js";
import Navigator from "./Navigator.jsx";

function saveProgress(p) { try { localStorage.setItem("ege_progress_v2", JSON.stringify(p)); } catch(e) {} }
function loadProgress() { try { const s=localStorage.getItem("ege_progress_v2"); return s?JSON.parse(s):null; } catch(e) { return null; } }

const THEMES = {
  dark: { bg:"#0a0e1a", card:"#151c30", border:"#2a3050", text:"#e8eaf0", subtext:"#6b7db3", header:"#0d1220", input:"#0d1220", weak:"#1a1020", weakBorder:"#3a2040" },
  light: { bg:"#f0f2f8", card:"#ffffff", border:"#d0d8f0", text:"#1a2040", subtext:"#5566aa", header:"#e0e4f4", input:"#f8f9ff", weak:"#fff0f0", weakBorder:"#ffcccc" }
};

const ACHIEVEMENTS_LIST = [
  { id:"first", icon:"🌟", title:"Первые шаги", desc:"Решить первую задачу", check:(s)=>getAllSolved(s)>=1 },
  { id:"ten", icon:"✏️", title:"Прилежный ученик", desc:"Решить 10 задач", check:(s)=>getAllSolved(s)>=10 },
  { id:"fifty", icon:"📚", title:"Марафонец", desc:"Решить 50 задач", check:(s)=>getAllSolved(s)>=50 },
  { id:"hundred", icon:"🏆", title:"Чемпион", desc:"Решить 100 задач", check:(s)=>getAllSolved(s)>=100 },
  { id:"accuracy80", icon:"🎯", title:"Меткий стрелок", desc:"Точность выше 80% (мин. 10 задач)", check:(s)=>{ const t=getAllSolved(s); const c=getAllCorrect(s); return t>=10&&c/t>=0.8; }},
  { id:"streak10", icon:"💎", title:"Перфекционист", desc:"10 задач подряд без ошибок", check:(s)=>(s.meta?.streak||0)>=10 },
  { id:"multisubject", icon:"🌍", title:"Многопредметник", desc:"Заниматься по 3 предметам", check:(s)=>(s.meta?.subjectsTried||[]).length>=3 },
  { id:"exam", icon:"📝", title:"Экзаменатор", desc:"Пройти пробный экзамен", check:(s)=>s.meta?.examDone },
  { id:"streak3", icon:"🔥", title:"3 дня подряд", desc:"Заниматься 3 дня подряд", check:(s)=>(s.meta?.days||0)>=3 },
  { id:"streak7", icon:"⚡", title:"Неделя!", desc:"Заниматься 7 дней подряд", check:(s)=>(s.meta?.days||0)>=7 },
  { id:"navigator", icon:"🎯", title:"Целеустремлённый", desc:"Открыть Навигатор поступления", check:(s)=>s.meta?.navigatorUsed },
];

// Карточки для повторения
const FLASHCARDS = {
  math: [
    { q:"Формула дискриминанта", a:"D = b² − 4ac" },
    { q:"Корни квадратного уравнения", a:"x = (−b ± √D) / 2a" },
    { q:"Теорема Виета: сумма корней", a:"x₁ + x₂ = −b/a" },
    { q:"Теорема Виета: произведение корней", a:"x₁ · x₂ = c/a" },
    { q:"Формула вершины параболы", a:"x₀ = −b/(2a)" },
    { q:"Производная xⁿ", a:"(xⁿ)' = n·xⁿ⁻¹" },
    { q:"Производная sin x", a:"(sin x)' = cos x" },
    { q:"Производная cos x", a:"(cos x)' = −sin x" },
    { q:"Производная eˣ", a:"(eˣ)' = eˣ" },
    { q:"Производная ln x", a:"(ln x)' = 1/x" },
    { q:"log₂(8) = ?", a:"3 (так как 2³ = 8)" },
    { q:"Основное тригонометрическое тождество", a:"sin²x + cos²x = 1" },
    { q:"sin(30°) = ?", a:"0.5 = 1/2" },
    { q:"cos(60°) = ?", a:"0.5 = 1/2" },
    { q:"Площадь треугольника", a:"S = ½ · a · h" },
    { q:"Теорема Пифагора", a:"c² = a² + b²" },
    { q:"Площадь круга", a:"S = π·r²" },
    { q:"Длина окружности", a:"C = 2·π·r" },
    { q:"Площадь трапеции", a:"S = ½·(a+b)·h" },
    { q:"Формула процентов", a:"X% от N = N · X/100" },
  ],
  russian: [
    { q:"звонИт или звОнит?", a:"звонИт — ударение на И" },
    { q:"Надеть или одеть?", a:"НАдеть что-то НА себя. ОДеть кого-то другого" },
    { q:"Эффектный или эффективный?", a:"Эффектный = впечатляющий. Эффективный = результативный" },
    { q:"договОр или дОговор?", a:"договОр — ударение на О" },
    { q:"тОрты или тортЫ?", a:"тОрты — ударение на первый слог" },
    { q:"принялА или прИняла?", a:"принялА — ударение на А" },
    { q:"жалюзИ или жАлюзи?", a:"жалюзИ — ударение на последний слог" },
    { q:"Деепричастный оборот: главное правило", a:"Действие деепричастия = действие подлежащего" },
    { q:"Что такое паронимы?", a:"Слова похожие по звучанию, но разные по значению" },
    { q:"каталОг или катАлог?", a:"каталОг — ударение на О" },
    { q:"Прямое и переносное значение", a:"Прямое = буквальное. Переносное = образное (метафора)" },
    { q:"квартАл или квАртал?", a:"квартАл — ударение на А" },
  ],
  social: [
    { q:"Что такое социальная стратификация?", a:"Деление общества на слои (страты) по доходу, власти, престижу, образованию" },
    { q:"Виды социальной мобильности", a:"Вертикальная (вверх/вниз) и горизонтальная (без изменения статуса)" },
    { q:"ВВП — что это?", a:"Валовой внутренний продукт — стоимость всех конечных товаров и услуг в стране за год" },
    { q:"Закон спроса", a:"При росте цены — спрос падает (обратная зависимость)" },
    { q:"Что такое инфляция?", a:"Устойчивый рост цен и обесценивание денег" },
    { q:"Три ветви власти в РФ", a:"Законодательная (ФС), Исполнительная (Правительство), Судебная (суды)" },
    { q:"Когда принята Конституция РФ?", a:"12 декабря 1993 года" },
    { q:"Полная дееспособность в РФ — с какого возраста?", a:"С 18 лет (эмансипация возможна с 16)" },
    { q:"Что такое девиантное поведение?", a:"Отклонение от принятых в обществе норм" },
    { q:"Признаки правового государства", a:"Верховенство закона, разделение властей, гарантии прав граждан" },
    { q:"Виды безработицы", a:"Фрикционная (поиск работы), структурная (устаревание профессий), циклическая (кризис)" },
  ],
  english: [
    { q:"Make vs Do: ошибки", a:"MAKE mistakes/decision/effort. DO homework/sport/business" },
    { q:"Present Perfect — когда?", a:"Опыт, результат важен сейчас, with: ever/never/already/just/yet" },
    { q:"Past Perfect — когда?", a:"Действие завершилось ДО другого события в прошлом" },
    { q:"Say vs Tell", a:"SAY something. TELL someone (tell me, tell a story)" },
    { q:"Суффикс -ful", a:"Прилагательное = полный чего-то (hopeful, careful, useful)" },
    { q:"Суффикс -less", a:"Прилагательное = без чего-то (hopeless, careless, useless)" },
    { q:"Префикс un-", a:"Отрицание для прилагательных (unhappy, unable, unclear)" },
    { q:"interested IN или AT?", a:"interested IN (интересуется чем-то)" },
    { q:"Watch vs Look vs See", a:"WATCH — движение. LOOK — направлять взгляд. SEE — видеть непроизвольно" },
    { q:"Суффикс -tion/-sion", a:"Существительное от глагола (education, information, decision)" },
    { q:"Суффикс -ly", a:"Наречие от прилагательного (quickly, carefully, happily)" },
    { q:"Lend vs Borrow", a:"LEND — дать взаймы. BORROW — взять взаймы" },
  ]
};

function getAllSolved(p) { return Object.keys(p).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(p[k]?.solved||{}).reduce((a,b)=>a+b,0),0); }
function getAllCorrect(p) { return Object.keys(p).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(p[k]?.correct||{}).reduce((a,b)=>a+b,0),0); }
function predictScore(p) {
  const s=getAllSolved(p); const c=getAllCorrect(p);
  const acc=s>0?c/s:0;
  return Math.round(40+Math.min(30,s*0.3)+acc*30);
}

function ProgressBar({ value, max, color="#4f7ef7", theme }) {
  const T=THEMES[theme];
  return <div style={{ background:T.border, borderRadius:6, height:8, overflow:"hidden" }}><div style={{ width:`${Math.min(100,max>0?(value/max)*100:0)}%`, height:"100%", background:color, borderRadius:6, transition:"width 0.5s ease" }} /></div>;
}

function AchievementPopup({ achievement, onClose }) {
  useEffect(()=>{ const t=setTimeout(onClose,3000); return()=>clearTimeout(t); },[]);
  return (
    <div style={{ position:"fixed", top:80, left:"50%", transform:"translateX(-50%)", zIndex:999, background:"linear-gradient(135deg,#1a2540,#0d1830)", border:"1px solid #4f7ef7", borderRadius:16, padding:"14px 20px", display:"flex", alignItems:"center", gap:12, boxShadow:"0 8px 30px rgba(79,126,247,0.4)", animation:"slideDown 0.4s ease", maxWidth:320, width:"90%" }}>
      <div style={{ fontSize:32 }}>{achievement.icon}</div>
      <div>
        <div style={{ fontSize:11, color:"#4f7ef7", textTransform:"uppercase", letterSpacing:1 }}>Достижение!</div>
        <div style={{ fontSize:15, fontWeight:"bold", color:"#fff" }}>{achievement.title}</div>
        <div style={{ fontSize:12, color:"#6b7db3" }}>{achievement.desc}</div>
      </div>
    </div>
  );
}

function WelcomeScreen({ onClose, theme }) {
  const T=THEMES[theme]; const [step,setStep]=useState(0);
  const steps=[
    { icon:"📚", title:"ЕГЭ — 4 предмета", text:"Математика, Русский язык, Обществознание, Английский. Всё в одном приложении!" },
    { icon:"✏️", title:"Тренажёр + Карточки", text:"Задачи с вариантами ответов. Карточки для запоминания формул. Типичные ошибки к каждому заданию." },
    { icon:"🎯", title:"Навигатор поступления", text:"Выбери вуз мечты — узнай нужный балл и сколько не хватает. База 60+ вузов по всей России." },
    { icon:"📝", title:"Пробный экзамен", text:"Экзамен на время. После — разбор ошибок и примерный балл." },
    { icon:"🏆", title:"Достижения", text:"Получай награды за прогресс! Прогресс сохраняется автоматически." },
  ];
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.9)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:20, padding:28, maxWidth:360, width:"100%" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>{steps[step].icon}</div>
          <div style={{ fontSize:20, fontWeight:"bold", color:T.text, marginBottom:8 }}>{steps[step].title}</div>
          <div style={{ fontSize:14, color:T.subtext, lineHeight:1.6 }}>{steps[step].text}</div>
        </div>
        <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:20 }}>
          {steps.map((_,i)=><div key={i} style={{ width:i===step?20:8, height:8, borderRadius:4, background:i===step?"#4f7ef7":T.border, transition:"all 0.3s" }} />)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{ flex:1, padding:12, background:"transparent", border:`1px solid ${T.border}`, borderRadius:12, color:T.subtext, cursor:"pointer", fontFamily:"inherit" }}>← Назад</button>}
          <button onClick={()=>step<steps.length-1?setStep(s=>s+1):onClose()} style={{ flex:1, padding:12, background:"linear-gradient(135deg,#4f7ef7,#3b6be0)", border:"none", borderRadius:12, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontWeight:"bold" }}>
            {step<steps.length-1?"Далее →":"Начать! 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SubjectSelector({ currentSubject, onSelect, theme }) {
  const T=THEMES[theme];
  return (
    <div style={{ display:"flex", gap:8, padding:"10px 16px", background:T.header, borderBottom:`1px solid ${T.border}`, overflowX:"auto", scrollbarWidth:"none" }}>
      {SUBJECT_LIST.map(id=>{ const s=SUBJECTS[id]; const active=currentSubject===id; return (
        <button key={id} onClick={()=>onSelect(id)} style={{ padding:"7px 12px", borderRadius:20, border:`1px solid ${active?s.color:T.border}`, background:active?`${s.color}20`:"transparent", color:active?s.color:T.subtext, fontSize:12, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", display:"flex", alignItems:"center", gap:5, transition:"all 0.2s" }}>
          <span style={{ fontSize:13, fontWeight:"bold" }}>{s.icon}</span>{s.title}
        </button>
      ); })}
    </div>
  );
}

function FlashcardsScreen({ subject, theme }) {
  const T=THEMES[theme]; const cards=FLASHCARDS[subject]||[];
  const [idx,setIdx]=useState(0); const [flipped,setFlipped]=useState(false); const [known,setKnown]=useState(new Set()); const [unknown,setUnknown]=useState(new Set());
  const card=cards[idx];
  const subj=SUBJECTS[subject];

  function next(isKnown) {
    if(isKnown) setKnown(k=>new Set([...k,idx])); else setUnknown(u=>new Set([...u,idx]));
    setFlipped(false);
    setTimeout(()=>setIdx(i=>(i+1)%cards.length),200);
  }

  return (
    <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
      <div style={{ fontSize:17, fontWeight:"bold", color:T.text, marginBottom:4 }}>🃏 Карточки — {subj.title}</div>
      <div style={{ fontSize:13, color:T.subtext, marginBottom:12 }}>Карточка {idx+1} из {cards.length} · Знаю: {known.size} · Повторю: {unknown.size}</div>
      <div style={{ marginBottom:16 }}><ProgressBar value={idx} max={cards.length} color={subj.color} theme={theme}/></div>

      <div onClick={()=>setFlipped(!flipped)} style={{ background:T.card, border:`2px solid ${flipped?subj.color:T.border}`, borderRadius:20, padding:32, marginBottom:20, textAlign:"center", cursor:"pointer", minHeight:180, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", transition:"all 0.3s" }}>
        {!flipped ? (
          <>
            <div style={{ fontSize:12, color:T.subtext, marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>Вопрос</div>
            <div style={{ fontSize:18, fontWeight:"bold", color:T.text, lineHeight:1.5 }}>{card?.q}</div>
            <div style={{ fontSize:12, color:T.subtext, marginTop:16 }}>Нажми чтобы увидеть ответ</div>
          </>
        ) : (
          <>
            <div style={{ fontSize:12, color:subj.color, marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>Ответ</div>
            <div style={{ fontSize:18, fontWeight:"bold", color:subj.color, lineHeight:1.5 }}>{card?.a}</div>
          </>
        )}
      </div>

      {flipped && (
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={()=>next(false)} style={{ flex:1, padding:14, background:"rgba(248,113,113,0.1)", border:"1px solid #f87171", borderRadius:14, color:"#f87171", cursor:"pointer", fontFamily:"inherit", fontSize:15 }}>
            🔄 Повторю
          </button>
          <button onClick={()=>next(true)} style={{ flex:1, padding:14, background:"rgba(74,222,128,0.1)", border:"1px solid #4ade80", borderRadius:14, color:"#4ade80", cursor:"pointer", fontFamily:"inherit", fontSize:15 }}>
            ✓ Знаю!
          </button>
        </div>
      )}
      {!flipped && <div style={{ textAlign:"center", fontSize:13, color:T.subtext }}>👆 Нажми на карточку чтобы перевернуть</div>}
    </div>
  );
}

function HomeScreen({ progress, subject, onNavigate, theme }) {
  const T=THEMES[theme]; const subj=SUBJECTS[subject];
  const sp=progress[subject]||{solved:{},correct:{}};
  const totalSolved=Object.values(sp.solved).reduce((a,b)=>a+b,0);
  const totalCorrect=Object.values(sp.correct).reduce((a,b)=>a+b,0);
  const accuracy=totalSolved>0?Math.round(totalCorrect/totalSolved*100):0;
  const allSolved=getAllSolved(progress);
  const myScore=predictScore(progress);
  const unlockedCount=ACHIEVEMENTS_LIST.filter(a=>a.check(progress)).length;
  const weakTopics=Object.entries(sp.solved).filter(([k,v])=>v>0).map(([k])=>({num:k,acc:Math.round((sp.correct[k]||0)/sp.solved[k]*100)})).filter(t=>t.acc<60).slice(0,2);

  return (
    <div style={{ padding:"14px 16px", overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:18, fontWeight:"bold", color:T.text }}>{subj.title} — ЕГЭ 2026</div>
        <div style={{ fontSize:12, color:T.subtext, marginTop:2 }}>{subj.description}</div>
      </div>

      {/* Прогноз балла */}
      <div style={{ background:`linear-gradient(135deg,${subj.color}20,${subj.color}08)`, border:`1px solid ${subj.color}40`, borderRadius:16, padding:14, marginBottom:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:12, color:T.subtext }}>Прогноз балла ЕГЭ</div>
          <div style={{ fontSize:28, fontWeight:"bold", color:subj.color }}>{myScore}</div>
          <div style={{ fontSize:11, color:T.subtext }}>из 100 по предмету</div>
        </div>
        <button onClick={()=>onNavigate("navigator")} style={{ padding:"10px 14px", background:subj.color, border:"none", borderRadius:12, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:"bold" }}>
          🎯 Мой вуз
        </button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12 }}>
        {[{v:totalSolved,l:"Решено",c:subj.color,i:"✏️"},{v:`${accuracy}%`,l:"Точность",c:"#f59e0b",i:"🎯"},{v:`${unlockedCount}`,l:"Награды",c:"#f59e0b",i:"🏆",click:()=>onNavigate("achievements")}].map((s,i)=>(
          <div key={i} onClick={s.click} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:10, textAlign:"center", cursor:s.click?"pointer":"default" }}>
            <div style={{ fontSize:16 }}>{s.i}</div>
            <div style={{ fontSize:16, fontWeight:"bold", color:s.c }}>{s.v}</div>
            <div style={{ fontSize:10, color:T.subtext }}>{s.l}</div>
          </div>
        ))}
      </div>

      {(progress.meta?.days||0)>0&&(
        <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"10px 14px", marginBottom:10, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20 }}>🔥</span>
          <div>
            <div style={{ fontSize:13, fontWeight:"bold", color:"#f59e0b" }}>{progress.meta.days} {progress.meta.days===1?"день":progress.meta.days<5?"дня":"дней"} подряд! Всего задач: {allSolved}</div>
          </div>
        </div>
      )}

      {weakTopics.length>0&&(
        <div style={{ background:T.weak, border:`1px solid ${T.weakBorder}`, borderRadius:12, padding:10, marginBottom:10 }}>
          <div style={{ fontSize:12, color:"#f87171", fontWeight:"bold", marginBottom:6 }}>⚠️ Нужна практика:</div>
          {weakTopics.map(t=>(
            <div key={t.num} style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
              <span style={{ fontSize:12, color:T.text }}>{subj.tasks[t.num]?.title}</span>
              <span style={{ fontSize:11, color:"#f87171" }}>{t.acc}%</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontSize:12, color:T.subtext, marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>Разделы</div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {Object.entries(subj.tasks).map(([num,task])=>{
          const solved=sp.solved[num]||0; const correct=sp.correct[num]||0;
          const acc=solved>0?Math.round(correct/solved*100):null;
          return (
            <button key={num} onClick={()=>onNavigate("trainer",num)} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"11px 13px", textAlign:"left", cursor:"pointer", color:T.text, display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=subj.color} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:"bold", marginBottom:1 }}>{task.title} — {task.topic}</div>
                <div style={{ fontSize:11, color:T.subtext }}>{task.description}</div>
                {solved>0&&<div style={{ marginTop:4 }}><ProgressBar value={correct} max={solved} color={acc>=70?"#4ade80":acc>=40?"#f59e0b":"#f87171"} theme={theme}/></div>}
              </div>
              <div style={{ marginLeft:8 }}>
                {acc!==null?<span style={{ fontSize:12, color:acc>=70?"#4ade80":acc>=40?"#f59e0b":"#f87171", fontWeight:"bold" }}>{acc}%</span>:<span style={{ color:subj.color, fontSize:16 }}>→</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrainerScreen({ subject, taskNum, progress, onProgress, onBack, theme }) {
  const T=THEMES[theme]; const subj=SUBJECTS[subject]; const task=subj.tasks[taskNum];
  const [qIndex,setQIndex]=useState(0); const [answer,setAnswer]=useState(""); const [result,setResult]=useState(null);
  const [showTheory,setShowTheory]=useState(false); const [showMistakes,setShowMistakes]=useState(false);
  const q=task.questions[qIndex];

  function checkAnswer() {
    const isCorrect=q.type==="choice"?answer===q.answer:answer.trim().replace(",",".")===q.answer;
    setResult(isCorrect?"correct":"wrong"); onProgress(subject,taskNum,isCorrect);
  }
  function next() {
    if(qIndex<task.questions.length-1){setQIndex(qIndex+1);setAnswer("");setResult(null);setShowMistakes(false);}
    else onBack();
  }

  return (
    <div style={{ padding:"14px 16px", overflowY:"auto", maxHeight:"calc(100vh - 130px)" }}>
      <button onClick={onBack} style={{ background:"none", border:"none", color:subj.color, fontSize:14, cursor:"pointer", marginBottom:10, padding:0 }}>← Назад</button>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:14, fontWeight:"bold", color:T.text, marginBottom:2 }}>{task.title} — {task.topic}</div>
        <div style={{ fontSize:12, color:T.subtext }}>Вопрос {qIndex+1} из {task.questions.length}</div>
        <div style={{ marginTop:5 }}><ProgressBar value={qIndex} max={task.questions.length} color={subj.color} theme={theme}/></div>
      </div>
      <div style={{ display:"flex", gap:7, marginBottom:10 }}>
        <button onClick={()=>setShowTheory(!showTheory)} style={{ flex:1, padding:"7px", background:showTheory?`${subj.color}15`:"transparent", border:`1px solid ${showTheory?subj.color:T.border}`, borderRadius:10, color:subj.color, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>📖 Теория</button>
        <button onClick={()=>setShowMistakes(!showMistakes)} style={{ flex:1, padding:"7px", background:showMistakes?"rgba(248,113,113,0.1)":"transparent", border:`1px solid ${showMistakes?"#f87171":T.border}`, borderRadius:10, color:"#f87171", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>⚠️ Ошибки</button>
      </div>
      {showTheory&&<div style={{ background:T.input, border:`1px solid ${T.border}`, borderRadius:12, padding:12, marginBottom:10, fontSize:12, color:T.subtext, lineHeight:1.8, whiteSpace:"pre-line" }}>{task.theory}</div>}
      {showMistakes&&q.mistakes&&<div style={{ background:"rgba(248,113,113,0.05)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:12, padding:12, marginBottom:10, fontSize:12, color:"#f87171", lineHeight:1.6 }}>{q.mistakes}</div>}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:16, marginBottom:12 }}>
        <div style={{ fontSize:14, lineHeight:1.7, color:T.text, whiteSpace:"pre-line" }}>{q.text}</div>
      </div>
      {q.type==="choice"?(
        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:12 }}>
          {q.options.map(opt=>{ const l=opt[0]; const isSel=answer===l; const isCorr=result&&l===q.answer; const isWrong=result&&isSel&&l!==q.answer;
            return <button key={opt} onClick={()=>!result&&setAnswer(l)} style={{ padding:"11px 13px", borderRadius:12, border:`1px solid ${isCorr?"#4ade80":isWrong?"#f87171":isSel?subj.color:T.border}`, background:isCorr?"rgba(74,222,128,0.1)":isWrong?"rgba(248,113,113,0.1)":isSel?`${subj.color}15`:T.card, color:isCorr?"#4ade80":isWrong?"#f87171":T.text, textAlign:"left", cursor:result?"default":"pointer", fontSize:13, fontFamily:"inherit", transition:"all 0.2s" }}>{opt}</button>;
          })}
        </div>
      ):(
        <input value={answer} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!result&&checkAnswer()} placeholder="Введите ответ..." disabled={!!result}
          style={{ width:"100%", padding:"12px 14px", background:T.input, border:`1px solid ${result==="correct"?"#4ade80":result==="wrong"?"#f87171":T.border}`, borderRadius:12, color:T.text, fontSize:16, outline:"none", boxSizing:"border-box", fontFamily:"inherit", marginBottom:12 }}/>
      )}
      {!result?<button onClick={checkAnswer} disabled={!answer} style={{ width:"100%", padding:13, background:answer?`linear-gradient(135deg,${subj.color},${subj.color}cc)`:"#1e2540", border:"none", borderRadius:12, color:"#fff", fontSize:15, cursor:answer?"pointer":"not-allowed", fontFamily:"inherit" }}>Проверить</button>:(
        <div>
          <div style={{ padding:13, borderRadius:12, marginBottom:10, background:result==="correct"?"rgba(74,222,128,0.1)":"rgba(248,113,113,0.1)", border:`1px solid ${result==="correct"?"#4ade80":"#f87171"}` }}>
            <div style={{ fontSize:14, fontWeight:"bold", color:result==="correct"?"#4ade80":"#f87171", marginBottom:3 }}>{result==="correct"?"✅ Верно!":"❌ Неверно. Ответ: "+q.answer}</div>
            <div style={{ fontSize:13, color:T.subtext }}>{q.solution}</div>
          </div>
          <button onClick={next} style={{ width:"100%", padding:13, background:`linear-gradient(135deg,${subj.color},${subj.color}cc)`, border:"none", borderRadius:12, color:"#fff", fontSize:15, cursor:"pointer", fontFamily:"inherit" }}>
            {qIndex<task.questions.length-1?"Следующий →":"Завершить ✓"}
          </button>
        </div>
      )}
    </div>
  );
}

function TheoryScreen({ subject, theme }) {
  const T=THEMES[theme]; const subj=SUBJECTS[subject]; const [selected,setSelected]=useState(null);
  return (
    <div style={{ padding:"14px 16px", overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
      <div style={{ fontSize:16, fontWeight:"bold", color:T.text, marginBottom:3 }}>📖 Теория — {subj.title}</div>
      <div style={{ fontSize:12, color:T.subtext, marginBottom:12 }}>Шпаргалки для ЕГЭ 2026</div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {Object.entries(subj.tasks).map(([num,task])=>(
          <div key={num}>
            <button onClick={()=>setSelected(selected===num?null:num)} style={{ width:"100%", background:selected===num?`${subj.color}15`:T.card, border:`1px solid ${selected===num?subj.color:T.border}`, borderRadius:selected===num?"12px 12px 0 0":"12px", padding:"11px 13px", textAlign:"left", cursor:"pointer", color:T.text, fontFamily:"inherit", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:13, fontWeight:"bold" }}>{task.title} — {task.topic}</div>
              <span style={{ color:subj.color }}>{selected===num?"▲":"▼"}</span>
            </button>
            {selected===num&&<div style={{ background:T.input, border:`1px solid ${subj.color}40`, borderTopWidth:0, borderRadius:"0 0 12px 12px", padding:12, fontSize:13, color:T.subtext, lineHeight:1.9, whiteSpace:"pre-line" }}>{task.theory}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsScreen({ progress, theme }) {
  const T=THEMES[theme];
  const unlocked=ACHIEVEMENTS_LIST.filter(a=>a.check(progress));
  const locked=ACHIEVEMENTS_LIST.filter(a=>!a.check(progress));
  return (
    <div style={{ padding:"14px 16px", overflowY:"auto", maxHeight:"calc(100vh - 130px)" }}>
      <div style={{ fontSize:18, fontWeight:"bold", color:T.text, marginBottom:3 }}>🏆 Достижения</div>
      <div style={{ fontSize:13, color:T.subtext, marginBottom:10 }}>{unlocked.length} из {ACHIEVEMENTS_LIST.length} получено</div>
      <div style={{ marginBottom:14 }}><ProgressBar value={unlocked.length} max={ACHIEVEMENTS_LIST.length} color="#f59e0b" theme={theme}/></div>
      {unlocked.length>0&&<>
        <div style={{ fontSize:12, color:"#4ade80", marginBottom:7, textTransform:"uppercase", letterSpacing:1 }}>✅ Получено</div>
        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:12 }}>
          {unlocked.map(a=>(
            <div key={a.id} style={{ background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:12, padding:"11px 13px", display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:26 }}>{a.icon}</span>
              <div><div style={{ fontSize:13, fontWeight:"bold", color:T.text }}>{a.title}</div><div style={{ fontSize:12, color:"#4ade80" }}>{a.desc}</div></div>
            </div>
          ))}
        </div>
      </>}
      <div style={{ fontSize:12, color:T.subtext, marginBottom:7, textTransform:"uppercase", letterSpacing:1 }}>🔒 Не получено</div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {locked.map(a=>(
          <div key={a.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"11px 13px", display:"flex", alignItems:"center", gap:12, opacity:0.5 }}>
            <span style={{ fontSize:26, filter:"grayscale(1)" }}>{a.icon}</span>
            <div><div style={{ fontSize:13, color:T.subtext }}>{a.title}</div><div style={{ fontSize:12, color:T.border }}>{a.desc}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearnTab({ subject, onNavigate, theme }) {
  const T=THEMES[theme]; const subj=SUBJECTS[subject];
  const [mode,setMode]=useState("tasks"); // tasks | cards
  if(mode==="cards") return <FlashcardsScreen subject={subject} theme={theme}/>;
  return (
    <div style={{ padding:"14px 16px", overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
      <div style={{ display:"flex", gap:10, marginBottom:16 }}>
        <button onClick={()=>setMode("tasks")} style={{ flex:1, padding:12, background:mode==="tasks"?`linear-gradient(135deg,${subj.color},${subj.color}cc)`:"transparent", border:`1px solid ${mode==="tasks"?subj.color:T.border}`, borderRadius:12, color:mode==="tasks"?"#fff":T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:"bold" }}>✏️ Задачи</button>
        <button onClick={()=>setMode("cards")} style={{ flex:1, padding:12, background:mode==="cards"?"linear-gradient(135deg,#a855f7,#7c3aed)":"transparent", border:`1px solid ${mode==="cards"?"#a855f7":T.border}`, borderRadius:12, color:mode==="cards"?"#fff":T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:"bold" }}>🃏 Карточки</button>
      </div>
      <div style={{ fontSize:13, color:T.subtext, marginBottom:12 }}>Выбери раздел для тренировки:</div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {Object.entries(subj.tasks).map(([num,task])=>(
          <button key={num} onClick={()=>onNavigate("trainer",num)} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"11px 13px", textAlign:"left", cursor:"pointer", color:T.text, display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:"inherit" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=subj.color} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
            <div>
              <div style={{ fontSize:13, fontWeight:"bold", marginBottom:1 }}>{task.title} — {task.topic}</div>
              <div style={{ fontSize:11, color:T.subtext }}>{task.questions.length} задач</div>
            </div>
            <span style={{ color:subj.color, fontSize:18 }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExamTab({ subject, onNavigate, examStats, theme }) {
  const T=THEMES[theme]; const subj=SUBJECTS[subject];
  const totalQ=Object.values(subj.tasks).reduce((acc,t)=>acc+t.questions.length,0);
  return (
    <div style={{ padding:16 }}>
      {examStats?.[subject]&&(
        <div style={{ background:`${subj.color}15`, border:`1px solid ${subj.color}40`, borderRadius:14, padding:14, marginBottom:16, textAlign:"center" }}>
          <div style={{ fontSize:13, color:T.subtext }}>Последний результат</div>
          <div style={{ fontSize:26, fontWeight:"bold", color:subj.color }}>~{examStats[subject].score} баллов</div>
          <div style={{ fontSize:13, color:T.subtext }}>Верных: {examStats[subject].correct}</div>
        </div>
      )}
      <div style={{ fontSize:16, fontWeight:"bold", color:T.text, marginBottom:6 }}>Пробный экзамен — {subj.title}</div>
      <div style={{ fontSize:13, color:T.subtext, marginBottom:18, lineHeight:1.6 }}>{totalQ} вопросов по всем разделам. Таймер 45 минут. После — разбор ошибок.</div>
      <button onClick={()=>onNavigate("exam")} style={{ width:"100%", padding:16, background:"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", borderRadius:14, color:"#fff", fontSize:16, cursor:"pointer", fontWeight:"bold", fontFamily:"inherit" }}>Начать экзамен ⏱</button>
    </div>
  );
}

function MockExamScreen({ subject, onBack, onFinish, theme }) {
  const T=THEMES[theme]; const subj=SUBJECTS[subject];
  const allQ=Object.entries(subj.tasks).flatMap(([num,task])=>task.questions.slice(0,3).map(q=>({...q,taskTitle:task.title,taskNum:num})));
  const [answers,setAnswers]=useState({}); const [submitted,setSubmitted]=useState(false);
  const [timeLeft,setTimeLeft]=useState(45*60); const [results,setResults]=useState(null);
  const timerRef=useRef(null);
  useEffect(()=>{ timerRef.current=setInterval(()=>setTimeLeft(t=>{if(t<=1){clearInterval(timerRef.current);handleSubmit();return 0;}return t-1;}),1000); return()=>clearInterval(timerRef.current); },[]);
  function handleSubmit(){ clearInterval(timerRef.current); let correct=0; const res=allQ.map(q=>{const ua=answers[q.id]||"";const ok=q.type==="choice"?ua===q.answer:ua.trim().replace(",",".")===q.answer;if(ok)correct++;return{...q,userAns:ua,isCorrect:ok};}); setResults(res);setSubmitted(true); onFinish(correct,Math.round(27+(correct/allQ.length)*73)); }
  const mins=Math.floor(timeLeft/60),secs=timeLeft%60;
  if(submitted&&results){ const correct=results.filter(r=>r.isCorrect).length; return (
    <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 130px)" }}>
      <div style={{ textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:36 }}>{correct/results.length>=0.7?"🎉":correct/results.length>=0.5?"👍":"📚"}</div>
        <div style={{ fontSize:22, fontWeight:"bold", color:T.text }}>~{Math.round(27+(correct/results.length)*73)} баллов</div>
        <div style={{ color:T.subtext }}>{correct} из {results.length} правильных</div>
      </div>
      {results.map(r=>(
        <div key={r.id} style={{ background:T.card, border:`1px solid ${r.isCorrect?"#4ade80":"#f87171"}`, borderRadius:12, padding:11, marginBottom:7 }}>
          <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:12, color:T.subtext }}>{r.taskTitle}</span><span style={{ color:r.isCorrect?"#4ade80":"#f87171", fontSize:13 }}>{r.isCorrect?"✅":"❌ → "+r.answer}</span></div>
          {!r.isCorrect&&<div style={{ fontSize:12, color:T.subtext, marginTop:3 }}>{r.solution}</div>}
        </div>
      ))}
      <button onClick={onBack} style={{ width:"100%", padding:13, background:`linear-gradient(135deg,${subj.color},${subj.color}cc)`, border:"none", borderRadius:12, color:"#fff", fontSize:15, cursor:"pointer", fontFamily:"inherit", marginTop:8 }}>← Назад</button>
    </div>
  ); }
  return (
    <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 130px)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div><div style={{ fontSize:14, fontWeight:"bold", color:T.text }}>{subj.title} — Экзамен</div><div style={{ fontSize:12, color:T.subtext }}>{Object.keys(answers).length}/{allQ.length}</div></div>
        <div style={{ fontSize:20, fontWeight:"bold", color:timeLeft<300?"#f87171":timeLeft<600?"#f59e0b":"#4ade80" }}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
      </div>
      <div style={{ marginBottom:12 }}><ProgressBar value={Object.keys(answers).length} max={allQ.length} color="#f59e0b" theme={theme}/></div>
      {allQ.map(q=>(
        <div key={q.id} style={{ background:T.card, border:`1px solid ${answers[q.id]?subj.color:T.border}`, borderRadius:12, padding:12, marginBottom:10 }}>
          <div style={{ fontSize:12, color:T.subtext, marginBottom:5 }}>{q.taskTitle}</div>
          <div style={{ fontSize:13, color:T.text, lineHeight:1.6, marginBottom:8, whiteSpace:"pre-line" }}>{q.text}</div>
          {q.type==="choice"?(
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {q.options.map(opt=><button key={opt} onClick={()=>setAnswers({...answers,[q.id]:opt[0]})} style={{ padding:"7px 11px", borderRadius:9, border:`1px solid ${answers[q.id]===opt[0]?subj.color:T.border}`, background:answers[q.id]===opt[0]?`${subj.color}15`:T.input, color:T.text, textAlign:"left", cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>{opt}</button>)}
            </div>
          ):<input value={answers[q.id]||""} onChange={e=>setAnswers({...answers,[q.id]:e.target.value})} placeholder="Ответ..." style={{ width:"100%", padding:"8px 11px", background:T.input, border:`1px solid ${T.border}`, borderRadius:9, color:T.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}/>}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ width:"100%", padding:14, background:"linear-gradient(135deg,#4ade80,#16a34a)", border:"none", borderRadius:12, color:"#fff", fontSize:16, cursor:"pointer", fontWeight:"bold", fontFamily:"inherit" }}>Завершить ✓</button>
    </div>
  );
}

export default function App() {
  const [subject,setSubject]=useState("math");
  const [tab,setTab]=useState("home");
  const [screen,setScreen]=useState(null);
  const [taskNum,setTaskNum]=useState(null);
  const [showWelcome,setShowWelcome]=useState(false);
  const [popup,setPopup]=useState(null);
  const [examStats,setExamStats]=useState({});
  const [theme,setTheme]=useState("dark");
  const [progress,setProgress]=useState(()=>loadProgress()||{meta:{streak:0,days:0,examDone:false,subjectsTried:[],navigatorUsed:false}});

  useEffect(()=>{ saveProgress(progress); },[progress]);
  useEffect(()=>{ const seen=localStorage.getItem("ege_welcome_v3"); if(!seen){setShowWelcome(true);localStorage.setItem("ege_welcome_v3","1");} },[]);

  function checkAchievements(newP){ const prev=ACHIEVEMENTS_LIST.filter(a=>a.check(progress)); const next=ACHIEVEMENTS_LIST.filter(a=>a.check(newP)); const newOnes=next.filter(a=>!prev.find(p=>p.id===a.id)); if(newOnes.length>0)setPopup(newOnes[0]); }

  function handleProgress(subj,num,isCorrect){
    setProgress(p=>{ const sp=p[subj]||{solved:{},correct:{}}; const newStreak=isCorrect?(p.meta?.streak||0)+1:0; const tried=[...new Set([...(p.meta?.subjectsTried||[]),subj])]; const newP={...p,[subj]:{solved:{...sp.solved,[num]:(sp.solved[num]||0)+1},correct:{...sp.correct,[num]:(sp.correct[num]||0)+(isCorrect?1:0)}},meta:{...p.meta,streak:newStreak,days:Math.max(p.meta?.days||0,1),subjectsTried:tried}}; setTimeout(()=>checkAchievements(newP),100); return newP; });
  }

  function navigate(s,num=null){
    if(s==="navigator") setProgress(p=>({...p,meta:{...p.meta,navigatorUsed:true}}));
    setScreen(s); setTaskNum(num);
  }
  function handleSubjectChange(s){setSubject(s);setScreen(null);setTab("home");}

  const subj=SUBJECTS[subject]; const T=THEMES[theme];

  function renderContent(){
    if(screen==="trainer"&&taskNum)return<TrainerScreen subject={subject} taskNum={taskNum} progress={progress[subject]||{solved:{},correct:{}}} onProgress={handleProgress} onBack={()=>setScreen(null)} theme={theme}/>;
    if(screen==="exam")return<MockExamScreen subject={subject} onBack={()=>setScreen(null)} onFinish={(c,s)=>{setExamStats(e=>({...e,[subject]:{correct:c,score:s}}));setProgress(p=>({...p,meta:{...p.meta,examDone:true}}));setScreen(null);}} theme={theme}/>;
    if(screen==="achievements")return<AchievementsScreen progress={progress} theme={theme}/>;
    if(screen==="navigator")return<Navigator progress={progress} theme={theme}/>;
    if(tab==="home")return<HomeScreen progress={progress} subject={subject} onNavigate={navigate} theme={theme}/>;
    if(tab==="learn")return<LearnTab subject={subject} onNavigate={navigate} theme={theme}/>;
    if(tab==="exam")return<ExamTab subject={subject} onNavigate={navigate} examStats={examStats} theme={theme}/>;
    if(tab==="theory")return<TheoryScreen subject={subject} theme={theme}/>;
    return null;
  }

  const tabs=[{id:"home",icon:"📊",label:"Главная"},{id:"learn",icon:"✏️",label:"Учиться"},{id:"exam",icon:"📝",label:"Экзамен"},{id:"theory",icon:"📖",label:"Теория"}];

  return(
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Georgia', serif", maxWidth:480, margin:"0 auto" }}>
      {showWelcome&&<WelcomeScreen onClose={()=>setShowWelcome(false)} theme={theme}/>}
      {popup&&<AchievementPopup achievement={popup} onClose={()=>setPopup(null)}/>}
      <div style={{ background:T.header, borderBottom:`1px solid ${T.border}`, padding:"11px 16px", display:"flex", alignItems:"center", gap:10 }}>
        {screen&&<button onClick={()=>setScreen(null)} style={{ background:"none", border:"none", color:subj.color, fontSize:18, cursor:"pointer", padding:0 }}>←</button>}
        <div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(135deg,${subj.color},${subj.color}99)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:"bold", color:"#fff" }}>{subj.icon}</div>
        <div>
          <div style={{ fontSize:14, fontWeight:"bold", color:T.text }}>{subj.title} ЕГЭ 2026</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:7, alignItems:"center" }}>
          <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:18, padding:"4px 9px", color:T.subtext, fontSize:15, cursor:"pointer" }}>{theme==="dark"?"☀️":"🌙"}</button>
          <button onClick={()=>setShowWelcome(true)} style={{ background:"none", border:"none", color:T.subtext, fontSize:17, cursor:"pointer" }}>?</button>
        </div>
      </div>
      {!screen&&<SubjectSelector currentSubject={subject} onSelect={handleSubjectChange} theme={theme}/>}
      <div style={{ paddingBottom:70 }}>{renderContent()}</div>
      {!screen&&(
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:T.header, borderTop:`1px solid ${T.border}`, display:"flex" }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:"10px 0", background:"none", border:"none", cursor:"pointer", color:tab===t.id?subj.color:T.subtext, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
              <span style={{ fontSize:19 }}>{t.icon}</span>
              <span style={{ fontSize:9, fontFamily:"inherit" }}>{t.label}</span>
            </button>
          ))}
        </div>
      )}
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}*{box-sizing:border-box;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#2a3050;}`}</style>
    </div>
  );
}
