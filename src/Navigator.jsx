import { useState } from "react";
import { UNIVERSITIES, CITIES, TIERS } from "./universities.js";

const THEMES = {
  dark: { bg:"#0a0e1a", card:"#151c30", border:"#2a3050", text:"#e8eaf0", subtext:"#6b7db3", header:"#0d1220", input:"#0d1220" },
  light: { bg:"#f0f2f8", card:"#ffffff", border:"#d0d8f0", text:"#1a2040", subtext:"#5566aa", header:"#e0e4f4", input:"#f8f9ff" }
};

// Предсказание балла на основе прогресса
function predictScore(progress) {
  const allSolved = Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(progress[k]?.solved||{}).reduce((a,b)=>a+b,0),0);
  const allCorrect = Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(progress[k]?.correct||{}).reduce((a,b)=>a+b,0),0);
  const accuracy = allSolved > 0 ? allCorrect / allSolved : 0;
  // Базовый балл + прогресс
  const base = 40 + Math.min(30, allSolved * 0.3);
  const accuracyBonus = accuracy * 30;
  return Math.round(base + accuracyBonus);
}

export default function Navigator({ progress, theme }) {
  const T = THEMES[theme];
  const [step, setStep] = useState("intro"); // intro | select | result
  const [selectedCity, setSelectedCity] = useState("Все города");
  const [selectedUni, setSelectedUni] = useState(null);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const myScore = predictScore(progress) * 3; // умножаем на 3 (три предмета)
  const allSolved = Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(progress[k]?.solved||{}).reduce((a,b)=>a+b,0),0);

  const filtered = UNIVERSITIES.filter(u => {
    const cityMatch = selectedCity === "Все города" || u.city === selectedCity;
    const searchMatch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.faculty.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase());
    return cityMatch && searchMatch;
  }).slice(0, showAll ? 999 : 20);

  if (step === "intro") {
    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🎯</div>
          <div style={{ fontSize:20, fontWeight:"bold", color:T.text, marginBottom:8 }}>Навигатор поступления</div>
          <div style={{ fontSize:14, color:T.subtext, lineHeight:1.7 }}>
            Выбери вуз мечты и узнай сколько баллов нужно. Приложение покажет твой текущий уровень и сколько осталось до цели.
          </div>
        </div>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:16, marginBottom:16 }}>
          <div style={{ fontSize:13, color:T.subtext, marginBottom:8 }}>📊 Как это работает:</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { n:"1", t:"Выбери вуз и направление", d:"Поиск по названию или городу" },
              { n:"2", t:"Узнай нужный балл", d:"Данные по итогам 2025 года" },
              { n:"3", t:"Увидь сколько не хватает", d:"На основе твоего прогресса в тренажёре" },
              { n:"4", t:"Занимайся целенаправленно", d:"Каждая задача приближает к цели" },
            ].map(s=>(
              <div key={s.n} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#4f7ef7,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", fontWeight:"bold", flexShrink:0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:"bold", color:T.text }}>{s.t}</div>
                  <div style={{ fontSize:12, color:T.subtext }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:"rgba(79,126,247,0.08)", border:"1px solid rgba(79,126,247,0.2)", borderRadius:12, padding:12, marginBottom:16, fontSize:12, color:T.subtext, lineHeight:1.6 }}>
          ⚠️ Баллы указаны по итогам приёмной кампании 2025 года как ориентир. Актуальные проходные баллы публикуются вузами в августе. Проверяй на официальном сайте вуза.
        </div>

        <button onClick={()=>setStep("select")} style={{ width:"100%", padding:16, background:"linear-gradient(135deg,#4f7ef7,#3b6be0)", border:"none", borderRadius:14, color:"#fff", fontSize:16, cursor:"pointer", fontWeight:"bold", fontFamily:"inherit" }}>
          Выбрать вуз мечты →
        </button>
      </div>
    );
  }

  if (step === "select") {
    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <button onClick={()=>setStep("intro")} style={{ background:"none", border:"none", color:"#4f7ef7", fontSize:14, cursor:"pointer", marginBottom:14, padding:0 }}>← Назад</button>
        <div style={{ fontSize:17, fontWeight:"bold", color:T.text, marginBottom:14 }}>Выбери вуз</div>

        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Поиск по названию, факультету, городу..."
          style={{ width:"100%", padding:"12px 14px", background:T.input, border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", marginBottom:10 }} />

        <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", scrollbarWidth:"none", paddingBottom:4 }}>
          {["Все города", ...CITIES].map(c=>(
            <button key={c} onClick={()=>setSelectedCity(c)} style={{ padding:"6px 12px", borderRadius:20, border:`1px solid ${selectedCity===c?"#4f7ef7":T.border}`, background:selectedCity===c?"rgba(79,126,247,0.15)":"transparent", color:selectedCity===c?"#4f7ef7":T.subtext, fontSize:12, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>{c}</button>
          ))}
        </div>

        <div style={{ fontSize:12, color:T.subtext, marginBottom:10 }}>Найдено: {UNIVERSITIES.filter(u=>(selectedCity==="Все города"||u.city===selectedCity)&&(!search||u.name.toLowerCase().includes(search.toLowerCase())||u.faculty.toLowerCase().includes(search.toLowerCase())||u.city.toLowerCase().includes(search.toLowerCase()))).length} вузов/программ</div>

        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.map(u=>{
            const diff = u.score - myScore;
            const canApply = diff <= 0;
            const close = diff > 0 && diff <= 30;
            return (
              <button key={u.id} onClick={()=>{setSelectedUni(u);setStep("result");}} style={{ background:T.card, border:`1px solid ${canApply?"#4ade80":close?"#f59e0b":T.border}`, borderRadius:14, padding:"13px 14px", textAlign:"left", cursor:"pointer", color:T.text, fontFamily:"inherit", transition:"all 0.2s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:"bold", marginBottom:2 }}>{u.name}</div>
                    <div style={{ fontSize:12, color:T.subtext, marginBottom:4 }}>{u.faculty} · {u.city}</div>
                    <div style={{ fontSize:11, color:T.subtext }}>{u.subjects.join(", ")}</div>
                  </div>
                  <div style={{ textAlign:"right", marginLeft:10, flexShrink:0 }}>
                    <div style={{ fontSize:16, fontWeight:"bold", color:TIERS[u.tier]?.color }}>{u.score}</div>
                    <div style={{ fontSize:10, color:T.subtext }}>баллов</div>
                    {canApply && <div style={{ fontSize:10, color:"#4ade80", marginTop:2 }}>✓ достижимо</div>}
                    {close && <div style={{ fontSize:10, color:"#f59e0b", marginTop:2 }}>близко!</div>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {!showAll && filtered.length >= 20 && (
          <button onClick={()=>setShowAll(true)} style={{ width:"100%", marginTop:12, padding:12, background:"transparent", border:`1px solid ${T.border}`, borderRadius:12, color:T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>
            Показать все вузы
          </button>
        )}
      </div>
    );
  }

  if (step === "result" && selectedUni) {
    const u = selectedUni;
    const diff = u.score - myScore;
    const canApply = diff <= 0;
    const percent = Math.min(100, Math.round((myScore / u.score) * 100));
    const daysNeeded = Math.max(0, Math.round(diff / 2)); // примерно 2 балла в день при активной подготовке

    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <button onClick={()=>setStep("select")} style={{ background:"none", border:"none", color:"#4f7ef7", fontSize:14, cursor:"pointer", marginBottom:14, padding:0 }}>← Другой вуз</button>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:20, padding:20, marginBottom:16 }}>
          <div style={{ fontSize:18, fontWeight:"bold", color:T.text, marginBottom:4 }}>{u.name}</div>
          <div style={{ fontSize:14, color:T.subtext, marginBottom:16 }}>{u.faculty} · {u.city}</div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
            <div style={{ background:T.input, border:`1px solid ${T.border}`, borderRadius:12, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:22, fontWeight:"bold", color:"#f59e0b" }}>{u.score}</div>
              <div style={{ fontSize:11, color:T.subtext }}>Нужно баллов</div>
            </div>
            <div style={{ background:T.input, border:`1px solid ${T.border}`, borderRadius:12, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:22, fontWeight:"bold", color:canApply?"#4ade80":"#4f7ef7" }}>{myScore}</div>
              <div style={{ fontSize:11, color:T.subtext }}>Твой прогноз</div>
            </div>
          </div>

          <div style={{ marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:13, color:T.subtext }}>Прогресс к цели</span>
              <span style={{ fontSize:13, fontWeight:"bold", color:canApply?"#4ade80":"#4f7ef7" }}>{percent}%</span>
            </div>
            <div style={{ background:T.border, borderRadius:8, height:12, overflow:"hidden" }}>
              <div style={{ width:`${percent}%`, height:"100%", background:canApply?"linear-gradient(90deg,#4ade80,#16a34a)":"linear-gradient(90deg,#4f7ef7,#a855f7)", borderRadius:8, transition:"width 1s ease" }} />
            </div>
          </div>

          {canApply ? (
            <div style={{ background:"rgba(74,222,128,0.1)", border:"1px solid #4ade80", borderRadius:12, padding:14, textAlign:"center" }}>
              <div style={{ fontSize:20, marginBottom:4 }}>🎉</div>
              <div style={{ fontSize:15, fontWeight:"bold", color:"#4ade80" }}>Твоего уровня достаточно!</div>
              <div style={{ fontSize:13, color:T.subtext, marginTop:4 }}>Продолжай заниматься чтобы увеличить шансы</div>
            </div>
          ) : (
            <div style={{ background:"rgba(79,126,247,0.08)", border:"1px solid rgba(79,126,247,0.3)", borderRadius:12, padding:14 }}>
              <div style={{ fontSize:15, fontWeight:"bold", color:"#4f7ef7", marginBottom:8 }}>
                Не хватает: {diff} баллов
              </div>
              <div style={{ fontSize:13, color:T.subtext, lineHeight:1.6 }}>
                При активной подготовке по 30 минут в день — примерно {daysNeeded} дней до цели.
              </div>
            </div>
          )}
        </div>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:16, marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:"bold", color:T.text, marginBottom:10 }}>📋 Предметы ЕГЭ</div>
          {u.subjects.map(s=>(
            <div key={s} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#4f7ef7", flexShrink:0 }} />
              <span style={{ fontSize:14, color:T.text }}>{s}</span>
            </div>
          ))}
          {u.note && <div style={{ marginTop:10, fontSize:12, color:"#f59e0b", background:"rgba(245,158,11,0.08)", padding:10, borderRadius:8 }}>⚠️ {u.note}</div>}
        </div>

        <div style={{ background:"rgba(248,113,113,0.05)", border:"1px solid rgba(248,113,113,0.15)", borderRadius:12, padding:12, marginBottom:16, fontSize:12, color:T.subtext, lineHeight:1.6 }}>
          📌 Данные по итогам 2025 года. Актуальные баллы — на официальном сайте вуза в августе.
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>setStep("select")} style={{ flex:1, padding:13, background:"transparent", border:`1px solid ${T.border}`, borderRadius:12, color:T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>
            ← Другой вуз
          </button>
          <button onClick={()=>window.open(u.url,"_blank")} style={{ flex:1, padding:13, background:"linear-gradient(135deg,#4f7ef7,#3b6be0)", border:"none", borderRadius:12, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>
            Сайт вуза →
          </button>
        </div>
      </div>
    );
  }

  return null;
}
