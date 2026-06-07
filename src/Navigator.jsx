import { useState } from "react";
import { UNIVERSITIES, CITIES, CATEGORIES, TIERS } from "./universities.js";

const THEMES = {
  dark: { bg:"#0a0e1a", card:"#151c30", border:"#2a3050", text:"#e8eaf0", subtext:"#6b7db3", header:"#0d1220", input:"#0d1220" },
  light: { bg:"#f0f2f8", card:"#ffffff", border:"#d0d8f0", text:"#1a2040", subtext:"#5566aa", header:"#e0e4f4", input:"#f8f9ff" }
};

// Иконки категорий
const CAT_EMOJI = {
  tech:"💻", med:"🏥", law:"⚖️", econ:"📈", hum:"🌍", ped:"🍎"
};

const TIER_LABELS = {
  1: { label:"⭐ Топ-вуз", color:"#f59e0b" },
  2: { label:"🔵 Сильный вуз", color:"#4f7ef7" },
  3: { label:"🟢 Региональный", color:"#10b981" },
};

export default function Navigator({ progress, theme }) {
  const T = THEMES[theme];
  const [step, setStep] = useState("intro");
  const [selectedCity, setSelectedCity] = useState("Все города");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUni, setSelectedUni] = useState(null);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

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
          <div style={{ fontSize:13, color:T.subtext, lineHeight:1.7 }}>130+ вузов по всей России. Выбери направление — узнай нужные баллы, предметы ЕГЭ и всё о специальности.</div>
        </div>

        {/* Категории направлений */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:13, fontWeight:"bold", color:T.text, marginBottom:10 }}>Выбери направление:</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {Object.entries(UNI_INFO).map(([k,v])=>(
              <button key={k} onClick={()=>{setSelectedCategory(k);setStep("select");}} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"12px 14px", cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"all 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#4f7ef7"} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                <div style={{ fontSize:22, marginBottom:5 }}>{v.emoji}</div>
                <div style={{ fontSize:13, fontWeight:"bold", color:T.text }}>{CATEGORIES[k]?.split(" /")[0]}</div>
                <div style={{ fontSize:11, color:T.subtext, marginTop:2 }}>{v.career.split(",")[0]}</div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={()=>{setSelectedCategory("all");setStep("select");}} style={{ width:"100%", padding:13, background:"transparent", border:`1px solid ${T.border}`, borderRadius:14, color:T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>
          Показать все вузы →
        </button>

        <div style={{ marginTop:14, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:12, fontSize:12, color:T.subtext, lineHeight:1.6 }}>
          ⚠️ Баллы — ориентир по итогам 2025 года. Актуальные данные вузы публикуют в августе. Уточняй на официальном сайте.
        </div>
      </div>
    );
  }

  if (step === "select") {
    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <button onClick={()=>setStep("intro")} style={{ background:"none", border:"none", color:"#4f7ef7", fontSize:14, cursor:"pointer", marginBottom:12, padding:0 }}>← Назад</button>
        <div style={{ fontSize:16, fontWeight:"bold", color:T.text, marginBottom:12 }}>Выбери вуз</div>

        <input value={search} onChange={e=>{setSearch(e.target.value);setShowAll(false);}} placeholder="🔍 Поиск по названию, факультету, городу..."
          style={{ width:"100%", padding:"11px 13px", background:T.input, border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", marginBottom:10 }} />

        {/* Категории */}
        <div style={{ display:"flex", gap:6, marginBottom:8, overflowX:"auto", scrollbarWidth:"none", paddingBottom:2 }}>
          {Object.entries(CATEGORIES).map(([k,v])=>(
            <button key={k} onClick={()=>{setSelectedCategory(k);setShowAll(false);}} style={{ padding:"5px 11px", borderRadius:18, border:`1px solid ${selectedCategory===k?"#4f7ef7":T.border}`, background:selectedCategory===k?"rgba(79,126,247,0.15)":"transparent", color:selectedCategory===k?"#4f7ef7":T.subtext, fontSize:11, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>{v.split(" /")[0]}</button>
          ))}
        </div>

        {/* Города */}
        <div style={{ display:"flex", gap:6, marginBottom:12, overflowX:"auto", scrollbarWidth:"none", paddingBottom:2 }}>
          {["Все города",...CITIES].map(c=>(
            <button key={c} onClick={()=>{setSelectedCity(c);setShowAll(false);}} style={{ padding:"5px 11px", borderRadius:18, border:`1px solid ${selectedCity===c?"#10b981":T.border}`, background:selectedCity===c?"rgba(16,185,129,0.15)":"transparent", color:selectedCity===c?"#10b981":T.subtext, fontSize:11, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" }}>{c}</button>
          ))}
        </div>

        <div style={{ fontSize:12, color:T.subtext, marginBottom:10 }}>Найдено: {filtered.length} программ</div>

        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
          {displayed.map(u=>(
            <button key={u.id} onClick={()=>{setSelectedUni(u);setStep("result");}} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"12px 13px", textAlign:"left", cursor:"pointer", color:T.text, fontFamily:"inherit", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#4f7ef7"} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:"bold", marginBottom:1 }}>{u.name}</div>
                  <div style={{ fontSize:12, color:T.subtext, marginBottom:3 }}>{u.faculty}</div>
                  <div style={{ fontSize:11, color:T.subtext }}>{u.city}</div>
                </div>
                <div style={{ textAlign:"right", marginLeft:8, flexShrink:0 }}>
                  <div style={{ fontSize:17, fontWeight:"bold", color:TIER_LABELS[u.tier]?.color }}>{u.score}</div>
                  <div style={{ fontSize:10, color:T.subtext }}>баллов</div>
                  <div style={{ fontSize:10, color:TIER_LABELS[u.tier]?.color, marginTop:1 }}>{TIER_LABELS[u.tier]?.label}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {!showAll && filtered.length > 25 && (
          <button onClick={()=>setShowAll(true)} style={{ width:"100%", marginTop:12, padding:12, background:"transparent", border:`1px solid ${T.border}`, borderRadius:12, color:T.subtext, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>
            Показать все {filtered.length} программ
          </button>
        )}
      </div>
    );
  }

  if (step === "result" && selectedUni) {
    const u = selectedUni;
    

    return (
      <div style={{ padding:16, overflowY:"auto", maxHeight:"calc(100vh - 175px)" }}>
        <button onClick={()=>setStep("select")} style={{ background:"none", border:"none", color:"#4f7ef7", fontSize:14, cursor:"pointer", marginBottom:12, padding:0 }}>← Другой вуз</button>

        {/* Шапка */}
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:18, padding:18, marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:17, fontWeight:"bold", color:T.text, marginBottom:3 }}>{u.name}</div>
              <div style={{ fontSize:13, color:T.subtext }}>{u.faculty}</div>
              <div style={{ fontSize:12, color:T.subtext, marginTop:2 }}>📍 {u.city}</div>
            </div>
            <div style={{ background:`${TIER_LABELS[u.tier]?.color}20`, border:`1px solid ${TIER_LABELS[u.tier]?.color}40`, borderRadius:10, padding:"6px 10px", textAlign:"center", flexShrink:0 }}>
              <div style={{ fontSize:11, color:TIER_LABELS[u.tier]?.color }}>{TIER_LABELS[u.tier]?.label}</div>
            </div>
          </div>

          {/* Нужный балл */}
          <div style={{ background:T.input, border:`1px solid ${T.border}`, borderRadius:12, padding:14, textAlign:"center", marginBottom:12 }}>
            <div style={{ fontSize:13, color:T.subtext, marginBottom:4 }}>Минимальный балл для поступления на бюджет</div>
            <div style={{ fontSize:32, fontWeight:"bold", color:"#f59e0b" }}>{u.score}</div>
            <div style={{ fontSize:12, color:T.subtext }}>по данным 2025 года</div>
          </div>

          {/* Предметы */}
          <div style={{ marginBottom:u.note?12:0 }}>
            <div style={{ fontSize:13, fontWeight:"bold", color:T.text, marginBottom:8 }}>📋 Предметы ЕГЭ:</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {u.subjects.map(s=>(
                <div key={s} style={{ background:"rgba(79,126,247,0.1)", border:"1px solid rgba(79,126,247,0.3)", borderRadius:20, padding:"5px 12px", fontSize:12, color:"#4f7ef7" }}>{s}</div>
              ))}
            </div>
          </div>

          {u.note && (
            <div style={{ marginTop:12, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:10, padding:10, fontSize:12, color:"#f59e0b", lineHeight:1.5 }}>
              ⚠️ {u.note}
            </div>
          )}
        </div>

        {/* Информация о специальности */}
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:16, marginBottom:12 }}>
          <div style={{ fontSize:14, fontWeight:"bold", color:T.text, marginBottom:12 }}>{CAT_EMOJI[u.category]||"📚"} О специальности</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {u.profession && (
              <div style={{ background:T.input, borderRadius:12, padding:12 }}>
                <div style={{ fontSize:11, color:T.subtext, marginBottom:4, textTransform:"uppercase", letterSpacing:1 }}>Кем можно работать</div>
                <div style={{ fontSize:13, color:T.text, lineHeight:1.6 }}>{u.profession}</div>
              </div>
            )}
            {u.salary && (
              <div style={{ background:T.input, borderRadius:12, padding:12 }}>
                <div style={{ fontSize:11, color:T.subtext, marginBottom:4, textTransform:"uppercase", letterSpacing:1 }}>Средняя зарплата</div>
                <div style={{ fontSize:13, color:"#4ade80", fontWeight:"bold" }}>{u.salary}</div>
              </div>
            )}
            {u.duration && (
              <div style={{ background:T.input, borderRadius:12, padding:12 }}>
                <div style={{ fontSize:11, color:T.subtext, marginBottom:4, textTransform:"uppercase", letterSpacing:1 }}>Срок обучения</div>
                <div style={{ fontSize:13, color:T.text }}>{u.duration}</div>
              </div>
            )}
          </div>
        </div>

        {/* Дисклеймер */}
        <div style={{ background:"rgba(248,113,113,0.05)", border:"1px solid rgba(248,113,113,0.15)", borderRadius:12, padding:10, marginBottom:14, fontSize:12, color:T.subtext, lineHeight:1.6 }}>
          📌 Данные по итогам 2025 года. Актуальные проходные баллы вузы публикуют в августе. Уточняй на официальном сайте.
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
