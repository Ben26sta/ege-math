import { useState, useEffect, useRef } from "react";
import { SUBJECTS, SUBJECT_LIST } from "./subjects.js";

const ACHIEVEMENTS_LIST = [
  { id: "first", icon: "🌟", title: "Первые шаги", desc: "Решить первую задачу", check: (s) => Object.values(s.solved).reduce((a,b)=>a+b,0) >= 1 },
  { id: "ten", icon: "✏️", title: "Прилежный ученик", desc: "Решить 10 задач", check: (s) => Object.values(s.solved).reduce((a,b)=>a+b,0) >= 10 },
  { id: "fifty", icon: "📚", title: "Марафонец", desc: "Решить 50 задач", check: (s) => Object.values(s.solved).reduce((a,b)=>a+b,0) >= 50 },
  { id: "hundred", icon: "🏆", title: "Чемпион", desc: "Решить 100 задач", check: (s) => Object.values(s.solved).reduce((a,b)=>a+b,0) >= 100 },
  { id: "accuracy80", icon: "🎯", title: "Меткий стрелок", desc: "Точность выше 80% (мин. 10 задач)", check: (s) => { const t=Object.values(s.solved).reduce((a,b)=>a+b,0); const c=Object.values(s.correct).reduce((a,b)=>a+b,0); return t>=10 && c/t>=0.8; } },
  { id: "streak10", icon: "💎", title: "Перфекционист", desc: "10 задач подряд без ошибок", check: (s) => (s.streak||0) >= 10 },
  { id: "multisubject", icon: "🌍", title: "Многопредметник", desc: "Заниматься по 3 предметам", check: (s) => (s.subjectsTried||[]).length >= 3 },
  { id: "exam", icon: "📝", title: "Экзаменатор", desc: "Пройти пробный экзамен", check: (s) => s.examDone },
  { id: "streak3", icon: "🔥", title: "3 дня подряд", desc: "Заниматься 3 дня подряд", check: (s) => (s.days||0) >= 3 },
  { id: "streak7", icon: "⚡", title: "Неделя!", desc: "Заниматься 7 дней подряд", check: (s) => (s.days||0) >= 7 },
];

function ProgressBar({ value, max, color = "#4f7ef7" }) {
  return (
    <div style={{ background: "#1e2540", borderRadius: 6, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, max > 0 ? (value/max)*100 : 0)}%`, height: "100%", background: color, borderRadius: 6, transition: "width 0.5s ease" }} />
    </div>
  );
}

function AchievementPopup({ achievement, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 999, background: "linear-gradient(135deg, #1a2540, #0d1830)", border: "1px solid #4f7ef7", borderRadius: 16, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 30px rgba(79,126,247,0.4)", animation: "slideDown 0.4s ease", maxWidth: 320, width: "90%" }}>
      <div style={{ fontSize: 32 }}>{achievement.icon}</div>
      <div>
        <div style={{ fontSize: 11, color: "#4f7ef7", textTransform: "uppercase", letterSpacing: 1 }}>Достижение!</div>
        <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{achievement.title}</div>
        <div style={{ fontSize: 12, color: "#6b7db3" }}>{achievement.desc}</div>
      </div>
    </div>
  );
}

function WelcomeScreen({ onClose }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "📚", title: "МатЕГЭ — 4 предмета", text: "Готовься к ЕГЭ по математике, русскому языку, обществознанию и английскому. Всё в одном приложении!" },
    { icon: "✏️", title: "Тренажёр", text: "Выбирай предмет и задание. Решай задачи с вариантами ответов и вводом. После — разбор решения." },
    { icon: "📝", title: "Пробный экзамен", text: "Экзамен на время для каждого предмета. После — разбор ошибок и примерный балл." },
    { icon: "📖", title: "Теория", text: "Краткие шпаргалки по всем темам. Открой перед экзаменом — повтори за 5 минут." },
    { icon: "🏆", title: "Достижения", text: "Получай награды за прогресс! Занимайся каждый день и открывай новые достижения." },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 20, padding: 28, maxWidth: 360, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{steps[step].icon}</div>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 8 }}>{steps[step].title}</div>
          <div style={{ fontSize: 14, color: "#8899bb", lineHeight: 1.6 }}>{steps[step].text}</div>
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
          {steps.map((_, i) => <div key={i} style={{ width: i===step?20:8, height: 8, borderRadius: 4, background: i===step?"#4f7ef7":"#2a3050", transition: "all 0.3s" }} />)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {step > 0 && <button onClick={() => setStep(s=>s-1)} style={{ flex: 1, padding: 12, background: "transparent", border: "1px solid #2a3050", borderRadius: 12, color: "#6b7db3", cursor: "pointer", fontFamily: "inherit" }}>← Назад</button>}
          <button onClick={() => step < steps.length-1 ? setStep(s=>s+1) : onClose()} style={{ flex: 1, padding: 12, background: "linear-gradient(135deg, #4f7ef7, #3b6be0)", border: "none", borderRadius: 12, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: "bold" }}>
            {step < steps.length-1 ? "Далее →" : "Начать! 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SubjectSelector({ currentSubject, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "10px 16px", background: "#0d1220", borderBottom: "1px solid #1e2540", overflowX: "auto", scrollbarWidth: "none" }}>
      {SUBJECT_LIST.map(id => {
        const s = SUBJECTS[id];
        const active = currentSubject === id;
        return (
          <button key={id} onClick={() => onSelect(id)} style={{
            padding: "8px 14px", borderRadius: 20, border: `1px solid ${active ? s.color : "#2a3050"}`,
            background: active ? `${s.color}20` : "transparent",
            color: active ? s.color : "#6b7db3", fontSize: 13, cursor: "pointer",
            whiteSpace: "nowrap", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 15, fontWeight: "bold" }}>{s.icon}</span>
            {s.title}
          </button>
        );
      })}
    </div>
  );
}

function HomeScreen({ progress, subject, onNavigate }) {
  const subj = SUBJECTS[subject];
  const subProgress = progress[subject] || { solved: {}, correct: {} };
  const totalSolved = Object.values(subProgress.solved).reduce((a,b)=>a+b,0);
  const totalCorrect = Object.values(subProgress.correct).reduce((a,b)=>a+b,0);
  const accuracy = totalSolved > 0 ? Math.round((totalCorrect/totalSolved)*100) : 0;
  const allSolved = Object.values(progress).reduce((acc, sp) => acc + Object.values(sp.solved||{}).reduce((a,b)=>a+b,0), 0);
  const unlockedCount = ACHIEVEMENTS_LIST.filter(a => a.check({ ...progress.meta||{}, ...Object.keys(progress).reduce((acc,k)=>({solved:{...acc.solved,...(progress[k].solved||{})},correct:{...acc.correct,...(progress[k].correct||{})}}),{solved:{},correct:{}})})).length;
  const weakTopics = Object.entries(subProgress.solved).filter(([k,v])=>v>0).map(([k])=>({ num: k, acc: Math.round((subProgress.correct[k]||0)/subProgress.solved[k]*100) })).filter(t=>t.acc<60).slice(0,3);

  return (
    <div style={{ padding: "16px", overflowY: "auto", maxHeight: "calc(100vh - 175px)" }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>{subj.title} — ЕГЭ 2026</div>
        <div style={{ fontSize: 13, color: "#6b7db3", marginTop: 2 }}>{subj.description}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 14, padding: 12, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: "bold", color: subj.color }}>{totalSolved}</div>
          <div style={{ fontSize: 10, color: "#6b7db3" }}>Решено</div>
        </div>
        <div style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 14, padding: 12, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#f59e0b" }}>{accuracy}%</div>
          <div style={{ fontSize: 10, color: "#6b7db3" }}>Точность</div>
        </div>
        <div style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 14, padding: 12, textAlign: "center", cursor: "pointer" }} onClick={() => onNavigate("achievements")}>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#f59e0b" }}>{unlockedCount}/{ACHIEVEMENTS_LIST.length}</div>
          <div style={{ fontSize: 10, color: "#6b7db3" }}>Награды</div>
        </div>
      </div>

      {(progress.meta?.days||0) > 0 && (
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: "bold", color: "#f59e0b" }}>{progress.meta.days} {progress.meta.days===1?"день":progress.meta.days<5?"дня":"дней"} подряд!</div>
            <div style={{ fontSize: 11, color: "#8899bb" }}>Всего решено задач: {allSolved}</div>
          </div>
        </div>
      )}

      {weakTopics.length > 0 && (
        <div style={{ background: "#1a1020", border: "1px solid #3a2040", borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "#f87171", fontWeight: "bold", marginBottom: 8 }}>⚠️ Нужна практика:</div>
          {weakTopics.map(t => (
            <div key={t.num} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: "#e8eaf0" }}>{subj.tasks[t.num]?.title}</span>
              <span style={{ fontSize: 11, color: "#f87171" }}>{t.acc}%</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontSize: 12, color: "#6b7db3", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Разделы</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.entries(subj.tasks).map(([num, task]) => {
          const solved = subProgress.solved[num] || 0;
          const correct = subProgress.correct[num] || 0;
          const acc = solved > 0 ? Math.round(correct/solved*100) : null;
          return (
            <button key={num} onClick={() => onNavigate("trainer", num)} style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 14, padding: "12px 14px", textAlign: "left", cursor: "pointer", color: "#e8eaf0", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=subj.color} onMouseLeave={e=>e.currentTarget.style.borderColor="#2a3050"}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: "bold", marginBottom: 2 }}>{task.title} — {task.topic}</div>
                <div style={{ fontSize: 11, color: "#6b7db3" }}>{task.description}</div>
                {solved > 0 && <div style={{ marginTop: 5 }}><ProgressBar value={correct} max={solved} color={acc>=70?"#4ade80":acc>=40?"#f59e0b":"#f87171"} /></div>}
              </div>
              <div style={{ marginLeft: 10 }}>
                {acc !== null ? <span style={{ fontSize: 12, color: acc>=70?"#4ade80":acc>=40?"#f59e0b":"#f87171", fontWeight: "bold" }}>{acc}%</span> : <span style={{ color: subj.color, fontSize: 18 }}>→</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrainerScreen({ subject, taskNum, progress, onProgress, onBack }) {
  const subj = SUBJECTS[subject];
  const task = subj.tasks[taskNum];
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);
  const [aiExplain, setAiExplain] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const q = task.questions[qIndex];

  function checkAnswer() {
    const isCorrect = q.type === "choice" ? answer === q.answer : answer.trim().replace(",",".") === q.answer;
    setResult(isCorrect ? "correct" : "wrong");
    onProgress(subject, taskNum, isCorrect);
  }

  async function askAI() {
    setAiLoading(true); setAiExplain("");
    try {
      const resp = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: `Ты репетитор по предмету ${subj.title} для подготовки к ЕГЭ. Объясняй кратко и понятно на русском языке.`, messages: [{ role: "user", content: `${subj.title} ЕГЭ, ${task.topic}:\n"${q.text}"\nПравильный ответ: ${q.answer}\nОбъясни почему это правильный ответ и дай лайфхак для запоминания.` }] }) });
      const data = await resp.json();
      setAiExplain(data.content?.map(b=>b.text||"").join("") || "Ошибка");
    } catch(e) { setAiExplain("Ошибка: " + e.message); }
    setAiLoading(false);
  }

  function next() {
    if (qIndex < task.questions.length-1) { setQIndex(qIndex+1); setAnswer(""); setResult(null); setAiExplain(""); }
    else onBack();
  }

  return (
    <div style={{ padding: "16px", overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: subj.color, fontSize: 14, cursor: "pointer", marginBottom: 14, padding: 0 }}>← Назад</button>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff", marginBottom: 3 }}>{task.title} — {task.topic}</div>
        <div style={{ fontSize: 12, color: "#6b7db3" }}>Вопрос {qIndex+1} из {task.questions.length}</div>
        <div style={{ marginTop: 6 }}><ProgressBar value={qIndex} max={task.questions.length} color={subj.color} /></div>
      </div>

      <button onClick={() => setShowTheory(!showTheory)} style={{ width: "100%", padding: "8px 14px", background: showTheory?`${subj.color}15`:"transparent", border: `1px solid ${showTheory?subj.color:"#2a3050"}`, borderRadius: 10, color: subj.color, fontSize: 12, cursor: "pointer", textAlign: "left", marginBottom: 12, fontFamily: "inherit" }}>
        📖 {showTheory ? "Скрыть" : "Показать"} теорию
      </button>
      {showTheory && <div style={{ background: "#0d1220", border: "1px solid #2a3050", borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 13, color: "#8899bb", lineHeight: 1.8, whiteSpace: "pre-line" }}>{task.theory}</div>}

      <div style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 16, padding: 18, marginBottom: 14 }}>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: "#e8eaf0", whiteSpace: "pre-line" }}>{q.text}</div>
      </div>

      {q.type === "choice" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {q.options.map(opt => {
            const letter = opt[0];
            const isSelected = answer === letter;
            const isCorrect = result && letter === q.answer;
            const isWrong = result && isSelected && letter !== q.answer;
            return (
              <button key={opt} onClick={() => !result && setAnswer(letter)} style={{
                padding: "12px 16px", borderRadius: 12, border: `1px solid ${isCorrect?"#4ade80":isWrong?"#f87171":isSelected?subj.color:"#2a3050"}`,
                background: isCorrect?"rgba(74,222,128,0.1)":isWrong?"rgba(248,113,113,0.1)":isSelected?`${subj.color}15`:"#151c30",
                color: isCorrect?"#4ade80":isWrong?"#f87171":"#e8eaf0", textAlign: "left", cursor: result?"default":"pointer",
                fontSize: 14, fontFamily: "inherit", transition: "all 0.2s",
              }}>{opt}</button>
            );
          })}
        </div>
      ) : (
        <input value={answer} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!result&&checkAnswer()} placeholder="Введите ответ..." disabled={!!result}
          style={{ width: "100%", padding: "12px 16px", background: "#151c30", border: `1px solid ${result==="correct"?"#4ade80":result==="wrong"?"#f87171":"#2a3050"}`, borderRadius: 12, color: "#e8eaf0", fontSize: 16, outline: "none", boxSizing: "border-box", fontFamily: "inherit", marginBottom: 14 }} />
      )}

      {!result ? (
        <button onClick={checkAnswer} disabled={!answer} style={{ width: "100%", padding: 14, background: answer?`linear-gradient(135deg, ${subj.color}, ${subj.color}cc)`:"#1e2540", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, cursor: answer?"pointer":"not-allowed", fontFamily: "inherit" }}>Проверить</button>
      ) : (
        <div>
          <div style={{ padding: 14, borderRadius: 12, marginBottom: 12, background: result==="correct"?"rgba(74,222,128,0.1)":"rgba(248,113,113,0.1)", border: `1px solid ${result==="correct"?"#4ade80":"#f87171"}` }}>
            <div style={{ fontSize: 14, fontWeight: "bold", color: result==="correct"?"#4ade80":"#f87171", marginBottom: 4 }}>{result==="correct"?"✅ Верно!":"❌ Неверно. Ответ: "+q.answer}</div>
            <div style={{ fontSize: 13, color: "#b0bdd4" }}>{q.solution}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={next} style={{ flex: 1, padding: 14, background: `linear-gradient(135deg, ${subj.color}, ${subj.color}cc)`, border: "none", borderRadius: 12, color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
              {qIndex < task.questions.length-1 ? "Следующий →" : "Завершить ✓"}
            </button>
            <button onClick={askAI} disabled={aiLoading} style={{ padding: 14, background: "rgba(168,85,247,0.1)", border: "1px solid #a855f7", borderRadius: 12, color: "#a855f7", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              {aiLoading ? "..." : "🤖"}
            </button>
          </div>
          {aiExplain && <div style={{ marginTop: 12, background: "rgba(168,85,247,0.08)", border: "1px solid #4a2060", borderRadius: 12, padding: 14, fontSize: 13, color: "#c9b3e8", lineHeight: 1.7 }}>{aiExplain.split("\n").map((l,i)=><span key={i}>{l}<br/></span>)}</div>}
        </div>
      )}
    </div>
  );
}

function TheoryScreen({ subject }) {
  const subj = SUBJECTS[subject];
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: "16px", overflowY: "auto", maxHeight: "calc(100vh - 175px)" }}>
      <div style={{ fontSize: 17, fontWeight: "bold", color: "#fff", marginBottom: 4 }}>📖 Теория — {subj.title}</div>
      <div style={{ fontSize: 13, color: "#6b7db3", marginBottom: 16 }}>Шпаргалки для ЕГЭ</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.entries(subj.tasks).map(([num, task]) => (
          <div key={num}>
            <button onClick={() => setSelected(selected===num?null:num)} style={{ width: "100%", background: selected===num?`${subj.color}15`:"#151c30", border: `1px solid ${selected===num?subj.color:"#2a3050"}`, borderRadius: selected===num?"14px 14px 0 0":"14px", padding: "12px 14px", textAlign: "left", cursor: "pointer", color: "#e8eaf0", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: "bold" }}>{task.title} — {task.topic}</div>
              <span style={{ color: subj.color }}>{selected===num?"▲":"▼"}</span>
            </button>
            {selected===num && <div style={{ background: "#0d1220", border: `1px solid ${subj.color}40`, borderTopWidth: 0, borderRadius: "0 0 14px 14px", padding: 14, fontSize: 13, color: "#8899bb", lineHeight: 1.9, whiteSpace: "pre-line" }}>{task.theory}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsScreen({ progress }) {
  const allProgress = {
    ...Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>({ solved:{...acc.solved,...(progress[k].solved||{})}, correct:{...acc.correct,...(progress[k].correct||{})} }),{solved:{},correct:{}}),
    ...(progress.meta||{})
  };
  const unlocked = ACHIEVEMENTS_LIST.filter(a => a.check(allProgress));
  const locked = ACHIEVEMENTS_LIST.filter(a => !a.check(allProgress));
  return (
    <div style={{ padding: "16px", overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
      <div style={{ fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 4 }}>🏆 Достижения</div>
      <div style={{ fontSize: 13, color: "#6b7db3", marginBottom: 12 }}>{unlocked.length} из {ACHIEVEMENTS_LIST.length} получено</div>
      <div style={{ marginBottom: 16 }}><ProgressBar value={unlocked.length} max={ACHIEVEMENTS_LIST.length} color="#f59e0b" /></div>
      {unlocked.length > 0 && (
        <>
          <div style={{ fontSize: 12, color: "#4ade80", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>✅ Получено</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {unlocked.map(a => (
              <div key={a.id} style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "#4ade80" }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ fontSize: 12, color: "#6b7db3", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>🔒 Ещё не получено</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {locked.map(a => (
          <div key={a.id} style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, opacity: 0.5 }}>
            <span style={{ fontSize: 28, filter: "grayscale(1)" }}>{a.icon}</span>
            <div>
              <div style={{ fontSize: 14, color: "#8899bb" }}>{a.title}</div>
              <div style={{ fontSize: 12, color: "#4a5570" }}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamTab({ subject, onNavigate, examStats }) {
  const subj = SUBJECTS[subject];
  const totalQ = Object.values(subj.tasks).reduce((acc, t) => acc + t.questions.length, 0);
  return (
    <div style={{ padding: 16 }}>
      {examStats?.[subject] && (
        <div style={{ background: `${subj.color}15`, border: `1px solid ${subj.color}40`, borderRadius: 14, padding: 16, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#6b7db3" }}>Последний результат</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: subj.color }}>~{examStats[subject].score} баллов</div>
          <div style={{ fontSize: 13, color: "#8899bb" }}>Верных: {examStats[subject].correct}</div>
        </div>
      )}
      <div style={{ fontSize: 17, fontWeight: "bold", color: "#fff", marginBottom: 6 }}>Пробный экзамен — {subj.title}</div>
      <div style={{ fontSize: 13, color: "#6b7db3", marginBottom: 6, lineHeight: 1.6 }}>{totalQ} вопросов по всем разделам. Таймер 45 минут.</div>
      <div style={{ fontSize: 13, color: "#6b7db3", marginBottom: 20, lineHeight: 1.6 }}>После завершения — полный разбор ошибок.</div>
      <button onClick={() => onNavigate("exam")} style={{ width: "100%", padding: 16, background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, cursor: "pointer", fontWeight: "bold", fontFamily: "inherit" }}>
        Начать экзамен ⏱
      </button>
    </div>
  );
}

function MockExamScreen({ subject, onBack, onFinish }) {
  const subj = SUBJECTS[subject];
  const allQuestions = Object.entries(subj.tasks).flatMap(([num, task]) =>
    task.questions.slice(0, 3).map(q => ({ ...q, taskTitle: task.title, taskNum: num }))
  );
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45*60);
  const [results, setResults] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setTimeLeft(t => { if(t<=1){clearInterval(timerRef.current);handleSubmit();return 0;} return t-1; }), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  function handleSubmit() {
    clearInterval(timerRef.current);
    let correct = 0;
    const res = allQuestions.map(q => {
      const ua = answers[q.id] || "";
      const ok = q.type==="choice" ? ua===q.answer : ua.trim().replace(",",".")===q.answer;
      if(ok) correct++;
      return {...q, userAns: ua, isCorrect: ok};
    });
    setResults(res); setSubmitted(true);
    onFinish(correct, Math.round(27+(correct/allQuestions.length)*73));
  }

  const mins = Math.floor(timeLeft/60), secs = timeLeft%60;

  if (submitted && results) {
    const correct = results.filter(r=>r.isCorrect).length;
    return (
      <div style={{ padding: 16, overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 36 }}>{correct/results.length>=0.7?"🎉":correct/results.length>=0.5?"👍":"📚"}</div>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>~{Math.round(27+(correct/results.length)*73)} баллов</div>
          <div style={{ color: "#6b7db3" }}>{correct} из {results.length} правильных</div>
        </div>
        {results.map(r => (
          <div key={r.id} style={{ background: "#151c30", border: `1px solid ${r.isCorrect?"#4ade80":"#f87171"}`, borderRadius: 12, padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: r.isCorrect?0:4 }}>
              <span style={{ fontSize: 12, color: "#6b7db3" }}>{r.taskTitle}</span>
              <span style={{ color: r.isCorrect?"#4ade80":"#f87171", fontSize: 13 }}>{r.isCorrect?"✅":"❌ → "+r.answer}</span>
            </div>
            {!r.isCorrect && <div style={{ fontSize: 12, color: "#8899bb" }}>{r.solution}</div>}
          </div>
        ))}
        <button onClick={onBack} style={{ width: "100%", padding: 14, background: `linear-gradient(135deg, ${subj.color}, ${subj.color}cc)`, border: "none", borderRadius: 12, color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "inherit", marginTop: 10 }}>← Назад</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div><div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{subj.title} — Экзамен</div><div style={{ fontSize: 12, color: "#6b7db3" }}>{Object.keys(answers).length}/{allQuestions.length}</div></div>
        <div style={{ fontSize: 20, fontWeight: "bold", color: timeLeft<300?"#f87171":timeLeft<600?"#f59e0b":"#4ade80" }}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
      </div>
      <div style={{ marginBottom: 14 }}><ProgressBar value={Object.keys(answers).length} max={allQuestions.length} color="#f59e0b" /></div>
      {allQuestions.map(q => (
        <div key={q.id} style={{ background: "#151c30", border: `1px solid ${answers[q.id]?subj.color:"#2a3050"}`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#6b7db3", marginBottom: 6 }}>{q.taskTitle}</div>
          <div style={{ fontSize: 13, color: "#e8eaf0", lineHeight: 1.6, marginBottom: 10, whiteSpace: "pre-line" }}>{q.text}</div>
          {q.type === "choice" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {q.options.map(opt => (
                <button key={opt} onClick={() => setAnswers({...answers,[q.id]:opt[0]})} style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${answers[q.id]===opt[0]?subj.color:"#2a3050"}`, background: answers[q.id]===opt[0]?`${subj.color}15`:"transparent", color: "#e8eaf0", textAlign: "left", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>{opt}</button>
              ))}
            </div>
          ) : (
            <input value={answers[q.id]||""} onChange={e=>setAnswers({...answers,[q.id]:e.target.value})} placeholder="Ответ..." style={{ width: "100%", padding: "8px 12px", background: "#0d1220", border: "1px solid #2a3050", borderRadius: 10, color: "#e8eaf0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
          )}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ width: "100%", padding: 16, background: "linear-gradient(135deg, #4ade80, #16a34a)", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, cursor: "pointer", fontWeight: "bold", fontFamily: "inherit" }}>Завершить ✓</button>
    </div>
  );
}

export default function App() {
  const [subject, setSubject] = useState("math");
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState(null);
  const [taskNum, setTaskNum] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [popup, setPopup] = useState(null);
  const [examStats, setExamStats] = useState({});
  const [progress, setProgress] = useState({ meta: { streak: 0, days: 0, examDone: false, subjectsTried: [] } });

  function getSubjectProgress(subj) { return progress[subj] || { solved: {}, correct: {} }; }

  function getAllProgress() {
    return {
      ...Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>({ solved:{...acc.solved,...(progress[k].solved||{})}, correct:{...acc.correct,...(progress[k].correct||{})} }),{solved:{},correct:{}}),
      ...(progress.meta||{})
    };
  }

  function checkAchievements(newProgress) {
    const allP = { ...Object.keys(newProgress).filter(k=>k!=="meta").reduce((acc,k)=>({solved:{...acc.solved,...(newProgress[k].solved||{})},correct:{...acc.correct,...(newProgress[k].correct||{})}}),{solved:{},correct:{}}), ...(newProgress.meta||{}) };
    const prevAllP = getAllProgress();
    const prev = ACHIEVEMENTS_LIST.filter(a => a.check(prevAllP));
    const next = ACHIEVEMENTS_LIST.filter(a => a.check(allP));
    const newOnes = next.filter(a => !prev.find(p => p.id === a.id));
    if (newOnes.length > 0) setPopup(newOnes[0]);
  }

  function handleProgress(subj, num, isCorrect) {
    setProgress(p => {
      const sp = p[subj] || { solved: {}, correct: {} };
      const newStreak = isCorrect ? (p.meta?.streak||0)+1 : 0;
      const tried = [...new Set([...(p.meta?.subjectsTried||[]), subj])];
      const newP = {
        ...p,
        [subj]: { solved: {...sp.solved, [num]: (sp.solved[num]||0)+1}, correct: {...sp.correct, [num]: (sp.correct[num]||0)+(isCorrect?1:0)} },
        meta: { ...p.meta, streak: newStreak, days: Math.max(p.meta?.days||0, 1), subjectsTried: tried }
      };
      setTimeout(() => checkAchievements(newP), 100);
      return newP;
    });
  }

  function navigate(s, num = null) { setScreen(s); setTaskNum(num); }

  function handleSubjectChange(s) {
    setSubject(s);
    setScreen(null);
    setTab("home");
  }

  const subj = SUBJECTS[subject];

  function renderContent() {
    if (screen === "trainer" && taskNum) return <TrainerScreen subject={subject} taskNum={taskNum} progress={getSubjectProgress(subject)} onProgress={handleProgress} onBack={() => setScreen(null)} />;
    if (screen === "exam") return <MockExamScreen subject={subject} onBack={() => setScreen(null)} onFinish={(c,s) => { setExamStats(e=>({...e,[subject]:{correct:c,score:s}})); setProgress(p=>({...p,meta:{...p.meta,examDone:true}})); setScreen(null); }} />;
    if (screen === "achievements") return <AchievementsScreen progress={progress} />;
    if (tab === "home") return <HomeScreen progress={progress} subject={subject} onNavigate={navigate} />;
    if (tab === "exam") return <ExamTab subject={subject} onNavigate={navigate} examStats={examStats} />;
    if (tab === "theory") return <TheoryScreen subject={subject} />;
    return null;
  }

  const tabs = [
    { id: "home", icon: "📊", label: "Прогресс" },
    { id: "exam", icon: "📝", label: "Экзамен" },
    { id: "theory", icon: "📖", label: "Теория" },
  ];

  const showSubjectSelector = !screen || (screen !== "achievements");

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#e8eaf0", fontFamily: "'Georgia', serif", maxWidth: 480, margin: "0 auto" }}>
      {showWelcome && <WelcomeScreen onClose={() => setShowWelcome(false)} />}
      {popup && <AchievementPopup achievement={popup} onClose={() => setPopup(null)} />}

      <div style={{ background: "linear-gradient(135deg, #1a1f35, #0d1220)", borderBottom: "1px solid #2a3050", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        {screen && <button onClick={() => setScreen(null)} style={{ background: "none", border: "none", color: subj.color, fontSize: 18, cursor: "pointer", padding: 0 }}>←</button>}
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${subj.color}, ${subj.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: "bold", color: "#fff" }}>{subj.icon}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{subj.title} ЕГЭ</div>
          <div style={{ fontSize: 10, color: "#6b7db3" }}>Подготовка 2026</div>
        </div>
        <button onClick={() => setShowWelcome(true)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#6b7db3", fontSize: 18, cursor: "pointer" }}>?</button>
      </div>

      {showSubjectSelector && <SubjectSelector currentSubject={subject} onSelect={handleSubjectChange} />}

      <div style={{ paddingBottom: 70 }}>{renderContent()}</div>

      {!screen && (
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#0d1220", borderTop: "1px solid #1e2540", display: "flex" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", cursor: "pointer", color: tab===t.id?subj.color:"#4a5570", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span style={{ fontSize: 10, fontFamily: "inherit" }}>{t.label}</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes slideDown { from{opacity:0;transform:translateX(-50%) translateY(-20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #2a3050; }
      `}</style>
    </div>
  );
}
