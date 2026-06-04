// База вузов России — проходные баллы по данным 2025 года
// Баллы указаны как ориентир на основе данных приёмных кампаний 2024-2025
// Актуальные баллы уточняй на официальном сайте вуза в августе

export const UNIVERSITIES = [
  // ===== МОСКВА — ТОП =====
  {
    id: "msu_mech", name: "МГУ", faculty: "Мехмат", city: "Москва",
    score: 335, subjects: ["Математика", "Физика", "Русский язык"],
    note: "Обязательный доп. экзамен по математике в МГУ",
    url: "https://mgu.ru", tier: 1
  },
  {
    id: "msu_vmk", name: "МГУ", faculty: "ВМК (Вычислительная математика)", city: "Москва",
    score: 320, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    note: "Обязательный доп. экзамен в МГУ", url: "https://mgu.ru", tier: 1
  },
  {
    id: "msu_econ", name: "МГУ", faculty: "Экономический факультет", city: "Москва",
    score: 310, subjects: ["Математика", "Обществознание", "Русский язык"],
    note: "Обязательный доп. экзамен в МГУ", url: "https://mgu.ru", tier: 1
  },
  {
    id: "mfti_pm", name: "МФТИ", faculty: "Прикладная математика и информатика", city: "Москва",
    score: 305, subjects: ["Математика", "Информатика", "Русский язык"],
    note: "Средний балл поступивших 2025: ~97 по каждому предмету",
    url: "https://mipt.ru", tier: 1
  },
  {
    id: "mfti_phys", name: "МФТИ", faculty: "Физика и исследования", city: "Москва",
    score: 295, subjects: ["Математика", "Физика", "Русский язык"],
    note: "Самый высокий средний балл среди всех вузов России",
    url: "https://mipt.ru", tier: 1
  },
  {
    id: "hse_math", name: "НИУ ВШЭ", faculty: "Математика", city: "Москва",
    score: 290, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    url: "https://hse.ru", tier: 1
  },
  {
    id: "hse_econ", name: "НИУ ВШЭ", faculty: "Экономика", city: "Москва",
    score: 285, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://hse.ru", tier: 1
  },
  {
    id: "hse_cs", name: "НИУ ВШЭ", faculty: "Компьютерные науки", city: "Москва",
    score: 292, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://hse.ru", tier: 1
  },
  {
    id: "hse_law", name: "НИУ ВШЭ", faculty: "Юриспруденция", city: "Москва",
    score: 275, subjects: ["Обществознание", "История", "Русский язык"],
    url: "https://hse.ru", tier: 1
  },
  {
    id: "mgimo_mo", name: "МГИМО", faculty: "Международные отношения", city: "Москва",
    score: 285, subjects: ["Иностранный язык", "История", "Русский язык"],
    note: "Проходной уровень от 403 баллов с учётом ДВИ",
    url: "https://mgimo.ru", tier: 1
  },
  {
    id: "mgimo_econ", name: "МГИМО", faculty: "Международная экономика", city: "Москва",
    score: 270, subjects: ["Математика", "Иностранный язык", "Русский язык"],
    url: "https://mgimo.ru", tier: 1
  },
  {
    id: "misis", name: "НИТУ МИСиС", faculty: "Информатика и вычислительная техника", city: "Москва",
    score: 255, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://misis.ru", tier: 2
  },
  {
    id: "mai", name: "МАИ", faculty: "Прикладная математика", city: "Москва",
    score: 245, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://mai.ru", tier: 2
  },
  {
    id: "mipt_bio", name: "МФТИ", faculty: "Биологическая и медицинская физика", city: "Москва",
    score: 281, subjects: ["Математика", "Физика/Химия", "Русский язык"],
    url: "https://mipt.ru", tier: 1
  },
  {
    id: "rtu_mirea", name: "РТУ МИРЭА", faculty: "Информационные технологии", city: "Москва",
    score: 225, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://mirea.ru", tier: 2
  },
  {
    id: "mgtu", name: "МГТУ им. Баумана", faculty: "Прикладная математика", city: "Москва",
    score: 270, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://bmstu.ru", tier: 1
  },
  {
    id: "mgtu_cs", name: "МГТУ им. Баумана", faculty: "Компьютерные науки", city: "Москва",
    score: 265, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://bmstu.ru", tier: 1
  },
  {
    id: "ranepa", name: "РАНХиГС", faculty: "Государственное управление", city: "Москва",
    score: 255, subjects: ["Обществознание", "История", "Русский язык"],
    url: "https://ranepa.ru", tier: 2
  },
  {
    id: "ranepa_econ", name: "РАНХиГС", faculty: "Экономика", city: "Москва",
    score: 245, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://ranepa.ru", tier: 2
  },
  {
    id: "finuniver", name: "Финансовый университет", faculty: "Финансы и кредит", city: "Москва",
    score: 250, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://fa.ru", tier: 2
  },
  {
    id: "mglu", name: "МГЛУ (Maurice Thorez)", faculty: "Лингвистика", city: "Москва",
    score: 245, subjects: ["Иностранный язык", "Обществознание", "Русский язык"],
    url: "https://linguanet.ru", tier: 2
  },
  {
    id: "rggu", name: "РГГУ", faculty: "История", city: "Москва",
    score: 215, subjects: ["История", "Обществознание", "Русский язык"],
    url: "https://rggu.ru", tier: 3
  },

  // ===== САНКТ-ПЕТЕРБУРГ =====
  {
    id: "spbu_math", name: "СПбГУ", faculty: "Математика", city: "Санкт-Петербург",
    score: 280, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://spbu.ru", tier: 1
  },
  {
    id: "spbu_econ", name: "СПбГУ", faculty: "Экономика", city: "Санкт-Петербург",
    score: 265, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://spbu.ru", tier: 1
  },
  {
    id: "spbu_law", name: "СПбГУ", faculty: "Юриспруденция", city: "Санкт-Петербург",
    score: 270, subjects: ["Обществознание", "История", "Русский язык"],
    url: "https://spbu.ru", tier: 1
  },
  {
    id: "spbpu", name: "СПбПУ (Политех)", faculty: "Прикладная математика и физика", city: "Санкт-Петербург",
    score: 255, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://spbstu.ru", tier: 2
  },
  {
    id: "itmo", name: "Университет ИТМО", faculty: "Информационные технологии", city: "Санкт-Петербург",
    score: 280, subjects: ["Математика", "Информатика", "Русский язык"],
    note: "Один из лучших IT-вузов России", url: "https://itmo.ru", tier: 1
  },
  {
    id: "itmo_ai", name: "Университет ИТМО", faculty: "Искусственный интеллект", city: "Санкт-Петербург",
    score: 285, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://itmo.ru", tier: 1
  },
  {
    id: "hse_spb", name: "НИУ ВШЭ (СПб)", faculty: "Экономика", city: "Санкт-Петербург",
    score: 265, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://spb.hse.ru", tier: 1
  },
  {
    id: "spbgetu", name: "СПбГЭТУ «ЛЭТИ»", faculty: "Информатика и вычислительная техника", city: "Санкт-Петербург",
    score: 240, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    url: "https://etu.ru", tier: 2
  },

  // ===== НОВОСИБИРСК =====
  {
    id: "ngu_math", name: "НГУ", faculty: "Математика", city: "Новосибирск",
    score: 265, subjects: ["Математика", "Физика", "Русский язык"],
    note: "Один из лучших вузов за Уралом", url: "https://nsu.ru", tier: 1
  },
  {
    id: "ngu_it", name: "НГУ", faculty: "Информационные технологии", city: "Новосибирск",
    score: 260, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://nsu.ru", tier: 1
  },
  {
    id: "ngu_econ", name: "НГУ", faculty: "Экономика", city: "Новосибирск",
    score: 245, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://nsu.ru", tier: 1
  },
  {
    id: "nstu", name: "НГТУ", faculty: "Прикладная математика", city: "Новосибирск",
    score: 220, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://nstu.ru", tier: 2
  },

  // ===== ЕКАТЕРИНБУРГ =====
  {
    id: "urfu_math", name: "УрФУ", faculty: "Математика и механика", city: "Екатеринбург",
    score: 225, subjects: ["Математика", "Физика", "Русский язык"],
    note: "Средний балл по вузу ~74.8 за предмет в 2025",
    url: "https://urfu.ru", tier: 2
  },
  {
    id: "urfu_it", name: "УрФУ", faculty: "Информационные технологии", city: "Екатеринбург",
    score: 230, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://urfu.ru", tier: 2
  },
  {
    id: "urfu_econ", name: "УрФУ", faculty: "Экономика", city: "Екатеринбург",
    score: 215, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://urfu.ru", tier: 2
  },
  {
    id: "uspu", name: "УрГПУ", faculty: "Математика и информатика", city: "Екатеринбург",
    score: 175, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    url: "https://uspu.ru", tier: 3
  },

  // ===== КАЗАНЬ =====
  {
    id: "kfu_math", name: "КФУ", faculty: "Институт математики и механики", city: "Казань",
    score: 230, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://kpfu.ru", tier: 2
  },
  {
    id: "kfu_it", name: "КФУ", faculty: "Институт вычислительной математики и IT", city: "Казань",
    score: 225, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://kpfu.ru", tier: 2
  },
  {
    id: "kfu_law", name: "КФУ", faculty: "Юридический факультет", city: "Казань",
    score: 220, subjects: ["Обществознание", "История", "Русский язык"],
    url: "https://kpfu.ru", tier: 2
  },
  {
    id: "knitu", name: "КНИТУ-КАИ", faculty: "Авиационная техника", city: "Казань",
    score: 195, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://kai.ru", tier: 3
  },

  // ===== НИЖНИЙ НОВГОРОД =====
  {
    id: "nngu_math", name: "ННГУ им. Лобачевского", faculty: "Механико-математический", city: "Нижний Новгород",
    score: 215, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://unn.ru", tier: 2
  },
  {
    id: "nngu_it", name: "ННГУ им. Лобачевского", faculty: "Информатика", city: "Нижний Новгород",
    score: 220, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://unn.ru", tier: 2
  },

  // ===== САМАРА =====
  {
    id: "sgu_samara", name: "СамГУ", faculty: "Математика и IT", city: "Самара",
    score: 200, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://samgu.ru", tier: 3
  },
  {
    id: "ssau", name: "СГАУ (Самарский университет)", faculty: "Авиация и космонавтика", city: "Самара",
    score: 215, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://ssau.ru", tier: 2
  },

  // ===== КРАСНОЯРСК =====
  {
    id: "sfu_math", name: "СФУ", faculty: "Математика и IT", city: "Красноярск",
    score: 195, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    url: "https://sfu-kras.ru", tier: 2
  },
  {
    id: "sfu_econ", name: "СФУ", faculty: "Экономика", city: "Красноярск",
    score: 185, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://sfu-kras.ru", tier: 2
  },

  // ===== ТОМСК =====
  {
    id: "tgu_math", name: "ТГУ", faculty: "Механико-математический", city: "Томск",
    score: 235, subjects: ["Математика", "Физика", "Русский язык"],
    note: "Один из старейших и сильных университетов Сибири",
    url: "https://tsu.ru", tier: 2
  },
  {
    id: "tgu_it", name: "ТГУ", faculty: "Информатика", city: "Томск",
    score: 230, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://tsu.ru", tier: 2
  },
  {
    id: "tpu", name: "ТПУ", faculty: "Прикладная математика и информатика", city: "Томск",
    score: 215, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    url: "https://tpu.ru", tier: 2
  },

  // ===== ВОРОНЕЖ =====
  {
    id: "vgu_math", name: "ВГУ", faculty: "Математический факультет", city: "Воронеж",
    score: 190, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://vsu.ru", tier: 3
  },
  {
    id: "vgtu", name: "ВГТУ", faculty: "Информатика и вычислительная техника", city: "Воронеж",
    score: 175, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://cchgeu.ru", tier: 3
  },

  // ===== РОСТОВ-НА-ДОНУ =====
  {
    id: "sfu_rostov", name: "ЮФУ", faculty: "Математика, механика и компьютерные науки", city: "Ростов-на-Дону",
    score: 210, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    url: "https://sfedu.ru", tier: 2
  },
  {
    id: "rgeu", name: "РГЭУ (РИНХ)", faculty: "Экономика", city: "Ростов-на-Дону",
    score: 185, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://rsue.ru", tier: 3
  },

  // ===== КРАСНОДАР =====
  {
    id: "kuban_math", name: "КубГУ", faculty: "Математика и компьютерные науки", city: "Краснодар",
    score: 185, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://kubsu.ru", tier: 3
  },
  {
    id: "kgtu", name: "КубГТУ", faculty: "Информационные технологии", city: "Краснодар",
    score: 170, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://kubstu.ru", tier: 3
  },

  // ===== СТАВРОПОЛЬ =====
  {
    id: "ncfu", name: "СКФУ", faculty: "Математика и IT", city: "Ставрополь",
    score: 175, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://ncfu.ru", tier: 3
  },

  // ===== УФА =====
  {
    id: "ufa_math", name: "УГАТУ", faculty: "Прикладная математика", city: "Уфа",
    score: 190, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://ugatu.su", tier: 3
  },
  {
    id: "bashgu", name: "БашГУ", faculty: "Математика и IT", city: "Уфа",
    score: 180, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://bashedu.ru", tier: 3
  },

  // ===== ПЕРМЬ =====
  {
    id: "pgu_math", name: "ПГНИУ", faculty: "Механико-математический", city: "Пермь",
    score: 200, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://psu.ru", tier: 2
  },
  {
    id: "pnipu", name: "ПНИПУ", faculty: "Прикладная математика", city: "Пермь",
    score: 185, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://pstu.ru", tier: 3
  },

  // ===== ЧЕЛЯБИНСК =====
  {
    id: "cgu_math", name: "ЧелГУ", faculty: "Математика и IT", city: "Челябинск",
    score: 180, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://csu.ru", tier: 3
  },
  {
    id: "susu", name: "ЮУрГУ", faculty: "Прикладная математика и физика", city: "Челябинск",
    score: 195, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://susu.ru", tier: 2
  },

  // ===== ОМСК =====
  {
    id: "omgu_math", name: "ОмГУ", faculty: "Математика и IT", city: "Омск",
    score: 175, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://omsu.ru", tier: 3
  },

  // ===== ИРКУТСК =====
  {
    id: "isu_math", name: "ИГУ", faculty: "Математика", city: "Иркутск",
    score: 185, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://isu.ru", tier: 3
  },
  {
    id: "istu", name: "ИРНИТУ", faculty: "Информатика и вычислительная техника", city: "Иркутск",
    score: 170, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://istu.edu", tier: 3
  },

  // ===== ВЛАДИВОСТОК =====
  {
    id: "dvfu_math", name: "ДВФУ", faculty: "Математика и компьютерные науки", city: "Владивосток",
    score: 195, subjects: ["Математика", "Физика/Информатика", "Русский язык"],
    url: "https://dvfu.ru", tier: 2
  },
  {
    id: "dvfu_econ", name: "ДВФУ", faculty: "Экономика", city: "Владивосток",
    score: 180, subjects: ["Математика", "Обществознание", "Русский язык"],
    url: "https://dvfu.ru", tier: 2
  },

  // ===== ХАБАРОВСК =====
  {
    id: "togu", name: "ТОГУ", faculty: "Информатика и вычислительная техника", city: "Хабаровск",
    score: 160, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://pnu.edu.ru", tier: 3
  },

  // ===== САРАТОВ =====
  {
    id: "sgu_math", name: "СГУ им. Чернышевского", faculty: "Механико-математический", city: "Саратов",
    score: 190, subjects: ["Математика", "Физика", "Русский язык"],
    url: "https://www.sgu.ru", tier: 3
  },

  // ===== ВОЛГОГРАД =====
  {
    id: "volgu_math", name: "ВолГУ", faculty: "Математика и IT", city: "Волгоград",
    score: 175, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://volsu.ru", tier: 3
  },

  // ===== ТЮМЕНЬ =====
  {
    id: "utmn_math", name: "ТюмГУ", faculty: "Математика и компьютерные науки", city: "Тюмень",
    score: 185, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://utmn.ru", tier: 3
  },

  // ===== БАРНАУЛ =====
  {
    id: "algu_math", name: "АлтГУ", faculty: "Математика и IT", city: "Барнаул",
    score: 170, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://www.asu.ru", tier: 3
  },

  // ===== КЕМЕРОВО =====
  {
    id: "kemsu_math", name: "КемГУ", faculty: "Математика и информатика", city: "Кемерово",
    score: 160, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://www.kemsu.ru", tier: 3
  },

  // ===== АРХАНГЕЛЬСК =====
  {
    id: "narfu", name: "САФУ", faculty: "Информатика и вычислительная техника", city: "Архангельск",
    score: 165, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://narfu.ru", tier: 3
  },

  // ===== СЫКТЫВКАР =====
  {
    id: "syktsu", name: "СыктГУ", faculty: "Математика и IT", city: "Сыктывкар",
    score: 155, subjects: ["Математика", "Информатика", "Русский язык"],
    url: "https://syktsu.ru", tier: 3
  },
];

export const CITIES = [...new Set(UNIVERSITIES.map(u => u.city))].sort();

export const TIERS = {
  1: { label: "Топ-вузы", color: "#f59e0b" },
  2: { label: "Сильные региональные", color: "#4f7ef7" },
  3: { label: "Региональные", color: "#10b981" },
};
