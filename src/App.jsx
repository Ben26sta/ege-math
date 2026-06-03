import { useState, useEffect, useRef } from "react";

// ===================== ДАННЫЕ ЕГЭ ПРОФИЛЬНЫЙ УРОВЕНЬ =====================
const EGE_TASKS = {
  1: {
    title: "Задание 1", topic: "Практическая математика",
    description: "Задачи на вычисление, проценты, пропорции",
    questions: [
      { id: "1_1", text: "В магазине телевизор стоил 45 000 руб. После скидки 20% его цена снизилась. Сколько рублей стоит телевизор после скидки?", answer: "36000", hint: "45000 × 0.8 = 36000", solution: "Скидка 20% означает, что платим 80% от цены: 45000 × 0.8 = 36000 руб." },
      { id: "1_2", text: "Из города A в город B автобус едет 3 часа со скоростью 80 км/ч. Сколько километров от A до B?", answer: "240", hint: "S = v × t", solution: "S = 80 × 3 = 240 км" },
      { id: "1_3", text: "В классе 30 учеников. 40% из них сдают профильную математику. Сколько учеников сдают профиль?", answer: "12", hint: "30 × 0.4 = ?", solution: "30 × 0.4 = 12 учеников" },
    ]
  },
  2: {
    title: "Задание 2", topic: "Функции и графики",
    description: "Чтение графиков, область определения, значения функций",
    questions: [
      { id: "2_1", text: "Найдите область определения функции f(x) = √(x − 3). Запишите в виде числа: наименьшее значение x (включительно).", answer: "3", hint: "Подкоренное выражение ≥ 0", solution: "x − 3 ≥ 0, значит x ≥ 3. Наименьшее значение: 3" },
      { id: "2_2", text: "При каком значении x функция f(x) = x² − 4x + 3 принимает наименьшее значение?", answer: "2", hint: "Вершина параболы: x = −b/(2a)", solution: "x = 4/(2×1) = 2. Это вершина параболы — минимум." },
      { id: "2_3", text: "Найдите значение функции f(x) = 2x³ − 3 при x = 2.", answer: "13", hint: "Подставьте x = 2", solution: "f(2) = 2×8 − 3 = 16 − 3 = 13" },
    ]
  },
  3: {
    title: "Задание 3", topic: "Уравнения",
    description: "Линейные, квадратные, дробные уравнения",
    questions: [
      { id: "3_1", text: "Решите уравнение: 2x² − 8x = 0. Найдите наибольший корень.", answer: "4", hint: "Вынесите x за скобки", solution: "2x(x − 4) = 0. Корни: x = 0 и x = 4. Наибольший: 4" },
      { id: "3_2", text: "Решите уравнение: x² − 5x + 6 = 0. Найдите сумму корней.", answer: "5", hint: "По теореме Виета сумма корней = −b/a", solution: "По теореме Виета: x₁ + x₂ = 5/1 = 5" },
      { id: "3_3", text: "Решите уравнение: 3x − 7 = 2x + 1. Чему равен x?", answer: "8", hint: "Перенесите x влево, числа вправо", solution: "3x − 2x = 1 + 7, x = 8" },
    ]
  },
  4: {
    title: "Задание 4", topic: "Неравенства",
    description: "Квадратные и дробно-рациональные неравенства",
    questions: [
      { id: "4_1", text: "Найдите наибольшее целое решение неравенства: 3x − 2 < 7.", answer: "2", hint: "3x < 9, x < 3", solution: "3x < 9, x < 3. Наибольшее целое: 2" },
      { id: "4_2", text: "Найдите количество целых чисел, удовлетворяющих неравенству: x² − 9 ≤ 0.", answer: "7", hint: "−3 ≤ x ≤ 3", solution: "x² ≤ 9, −3 ≤ x ≤ 3. Целые: −3,−2,−1,0,1,2,3 — это 7 чисел" },
      { id: "4_3", text: "Найдите наименьшее целое решение неравенства: 2x + 5 > 1.", answer: "-1", hint: "2x > −4, x > −2", solution: "2x > −4, x > −2. Наименьшее целое больше −2: это −1" },
    ]
  },
  5: {
    title: "Задание 5", topic: "Геометрия (планиметрия)",
    description: "Треугольники, окружности, углы, площади",
    questions: [
      { id: "5_1", text: "В прямоугольном треугольнике катеты равны 3 и 4. Найдите гипотенузу.", answer: "5", hint: "Теорема Пифагора: c² = a² + b²", solution: "c² = 9 + 16 = 25, c = 5" },
      { id: "5_2", text: "Периметр квадрата равен 36 см. Найдите его площадь (в см²).", answer: "81", hint: "Сторона = 36/4, S = сторона²", solution: "Сторона = 9 см, S = 9² = 81 см²" },
      { id: "5_3", text: "Два угла треугольника равны 45° и 75°. Найдите третий угол (в градусах).", answer: "60", hint: "Сумма углов треугольника = 180°", solution: "180 − 45 − 75 = 60°" },
    ]
  },
  6: {
    title: "Задание 6", topic: "Вероятность и статистика",
    description: "Классическая вероятность, таблицы частот",
    questions: [
      { id: "6_1", text: "В урне 4 красных и 6 синих шара. Наугад достают один шар. Какова вероятность достать красный? Запишите десятичную дробь.", answer: "0.4", hint: "P = 4/10", solution: "P = 4/(4+6) = 4/10 = 0.4" },
      { id: "6_2", text: "Бросают кубик. Какова вероятность выпадения чётного числа?", answer: "0.5", hint: "Чётные: 2, 4, 6 — три из шести", solution: "P = 3/6 = 0.5" },
      { id: "6_3", text: "В группе 20 студентов, из них 5 отличников. Случайно выбирают одного. Найдите вероятность того, что выбранный — отличник.", answer: "0.25", hint: "P = 5/20", solution: "P = 5/20 = 0.25" },
    ]
  },
  7: {
    title: "Задание 7", topic: "Производная",
    description: "Нахождение производной, исследование функции",
    questions: [
      { id: "7_1", text: "Найдите производную функции f(x) = x³ − 3x² + 2. Чему равна f'(1)?", answer: "-3", hint: "f'(x) = 3x² − 6x, подставьте x=1", solution: "f'(x) = 3x² − 6x. f'(1) = 3 − 6 = −3" },
      { id: "7_2", text: "Найдите производную f(x) = 5x² − 4x + 1. Чему равна f'(2)?", answer: "16", hint: "f'(x) = 10x − 4", solution: "f'(x) = 10x − 4. f'(2) = 20 − 4 = 16" },
      { id: "7_3", text: "При каком x функция f(x) = x² − 6x + 5 имеет минимум? (Приравняйте производную к нулю)", answer: "3", hint: "f'(x) = 2x − 6 = 0", solution: "f'(x) = 2x − 6 = 0, x = 3" },
    ]
  },
  8: {
    title: "Задание 8", topic: "Тригонометрия",
    description: "Тригонометрические уравнения и формулы",
    questions: [
      { id: "8_1", text: "Найдите значение sin(30°).", answer: "0.5", hint: "Таблица значений", solution: "sin(30°) = 1/2 = 0.5 — стандартное значение" },
      { id: "8_2", text: "Чему равно cos(0°)?", answer: "1", hint: "Таблица значений", solution: "cos(0°) = 1 — стандартное значение" },
      { id: "8_3", text: "Найдите значение tg(45°).", answer: "1", hint: "tg = sin/cos", solution: "tg(45°) = sin(45°)/cos(45°) = 1" },
    ]
  },
  9: {
    title: "Задание 9", topic: "Логарифмы и степени",
    description: "Логарифмические уравнения, свойства логарифмов",
    questions: [
      { id: "9_1", text: "Вычислите: log₂(8).", answer: "3", hint: "2ˣ = 8", solution: "log₂(8) = log₂(2³) = 3" },
      { id: "9_2", text: "Вычислите: log₁₀(1000).", answer: "3", hint: "10ˣ = 1000", solution: "log₁₀(1000) = log₁₀(10³) = 3" },
      { id: "9_3", text: "Вычислите: log₃(81).", answer: "4", hint: "3ˣ = 81", solution: "81 = 3⁴, поэтому log₃(81) = 4" },
    ]
  },
};

const MOCK_EXAM_QUESTIONS = [
  { num: 1, text: "Турист прошёл 15 км, что составляет 60% запланированного пути. Сколько километров он планировал пройти?", answer: "25", solution: "15 = 0.6 × x, x = 15/0.6 = 25 км" },
  { num: 2, text: "Найдите наименьшее значение x в области определения f(x) = √(2x − 6).", answer: "3", solution: "2x − 6 ≥ 0, x ≥ 3" },
  { num: 3, text: "Решите уравнение x² − 7x + 12 = 0. Найдите наибольший корень.", answer: "4", solution: "D = 49−48=1, x = (7±1)/2. Корни: 4 и 3. Наибольший: 4" },
  { num: 4, text: "Найдите наибольшее целое решение: 5x − 3 < 12.", answer: "2", solution: "5x < 15, x < 3. Наибольшее целое: 2" },
  { num: 5, text: "В прямоугольнике стороны 5 и 12. Найдите диагональ.", answer: "13", solution: "d = √(25+144) = √169 = 13" },
  { num: 6, text: "В ящике 3 белых и 7 чёрных шаров. Вероятность вытащить белый?", answer: "0.3", solution: "P = 3/10 = 0.3" },
  { num: 7, text: "Найдите f'(3), если f(x) = 2x² − x + 1.", answer: "11", solution: "f'(x) = 4x − 1. f'(3) = 12 − 1 = 11" },
  { num: 8, text: "Найдите значение cos(60°).", answer: "0.5", solution: "cos(60°) = 1/2 = 0.5" },
  { num: 9, text: "Вычислите log₅(125).", answer: "3", solution: "125 = 5³, log₅(125) = 3" },
];

const SYSTEM_PROMPT = `Ты — опытный репетитор по математике ЕГЭ профильного уровня для российских школьников.
Отвечай ТОЛЬКО на вопросы по математике ЕГЭ. Объясняй чётко и структурированно.
Всегда указывай к какому заданию ЕГЭ относится тема. Давай лайфхаки для быстрого решения.
Используй российскую нотацию и терминологию. Отвечай на русском языке.`;

// ===================== КОМПОНЕНТЫ =====================

function ProgressBar({ value, max, color = "#4f7ef7" }) {
  return (
    <div style={{ background: "#1e2540", borderRadius: 6, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: "100%", background: color, borderRadius: 6, transition: "width 0.5s ease" }} />
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 14, padding: "16px", textAlign: "center" }}>
      <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: "bold", color }}>{value}</div>
      <div style={{ fontSize: 11, color: "#6b7db3", marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ===================== ЭКРАНЫ =====================

function HomeScreen({ progress, onNavigate }) {
  const totalSolved = Object.values(progress.solved).reduce((a, b) => a + b, 0);
  const totalCorrect = Object.values(progress.correct).reduce((a, b) => a + b, 0);
  const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
  const weakTopics = Object.entries(progress.solved)
    .filter(([k, v]) => v > 0)
    .map(([k]) => ({ num: k, acc: progress.solved[k] > 0 ? Math.round((progress.correct[k] || 0) / progress.solved[k] * 100) : 0 }))
    .filter(t => t.acc < 60)
    .slice(0, 3);

  return (
    <div style={{ padding: "20px 16px", overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 4 }}>Привет! 👋</div>
        <div style={{ color: "#6b7db3", fontSize: 14 }}>Готовимся к ЕГЭ по математике (профиль)</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        <StatCard label="Решено задач" value={totalSolved} icon="✏️" color="#4f7ef7" />
        <StatCard label="Верных ответов" value={totalCorrect} icon="✅" color="#4ade80" />
        <StatCard label="Точность %" value={`${accuracy}%`} icon="🎯" color="#f59e0b" />
      </div>

      {weakTopics.length > 0 && (
        <div style={{ background: "#1a1020", border: "1px solid #3a2040", borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: "#f87171", fontWeight: "bold", marginBottom: 10 }}>⚠️ Слабые темы — нужна практика:</div>
          {weakTopics.map(t => (
            <div key={t.num} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#e8eaf0" }}>{EGE_TASKS[t.num]?.title} — {EGE_TASKS[t.num]?.topic}</span>
              <span style={{ fontSize: 12, color: "#f87171", background: "rgba(248,113,113,0.1)", padding: "2px 8px", borderRadius: 10 }}>{t.acc}%</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontSize: 13, color: "#6b7db3", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Разделы ЕГЭ</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.entries(EGE_TASKS).map(([num, task]) => {
          const solved = progress.solved[num] || 0;
          const correct = progress.correct[num] || 0;
          const acc = solved > 0 ? Math.round(correct / solved * 100) : null;
          return (
            <button key={num} onClick={() => onNavigate("trainer", num)} style={{
              background: "#151c30", border: "1px solid #2a3050", borderRadius: 14,
              padding: "14px 16px", textAlign: "left", cursor: "pointer", color: "#e8eaf0",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#4f7ef7"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#2a3050"}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: "bold", marginBottom: 3 }}>{task.title} — {task.topic}</div>
                <div style={{ fontSize: 12, color: "#6b7db3" }}>{task.description}</div>
                {solved > 0 && <div style={{ marginTop: 6 }}><ProgressBar value={correct} max={solved} color={acc >= 70 ? "#4ade80" : acc >= 40 ? "#f59e0b" : "#f87171"} /></div>}
              </div>
              <div style={{ textAlign: "right", marginLeft: 12, flexShrink: 0 }}>
                {acc !== null ? (
                  <span style={{ fontSize: 13, color: acc >= 70 ? "#4ade80" : acc >= 40 ? "#f59e0b" : "#f87171", fontWeight: "bold" }}>{acc}%</span>
                ) : (
                  <span style={{ fontSize: 20, color: "#2a3050" }}>→</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrainerScreen({ taskNum, progress, onProgress, onBack }) {
  const task = EGE_TASKS[taskNum];
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [aiExplain, setAiExplain] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const q = task.questions[qIndex];

  function checkAnswer() {
    const clean = answer.trim().replace(",", ".");
    const isCorrect = clean === q.answer;
    setResult(isCorrect ? "correct" : "wrong");
    onProgress(taskNum, isCorrect);
  }

  async function askAI() {
    setAiLoading(true);
    setAiExplain("");
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `Задание ЕГЭ №${taskNum} (${task.topic}):\n"${q.text}"\nПравильный ответ: ${q.answer}\nОбъясни подробно как решить это задание, дай лайфхак для запоминания метода.` }],
        }),
      });
      const data = await resp.json();
      setAiExplain(data.content?.map(b => b.text || "").join("") || "Ошибка");
    } catch { setAiExplain("Ошибка соединения"); }
    setAiLoading(false);
  }

  function next() {
    if (qIndex < task.questions.length - 1) {
      setQIndex(qIndex + 1);
      setAnswer(""); setResult(null); setShowSolution(false); setAiExplain("");
    } else {
      onBack();
    }
  }

  return (
    <div style={{ padding: "16px", overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#4f7ef7", fontSize: 14, cursor: "pointer", marginBottom: 16, padding: 0 }}>← Назад</button>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 4 }}>{task.title} — {task.topic}</div>
        <div style={{ fontSize: 12, color: "#6b7db3" }}>Вопрос {qIndex + 1} из {task.questions.length}</div>
        <div style={{ marginTop: 8 }}><ProgressBar value={qIndex} max={task.questions.length} /></div>
      </div>

      <div style={{ background: "#151c30", border: "1px solid #2a3050", borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 15, lineHeight: 1.7, color: "#e8eaf0" }}>{q.text}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !result && checkAnswer()}
          placeholder="Введите ответ..."
          disabled={!!result}
          style={{
            width: "100%", padding: "14px 16px", background: "#151c30",
            border: `1px solid ${result === "correct" ? "#4ade80" : result === "wrong" ? "#f87171" : "#2a3050"}`,
            borderRadius: 12, color: "#e8eaf0", fontSize: 16, outline: "none",
            boxSizing: "border-box", fontFamily: "inherit",
          }}
        />
      </div>

      {!result ? (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={checkAnswer} disabled={!answer.trim()} style={{
            flex: 1, padding: "14px", background: answer.trim() ? "linear-gradient(135deg, #4f7ef7, #3b6be0)" : "#1e2540",
            border: "none", borderRadius: 12, color: "#fff", fontSize: 15, cursor: answer.trim() ? "pointer" : "not-allowed", fontFamily: "inherit",
          }}>Проверить</button>
          <button onClick={() => { setShowSolution(true); setResult("skip"); }} style={{
            padding: "14px 16px", background: "transparent", border: "1px solid #2a3050",
            borderRadius: 12, color: "#6b7db3", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          }}>Подсказка</button>
        </div>
      ) : (
        <div>
          <div style={{
            padding: 16, borderRadius: 12, marginBottom: 12,
            background: result === "correct" ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
            border: `1px solid ${result === "correct" ? "#4ade80" : "#f87171"}`,
          }}>
            <div style={{ fontSize: 15, fontWeight: "bold", color: result === "correct" ? "#4ade80" : "#f87171", marginBottom: 6 }}>
              {result === "correct" ? "✅ Верно!" : `❌ Неверно. Ответ: ${q.answer}`}
            </div>
            {(showSolution || result !== "correct") && (
              <div style={{ fontSize: 13, color: "#b0bdd4", lineHeight: 1.6 }}>{q.solution}</div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={next} style={{
              flex: 1, padding: "14px", background: "linear-gradient(135deg, #4f7ef7, #3b6be0)",
              border: "none", borderRadius: 12, color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "inherit",
            }}>{qIndex < task.questions.length - 1 ? "Следующий →" : "Завершить ✓"}</button>
            <button onClick={askAI} disabled={aiLoading} style={{
              padding: "14px 14px", background: "rgba(168,85,247,0.1)", border: "1px solid #a855f7",
              borderRadius: 12, color: "#a855f7", fontSize: 13, cursor: "pointer", fontFamily: "inherit",
            }}>{aiLoading ? "..." : "🤖 ИИ"}</button>
          </div>

          {aiExplain && (
            <div style={{ marginTop: 12, background: "rgba(168,85,247,0.08)", border: "1px solid #4a2060", borderRadius: 12, padding: 16, fontSize: 13, color: "#c9b3e8", lineHeight: 1.7 }}>
              {aiExplain.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MockExamScreen({ onBack, onFinish }) {
  const DURATION = 45 * 60;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [results, setResults] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  function handleSubmit(auto = false) {
    clearInterval(timerRef.current);
    let correct = 0;
    const res = MOCK_EXAM_QUESTIONS.map(q => {
      const userAns = (answers[q.num] || "").trim().replace(",", ".");
      const isCorrect = userAns === q.answer;
      if (isCorrect) correct++;
      return { ...q, userAns, isCorrect };
    });
    setResults(res);
    setSubmitted(true);
    const score = Math.round(27 + (correct / MOCK_EXAM_QUESTIONS.length) * 73);
    onFinish(correct, score);
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeColor = timeLeft < 300 ? "#f87171" : timeLeft < 600 ? "#f59e0b" : "#4ade80";

  if (submitted && results) {
    const correct = results.filter(r => r.isCorrect).length;
    const score = Math.round(27 + (correct / results.length) * 73);
    return (
      <div style={{ padding: 16, overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{correct >= 7 ? "🎉" : correct >= 5 ? "👍" : "📚"}</div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>Результат: {score} баллов</div>
          <div style={{ color: "#6b7db3", marginTop: 4 }}>{correct} из {results.length} правильных ответов</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {results.map(r => (
            <div key={r.num} style={{
              background: "#151c30", border: `1px solid ${r.isCorrect ? "#4ade80" : "#f87171"}`,
              borderRadius: 12, padding: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: "bold", color: "#fff" }}>Задание {r.num}</span>
                <span style={{ fontSize: 13, color: r.isCorrect ? "#4ade80" : "#f87171" }}>{r.isCorrect ? "✅" : `❌ → ${r.answer}`}</span>
              </div>
              {!r.isCorrect && <div style={{ fontSize: 12, color: "#8899bb", lineHeight: 1.5 }}>{r.solution}</div>}
            </div>
          ))}
        </div>
        <button onClick={onBack} style={{
          width: "100%", padding: 14, background: "linear-gradient(135deg, #4f7ef7, #3b6be0)",
          border: "none", borderRadius: 12, color: "#fff", fontSize: 15, cursor: "pointer", fontFamily: "inherit",
        }}>Вернуться к тренировке</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, overflowY: "auto", maxHeight: "calc(100vh - 130px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>Пробный экзамен</div>
          <div style={{ fontSize: 12, color: "#6b7db3" }}>9 заданий части 1</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: "bold", color: timeColor, fontVariantNumeric: "tabular-nums" }}>
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <ProgressBar value={Object.keys(answers).length} max={MOCK_EXAM_QUESTIONS.length} color="#f59e0b" />
        <div style={{ fontSize: 11, color: "#6b7db3", marginTop: 4 }}>Отвечено: {Object.keys(answers).length}/{MOCK_EXAM_QUESTIONS.length}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        {MOCK_EXAM_QUESTIONS.map(q => (
          <div key={q.num} style={{ background: "#151c30", border: `1px solid ${answers[q.num] ? "#4f7ef7" : "#2a3050"}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 13, color: "#6b7db3", marginBottom: 8 }}>Задание {q.num}</div>
            <div style={{ fontSize: 14, color: "#e8eaf0", lineHeight: 1.6, marginBottom: 12 }}>{q.text}</div>
            <input
              value={answers[q.num] || ""}
              onChange={e => setAnswers({ ...answers, [q.num]: e.target.value })}
              placeholder="Ответ..."
              style={{
                width: "100%", padding: "10px 14px", background: "#0d1220",
                border: "1px solid #2a3050", borderRadius: 10, color: "#e8eaf0",
                fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
              }}
            />
          </div>
        ))}
      </div>

      <button onClick={() => handleSubmit()} style={{
        width: "100%", padding: 16, background: "linear-gradient(135deg, #4ade80, #16a34a)",
        border: "none", borderRadius: 12, color: "#fff", fontSize: 16, cursor: "pointer",
        fontWeight: "bold", fontFamily: "inherit",
      }}>Завершить и проверить ✓</button>
    </div>
  );
}

function ChatScreen() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Привет! Задавай любые вопросы по математике ЕГЭ профильного уровня — объясню понятно 📐" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    const newMsgs = [...messages, { role: "user", content: userText }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM_PROMPT, messages: newMsgs }),
      });
      const data = await resp.json();
      setMessages([...newMsgs, { role: "assistant", content: data.content?.map(b => b.text || "").join("") || "Ошибка" }]);
    } catch { setMessages([...newMsgs, { role: "assistant", content: "Ошибка соединения." }]); }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 130px)" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "12px 16px",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "linear-gradient(135deg, #4f7ef7, #3b6be0)" : "#151c30",
              border: m.role === "assistant" ? "1px solid #2a3050" : "none",
              fontSize: 14, lineHeight: 1.6, color: "#e8eaf0",
            }}>
              {m.content.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 6, padding: "12px 16px", background: "#151c30", border: "1px solid #2a3050", borderRadius: "18px 18px 18px 4px", width: "fit-content" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#4f7ef7", animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid #1e2540", display: "flex", gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Вопрос по математике ЕГЭ..."
          style={{ flex: 1, padding: "12px 16px", background: "#151c30", border: "1px solid #2a3050", borderRadius: 12, color: "#e8eaf0", fontSize: 14, outline: "none", fontFamily: "inherit" }}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={{
          width: 44, height: 44, borderRadius: 12, border: "none",
          background: input.trim() && !loading ? "linear-gradient(135deg, #4f7ef7, #3b6be0)" : "#1e2540",
          color: "#fff", fontSize: 18, cursor: input.trim() && !loading ? "pointer" : "not-allowed",
        }}>→</button>
      </div>
    </div>
  );
}

// ===================== ГЛАВНОЕ ПРИЛОЖЕНИЕ =====================
export default function App() {
  const [tab, setTab] = useState("home");
  const [screen, setScreen] = useState(null);
  const [taskNum, setTaskNum] = useState(null);
  const [progress, setProgress] = useState({ solved: {}, correct: {} });
  const [examStats, setExamStats] = useState(null);

  function handleProgress(num, isCorrect) {
    setProgress(p => ({
      solved: { ...p.solved, [num]: (p.solved[num] || 0) + 1 },
      correct: { ...p.correct, [num]: (p.correct[num] || 0) + (isCorrect ? 1 : 0) },
    }));
  }

  function navigate(screen, num = null) {
    setScreen(screen);
    setTaskNum(num);
  }

  function renderContent() {
    if (screen === "trainer" && taskNum) return <TrainerScreen taskNum={taskNum} progress={progress} onProgress={handleProgress} onBack={() => setScreen(null)} />;
    if (screen === "exam") return <MockExamScreen onBack={() => setScreen(null)} onFinish={(c, s) => { setExamStats({ correct: c, score: s }); }} />;
    if (tab === "home") return <HomeScreen progress={progress} onNavigate={navigate} />;
    if (tab === "exam") return (
      <div style={{ padding: 16 }}>
        {examStats && (
          <div style={{ background: "rgba(79,126,247,0.1)", border: "1px solid #4f7ef7", borderRadius: 14, padding: 16, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "#6b7db3", marginBottom: 4 }}>Последний результат</div>
            <div style={{ fontSize: 28, fontWeight: "bold", color: "#4f7ef7" }}>{examStats.score} баллов</div>
            <div style={{ fontSize: 13, color: "#8899bb" }}>Верных: {examStats.correct}/9</div>
          </div>
        )}
        <div style={{ fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 8 }}>Пробный экзамен</div>
        <div style={{ fontSize: 14, color: "#6b7db3", marginBottom: 20, lineHeight: 1.6 }}>9 заданий части 1 ЕГЭ. Таймер 45 минут. После завершения — разбор всех ошибок.</div>
        <button onClick={() => navigate("exam")} style={{
          width: "100%", padding: 16, background: "linear-gradient(135deg, #f59e0b, #d97706)",
          border: "none", borderRadius: 14, color: "#fff", fontSize: 16, cursor: "pointer",
          fontWeight: "bold", fontFamily: "inherit",
        }}>Начать экзамен ⏱</button>
      </div>
    );
    if (tab === "chat") return <ChatScreen />;
    return null;
  }

  const tabs = [
    { id: "home", icon: "📊", label: "Прогресс" },
    { id: "exam", icon: "📝", label: "Экзамен" },
    { id: "chat", icon: "🤖", label: "Репетитор" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#e8eaf0", fontFamily: "'Georgia', serif", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <div style={{ background: "linear-gradient(135deg, #1a1f35, #0d1220)", borderBottom: "1px solid #2a3050", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        {(screen) && <button onClick={() => setScreen(null)} style={{ background: "none", border: "none", color: "#4f7ef7", fontSize: 18, cursor: "pointer", padding: 0 }}>←</button>}
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #4f7ef7, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>∑</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>МатЕГЭ</div>
          <div style={{ fontSize: 11, color: "#6b7db3" }}>Профильный уровень 2025</div>
        </div>
      </div>

      <div style={{ paddingBottom: 70 }}>{renderContent()}</div>

      {!screen && (
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#0d1220", borderTop: "1px solid #1e2540", display: "flex" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "12px 0", background: "none", border: "none", cursor: "pointer",
              color: tab === t.id ? "#4f7ef7" : "#4a5570", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            }}>
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span style={{ fontSize: 10, fontFamily: "inherit" }}>{t.label}</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #2a3050; }
      `}</style>
    </div>
  );
}
