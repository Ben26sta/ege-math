import { useState } from "react";
import { UNIVERSITIES, CITIES, CATEGORIES, TIERS } from "./universities.js";

const THEMES = {
  dark: { bg:"#0a0e1a", card:"#151c30", border:"#2a3050", text:"#e8eaf0", subtext:"#6b7db3", header:"#0d1220", input:"#0d1220" },
  light: { bg:"#f0f2f8", card:"#ffffff", border:"#d0d8f0", text:"#1a2040", subtext:"#5566aa", header:"#e0e4f4", input:"#f8f9ff" }
};

function predictScore(progress) {
  const allSolved = Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(progress[k]?.solved||{}).reduce((a,b)=>a+b,0),0);
  const allCorrect = Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(progress[k]?.correct||{}).reduce((a,b)=>a+b,0),0);
  const accuracy = allSolved > 0 ? allCorrect / allSolved : 0;
  return Math.round(40 + Math.min(30, allSolved * 0.3) + accuracy * 30);
}

export default function Navigator({ progress, theme }) {
  const T = THEMES[theme];
  const [step, setStep] = useState("intro");
  const [selectedCity, setSelectedCity] = useState("Все города");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUni, setSelectedUni] = useState(null);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const myScore = predictScore(progress) * 3;
  const allSolved = Object.keys(progress).filter(k=>k!=="meta").reduce((acc,k)=>acc+Object.values(progress[k]?.solved||{}).reduce((a,b)=>a+b,0),0);

  const filtered = UNIVERSITIES.filter(u => {
    const cityMatch = selectedCity === "Все города" || u.city === selectedCity;
    const catMatch = selectedCategory === "all" || u.category === selectedCategory;
    const searchMatch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.faculty.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase());
    return cityMatch && catMatch && searchMatch;
  });

  const displayed = filtered.slice(0, showAll ? 999 : 25);

  if (step === "intro") {
    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ fontSize:44, marginBottom:10 }}>🎯</div>
          <div style={{ fontSize:19, fontWeight:"bold", color:T.text, marginBottom:8 }}>Навигатор поступления</div>
          <div style={{ fontSize:13, color:T.subtext, lineHeight:1.7 }}>Выбери вуз мечты — узнай нужный балл и сколько осталось до цели. База 130+ вузов по всей России.</div>
        </div>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:16, marginBottom:14 }}>
          <div style={{ fontSize:13, color:T.subtext, marginBottom:10 }}>📊 Как это работает:</div>
          {[
            { n:"1", t:"Выбери вуз и направление", d:"Поиск по городу, категории или названию" },
            { n:"2", t:"Узнай нужный балл", d:"Данные по итогам приёмной кампании 2025" },
            { n:"3", t:"Сравни с твоим прогнозом", d:"На основе решённых задач в тренажёре" },
            { n:"4", t:"Занимайся целенаправленно", d:"Каждая задача приближает к цели" },
          ].map(s=>(
            <div key={s.n} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#4f7ef7,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", fontWeight:"bold", flexShrink:0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:"bold", color:T.text }}>{s.t}</div>
                <div style={{ fontSize:12, color:T.subtext }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:12, marginBottom:14, fontSize:12, color:T.subtext, lineHeight:1.6 }}>
          ⚠️ Баллы — ориентир по итогам 2025 года. Актуальные проходные баллы вузы публикуют в августе. Уточняй на официальном сайте вуза.
        </div>

        <button onClick={()=>setStep("select")} style={{ width:"100%", padding:15, background:"linear-gradient(135deg,#4f7ef7,#3b6be0)", border:"none", borderRadius:14, color:"#fff", fontSize:15, cursor:"pointer", fontWeight:"bold", fontFamily:"inherit" }}>
          Выбрать вуз мечты →
        </button>
      </div>
    );
  }

  if (step === "select") {
    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <button onClick={()=>setStep("intro")} style={{ background:"none", border:"none", color:"#4f7ef7", fontSize:14, cursor:"pointer", marginBottom:12, padding:0 }}>← Назад</button>
        <div style={{ fontSize:16, fontWeight:"bold", color:T.text, marginBottom:12 }}>Выбери вуз</div>

        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Поиск по названию, факультету, городу..."
          style={{ width:"100%", padding:"11px 13px", background:T.input, border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", marginBottom:10 }} />

        {/* Категории */}
        <div style={{ display:"flex", gap:6, marginBottom:10, overflowX:"auto", scrollbarWidth:"none", paddingBottom:2 }}>
          {Object.entries(CATEGORIES).map(([k,v])=>(
            <button key={k} onClick={()=>setSelectedCategory(k)} style={{ padding:"5px 11px", borderRadius:18, border:`1px solid ${selectedCategory===k?"#4f7ef7":T.border}`, background:selectedCategory===k?"rgba(79,126,247,0.15)":"transparent", color:selectedCategory===k?"#4f7ef7":T.subtext, fontSize:11, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>{v}</button>
          ))}
        </div>

        {/* Города */}
        <div style={{ display:"flex", gap:6, marginBottom:12, overflowX:"auto", scrollbarWidth:"none", paddingBottom:2 }}>
          {["Все города", ...CITIES].map(c=>(
            <button key={c} onClick={()=>setSelectedCity(c)} style={{ padding:"5px 11px", borderRadius:18, border:`1px solid ${selectedCity===c?"#10b981":T.border}`, background:selectedCity===c?"rgba(16,185,129,0.15)":"transparent", color:selectedCity===c?"#10b981":T.subtext, fontSize:11, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>{c}</button>
          ))}
        </div>

        <div style={{ fontSize:12, color:T.subtext, marginBottom:10 }}>Найдено: {filtered.length} программ</div>

        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
          {displayed.map(u=>{
            const diff = u.score - myScore;
            const canApply = diff <= 0;
            const close = diff > 0 && diff <= 30;
            return (
              <button key={u.id} onClick={()=>{setSelectedUni(u);setStep("result");}} style={{ background:T.card, border:`1px solid ${canApply?"#4ade80":close?"#f59e0b":T.border}`, borderRadius:12, padding:"12px 13px", textAlign:"left", cursor:"pointer", color:T.text, fontFamily:"inherit", transition:"all 0.2s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:"bold", marginBottom:1 }}>{u.name}</div>
                    <div style={{ fontSize:12, color:T.subtext, marginBottom:3 }}>{u.faculty}</div>
                    <div style={{ fontSize:11, color:T.subtext }}>{u.city} · {u.subjects.slice(0,2).join(", ")}</div>
                  </div>
                  <div style={{ textAlign:"right", marginLeft:8, flexShrink:0 }}>
                    <div style={{ fontSize:16, fontWeight:"bold", color:TIERS[u.tier]?.color }}>{u.score}</div>
                    <div style={{ fontSize:10, color:T.subtext }}>баллов</div>
                    {canApply && <div style={{ fontSize:10, color:"#4ade80" }}>✓ достижимо</div>}
                    {close && <div style={{ fontSize:10, color:"#f59e0b" }}>близко!</div>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {!showAll && filtered.length > 25 && (
          <button onClick={()=>setShowAll(true)} style={{ width:"100%", marginTop:12, padding:12, background:"transparent", border:`1px solid ${T.border}`, borderRadius:12, color:T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>
            Показать все {filtered.length} результатов
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
    const daysNeeded = Math.max(0, Math.round(diff / 2));

    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <button onClick={()=>setStep("select")} style={{ background:"none", border:"none", color:"#4f7ef7", fontSize:14, cursor:"pointer", marginBottom:12, padding:0 }}>← Другой вуз</button>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:18, padding:18, marginBottom:14 }}>
          <div style={{ fontSize:17, fontWeight:"bold", color:T.text, marginBottom:2 }}>{u.name}</div>
          <div style={{ fontSize:13, color:T.subtext, marginBottom:14 }}>{u.faculty} · {u.city}</div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
            <div style={{ background:T.input, border:`1px solid ${T.border}`, borderRadius:12, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:"bold", color:"#f59e0b" }}>{u.score}</div>
              <div style={{ fontSize:11, color:T.subtext }}>Нужно баллов</div>
            </div>
            <div style={{ background:T.input, border:`1px solid ${T.border}`, borderRadius:12, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:"bold", color:canApply?"#4ade80":"#4f7ef7" }}>{allSolved > 0 ? myScore : "—"}</div>
              <div style={{ fontSize:11, color:T.subtext }}>{allSolved > 0 ? "Твой прогноз" : "Реши задачи"}</div>
            </div>
          </div>

          {allSolved > 0 && (
            <div style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <span style={{ fontSize:12, color:T.subtext }}>Прогресс к цели</span>
                <span style={{ fontSize:12, fontWeight:"bold", color:canApply?"#4ade80":"#4f7ef7" }}>{percent}%</span>
              </div>
              <div style={{ background:T.border, borderRadius:8, height:12, overflow:"hidden" }}>
                <div style={{ width:`${percent}%`, height:"100%", background:canApply?"linear-gradient(90deg,#4ade80,#16a34a)":"linear-gradient(90deg,#4f7ef7,#a855f7)", borderRadius:8, transition:"width 1s ease" }} />
              </div>
            </div>
          )}

          {canApply ? (
            <div style={{ background:"rgba(74,222,128,0.1)", border:"1px solid #4ade80", borderRadius:12, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:18, marginBottom:3 }}>🎉</div>
              <div style={{ fontSize:14, fontWeight:"bold", color:"#4ade80" }}>Твоего уровня достаточно!</div>
              <div style={{ fontSize:12, color:T.subtext, marginTop:3 }}>Продолжай заниматься чтобы увеличить шансы</div>
            </div>
          ) : allSolved > 0 ? (
            <div style={{ background:"rgba(79,126,247,0.08)", border:"1px solid rgba(79,126,247,0.3)", borderRadius:12, padding:12 }}>
              <div style={{ fontSize:14, fontWeight:"bold", color:"#4f7ef7", marginBottom:6 }}>Не хватает: {diff} баллов</div>
              <div style={{ fontSize:12, color:T.subtext, lineHeight:1.6 }}>
                При активной подготовке 30 мин/день — примерно {daysNeeded} дней до цели.
              </div>
            </div>
          ) : (
            <div style={{ background:"rgba(79,126,247,0.08)", border:"1px solid rgba(79,126,247,0.3)", borderRadius:12, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:13, color:"#4f7ef7" }}>Реши задачи в тренажёре чтобы увидеть прогноз 📊</div>
            </div>
          )}
        </div>

        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:14, marginBottom:12 }}>
          <div style={{ fontSize:13, fontWeight:"bold", color:T.text, marginBottom:8 }}>📋 Предметы ЕГЭ</div>
          {u.subjects.map(s=>(
            <div key={s} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:"#4f7ef7", flexShrink:0 }} />
              <span style={{ fontSize:13, color:T.text }}>{s}</span>
            </div>
          ))}
          {u.note && <div style={{ marginTop:10, fontSize:12, color:"#f59e0b", background:"rgba(245,158,11,0.08)", padding:10, borderRadius:8 }}>⚠️ {u.note}</div>}
        </div>

        <div style={{ background:"rgba(248,113,113,0.05)", border:"1px solid rgba(248,113,113,0.15)", borderRadius:12, padding:10, marginBottom:14, fontSize:12, color:T.subtext, lineHeight:1.6 }}>
          📌 Данные по итогам 2025 года. Актуальные баллы — на официальном сайте вуза в августе.
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>setStep("select")} style={{ flex:1, padding:12, background:"transparent", border:`1px solid ${T.border}`, borderRadius:12, color:T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>← Другой вуз</button>
          <button onClick={()=>window.open(u.url,"_blank")} style={{ flex:1, padding:12, background:"linear-gradient(135deg,#4f7ef7,#3b6be0)", border:"none", borderRadius:12, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>Сайт вуза →</button>
        </div>
      </div>
    );
  }

  return null;
}
