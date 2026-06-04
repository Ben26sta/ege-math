// База вузов России — проходные баллы по данным 2025 года
// Источники: provuz.ru, postupi.info, vuzopedia.ru, официальные сайты вузов
// ⚠️ Баллы — ориентир. Актуальные данные публикуются вузами в августе.

export const UNIVERSITIES = [

  // =================== МОСКВА — ТОП ===================
  { id:"msu_mech", name:"МГУ им. Ломоносова", faculty:"Механико-математический", city:"Москва", score:335, subjects:["Математика","Физика","Русский язык"], note:"Обязательный доп. экзамен по математике", url:"https://mgu.ru", tier:1, category:"tech" },
  { id:"msu_vmk", name:"МГУ им. Ломоносова", faculty:"ВМК (Вычислительная математика)", city:"Москва", score:320, subjects:["Математика","Информатика","Русский язык"], note:"Обязательный доп. экзамен", url:"https://mgu.ru", tier:1, category:"tech" },
  { id:"msu_econ", name:"МГУ им. Ломоносова", faculty:"Экономический факультет", city:"Москва", score:310, subjects:["Математика","Обществознание","Русский язык"], note:"Обязательный доп. экзамен", url:"https://mgu.ru", tier:1, category:"econ" },
  { id:"msu_law", name:"МГУ им. Ломоносова", faculty:"Юридический факультет", city:"Москва", score:315, subjects:["Обществознание","История","Русский язык"], note:"Обязательный доп. экзамен", url:"https://mgu.ru", tier:1, category:"law" },
  { id:"msu_phys", name:"МГУ им. Ломоносова", faculty:"Физический факультет", city:"Москва", score:320, subjects:["Математика","Физика","Русский язык"], note:"Обязательный доп. экзамен", url:"https://mgu.ru", tier:1, category:"tech" },
  { id:"msu_bio", name:"МГУ им. Ломоносова", faculty:"Биологический факультет", city:"Москва", score:295, subjects:["Биология","Химия","Русский язык"], note:"Обязательный доп. экзамен", url:"https://mgu.ru", tier:1, category:"med" },

  { id:"mfti_pm", name:"МФТИ", faculty:"Прикладная математика и информатика", city:"Москва", score:305, subjects:["Математика","Информатика","Русский язык"], note:"Средний балл поступивших ~97 за предмет", url:"https://mipt.ru", tier:1, category:"tech" },
  { id:"mfti_phys", name:"МФТИ", faculty:"Физика и исследования", city:"Москва", score:295, subjects:["Математика","Физика","Русский язык"], url:"https://mipt.ru", tier:1, category:"tech" },
  { id:"mfti_cs", name:"МФТИ", faculty:"Компьютерные науки", city:"Москва", score:307, subjects:["Математика","Информатика","Русский язык"], url:"https://mipt.ru", tier:1, category:"tech" },

  { id:"hse_math", name:"НИУ ВШЭ", faculty:"Математика", city:"Москва", score:290, subjects:["Математика","Физика","Русский язык"], url:"https://hse.ru", tier:1, category:"tech" },
  { id:"hse_econ", name:"НИУ ВШЭ", faculty:"Экономика", city:"Москва", score:285, subjects:["Математика","Обществознание","Русский язык"], url:"https://hse.ru", tier:1, category:"econ" },
  { id:"hse_cs", name:"НИУ ВШЭ", faculty:"Компьютерные науки", city:"Москва", score:292, subjects:["Математика","Информатика","Русский язык"], url:"https://hse.ru", tier:1, category:"tech" },
  { id:"hse_law", name:"НИУ ВШЭ", faculty:"Юриспруденция", city:"Москва", score:275, subjects:["Обществознание","История","Русский язык"], url:"https://hse.ru", tier:1, category:"law" },
  { id:"hse_ling", name:"НИУ ВШЭ", faculty:"Лингвистика", city:"Москва", score:278, subjects:["Иностранный язык","Обществознание","Русский язык"], url:"https://hse.ru", tier:1, category:"hum" },

  { id:"mgimo_mo", name:"МГИМО", faculty:"Международные отношения", city:"Москва", score:285, subjects:["Иностранный язык","История","Русский язык"], note:"Доп. экзамен. Суммарный балл от 403", url:"https://mgimo.ru", tier:1, category:"hum" },
  { id:"mgimo_econ", name:"МГИМО", faculty:"Международная экономика", city:"Москва", score:270, subjects:["Математика","Иностранный язык","Русский язык"], url:"https://mgimo.ru", tier:1, category:"econ" },
  { id:"mgimo_law", name:"МГИМО", faculty:"Международное право", city:"Москва", score:280, subjects:["Обществознание","Иностранный язык","Русский язык"], url:"https://mgimo.ru", tier:1, category:"law" },

  { id:"mgtu_math", name:"МГТУ им. Баумана", faculty:"Прикладная математика", city:"Москва", score:270, subjects:["Математика","Физика","Русский язык"], url:"https://bmstu.ru", tier:1, category:"tech" },
  { id:"mgtu_cs", name:"МГТУ им. Баумана", faculty:"Компьютерные науки", city:"Москва", score:265, subjects:["Математика","Информатика","Русский язык"], url:"https://bmstu.ru", tier:1, category:"tech" },
  { id:"mgtu_eng", name:"МГТУ им. Баумана", faculty:"Машиностроение", city:"Москва", score:248, subjects:["Математика","Физика","Русский язык"], url:"https://bmstu.ru", tier:1, category:"tech" },

  { id:"mifи", name:"НИЯУ МИФИ", faculty:"Ядерная физика и технологии", city:"Москва", score:264, subjects:["Математика","Физика","Русский язык"], url:"https://mephi.ru", tier:1, category:"tech" },
  { id:"mifi_cs", name:"НИЯУ МИФИ", faculty:"Информатика и вычислительная техника", city:"Москва", score:260, subjects:["Математика","Физика/Информатика","Русский язык"], url:"https://mephi.ru", tier:1, category:"tech" },

  // Медицинские Москва
  { id:"sechenov_ld", name:"Первый МГМУ (Сеченова)", faculty:"Лечебное дело", city:"Москва", score:264, subjects:["Химия","Биология","Русский язык"], note:"2085 бюджетных мест в 2025. Конкуренция очень высокая", url:"https://sechenov.ru", tier:1, category:"med" },
  { id:"sechenov_stom", name:"Первый МГМУ (Сеченова)", faculty:"Стоматология", city:"Москва", score:266, subjects:["Химия","Биология","Русский язык"], url:"https://sechenov.ru", tier:1, category:"med" },
  { id:"sechenov_ped", name:"Первый МГМУ (Сеченова)", faculty:"Педиатрия", city:"Москва", score:262, subjects:["Химия","Биология","Русский язык"], url:"https://sechenov.ru", tier:1, category:"med" },
  { id:"sechenov_pharm", name:"Первый МГМУ (Сеченова)", faculty:"Фармация", city:"Москва", score:236, subjects:["Химия","Биология","Русский язык"], url:"https://sechenov.ru", tier:1, category:"med" },
  { id:"rnimu_ld", name:"РНИМУ им. Пирогова", faculty:"Лечебное дело", city:"Москва", score:263, subjects:["Химия","Биология","Русский язык"], note:"85+ баллов за каждый предмет", url:"https://rsmu.ru", tier:1, category:"med" },
  { id:"rnimu_stom", name:"РНИМУ им. Пирогова", faculty:"Стоматология", city:"Москва", score:272, subjects:["Химия","Биология","Русский язык"], url:"https://rsmu.ru", tier:1, category:"med" },
  { id:"rnimu_ped", name:"РНИМУ им. Пирогова", faculty:"Педиатрия", city:"Москва", score:221, subjects:["Химия","Биология","Русский язык"], url:"https://rsmu.ru", tier:1, category:"med" },
  { id:"rumu_ld", name:"Российский университет медицины", faculty:"Лечебное дело", city:"Москва", score:220, subjects:["Химия","Биология","Русский язык"], url:"https://rumed.ru", tier:2, category:"med" },

  // Юридические Москва
  { id:"mgyua_law", name:"МГЮА им. Кутафина", faculty:"Юриспруденция", city:"Москва", score:226, subjects:["Обществознание","История","Русский язык"], url:"https://msal.ru", tier:1, category:"law" },
  { id:"mgyua_expert", name:"МГЮА им. Кутафина", faculty:"Судебная экспертиза", city:"Москва", score:275, subjects:["Обществознание","История","Русский язык"], url:"https://msal.ru", tier:1, category:"law" },

  // Экономические Москва
  { id:"ranepa_gov", name:"РАНХиГС", faculty:"Государственное управление", city:"Москва", score:255, subjects:["Обществознание","История","Русский язык"], url:"https://ranepa.ru", tier:2, category:"econ" },
  { id:"ranepa_econ", name:"РАНХиГС", faculty:"Экономика", city:"Москва", score:245, subjects:["Математика","Обществознание","Русский язык"], url:"https://ranepa.ru", tier:2, category:"econ" },
  { id:"finuniver", name:"Финансовый университет", faculty:"Финансы и кредит", city:"Москва", score:250, subjects:["Математика","Обществознание","Русский язык"], url:"https://fa.ru", tier:2, category:"econ" },
  { id:"reu_plex", name:"РЭУ им. Плеханова", faculty:"Экономика", city:"Москва", score:220, subjects:["Математика","Обществознание","Русский язык"], url:"https://rea.ru", tier:2, category:"econ" },

  // Технические Москва
  { id:"gubkina", name:"РГУ нефти и газа им. Губкина", faculty:"Нефтегазовое дело", city:"Москва", score:234, subjects:["Математика","Физика/Химия","Русский язык"], url:"https://gubkin.ru", tier:2, category:"tech" },
  { id:"misis", name:"НИТУ МИСиС", faculty:"Информатика и вычислительная техника", city:"Москва", score:255, subjects:["Математика","Информатика","Русский язык"], url:"https://misis.ru", tier:2, category:"tech" },
  { id:"mai", name:"МАИ", faculty:"Авиация и ракетно-космическая техника", city:"Москва", score:231, subjects:["Математика","Физика","Русский язык"], url:"https://mai.ru", tier:2, category:"tech" },
  { id:"mei", name:"НИУ МЭИ", faculty:"Электроэнергетика и электротехника", city:"Москва", score:222, subjects:["Математика","Физика","Русский язык"], url:"https://mpei.ru", tier:2, category:"tech" },
  { id:"mirea", name:"РТУ МИРЭА", faculty:"Информационные технологии", city:"Москва", score:225, subjects:["Математика","Информатика","Русский язык"], url:"https://mirea.ru", tier:2, category:"tech" },

  // Педагогические Москва
  { id:"mpgu", name:"МПГУ", faculty:"Педагогическое образование (Математика)", city:"Москва", score:226, subjects:["Математика","Физика/Информатика","Русский язык"], url:"https://mpgu.su", tier:2, category:"ped" },
  { id:"mpgu_lang", name:"МПГУ", faculty:"Иностранные языки", city:"Москва", score:240, subjects:["Иностранный язык","Обществознание","Русский язык"], url:"https://mpgu.su", tier:2, category:"ped" },

  // Гуманитарные Москва
  { id:"mglu", name:"МГЛУ", faculty:"Лингвистика", city:"Москва", score:245, subjects:["Иностранный язык","Обществознание","Русский язык"], url:"https://linguanet.ru", tier:2, category:"hum" },
  { id:"rggu", name:"РГГУ", faculty:"История", city:"Москва", score:215, subjects:["История","Обществознание","Русский язык"], url:"https://rggu.ru", tier:2, category:"hum" },

  // =================== САНКТ-ПЕТЕРБУРГ ===================
  { id:"spbu_math", name:"СПбГУ", faculty:"Математика и компьютерные науки", city:"Санкт-Петербург", score:280, subjects:["Математика","Физика","Русский язык"], url:"https://spbu.ru", tier:1, category:"tech" },
  { id:"spbu_econ", name:"СПбГУ", faculty:"Экономика", city:"Санкт-Петербург", score:265, subjects:["Математика","Обществознание","Русский язык"], url:"https://spbu.ru", tier:1, category:"econ" },
  { id:"spbu_law", name:"СПбГУ", faculty:"Юриспруденция", city:"Санкт-Петербург", score:270, subjects:["Обществознание","История","Русский язык"], url:"https://spbu.ru", tier:1, category:"law" },
  { id:"spbu_med", name:"СПбГУ", faculty:"Медицина (лечебное дело)", city:"Санкт-Петербург", score:255, subjects:["Химия","Биология","Русский язык"], url:"https://spbu.ru", tier:1, category:"med" },
  { id:"itmo_it", name:"Университет ИТМО", faculty:"Информационные технологии", city:"Санкт-Петербург", score:280, subjects:["Математика","Информатика","Русский язык"], note:"Один из лучших IT-вузов России", url:"https://itmo.ru", tier:1, category:"tech" },
  { id:"itmo_ai", name:"Университет ИТМО", faculty:"Искусственный интеллект", city:"Санкт-Петербург", score:285, subjects:["Математика","Информатика","Русский язык"], url:"https://itmo.ru", tier:1, category:"tech" },
  { id:"spbpu", name:"СПбПУ (Политех)", faculty:"Прикладная математика и физика", city:"Санкт-Петербург", score:255, subjects:["Математика","Физика","Русский язык"], url:"https://spbstu.ru", tier:2, category:"tech" },
  { id:"hse_spb", name:"НИУ ВШЭ (СПб)", faculty:"Экономика", city:"Санкт-Петербург", score:265, subjects:["Математика","Обществознание","Русский язык"], url:"https://spb.hse.ru", tier:1, category:"econ" },
  { id:"spbgmu", name:"ПСПбГМУ им. Павлова", faculty:"Лечебное дело", city:"Санкт-Петербург", score:258, subjects:["Химия","Биология","Русский язык"], note:"Один из ведущих медвузов СПб", url:"https://spbgmu.ru", tier:1, category:"med" },
  { id:"spbgmu_ped", name:"ПСПбГМУ им. Павлова", faculty:"Педиатрия", city:"Санкт-Петербург", score:252, subjects:["Химия","Биология","Русский язык"], url:"https://spbgmu.ru", tier:1, category:"med" },
  { id:"szgmu", name:"СЗГМУ им. Мечникова", faculty:"Лечебное дело", city:"Санкт-Петербург", score:240, subjects:["Химия","Биология","Русский язык"], url:"https://szgmu.ru", tier:2, category:"med" },
  { id:"spbgetu", name:"СПбГЭТУ «ЛЭТИ»", faculty:"Информатика и вычислительная техника", city:"Санкт-Петербург", score:240, subjects:["Математика","Физика/Информатика","Русский язык"], url:"https://etu.ru", tier:2, category:"tech" },
  { id:"rgpu_herzen", name:"РГПУ им. Герцена", faculty:"Педагогическое образование", city:"Санкт-Петербург", score:195, subjects:["Русский язык","Обществознание/История","Профильный предмет"], url:"https://herzen.spb.ru", tier:2, category:"ped" },

  // =================== НОВОСИБИРСК ===================
  { id:"ngu_math", name:"НГУ", faculty:"Математика и механика", city:"Новосибирск", score:265, subjects:["Математика","Физика","Русский язык"], note:"Один из лучших вузов за Уралом", url:"https://nsu.ru", tier:1, category:"tech" },
  { id:"ngu_it", name:"НГУ", faculty:"Информационные технологии", city:"Новосибирск", score:260, subjects:["Математика","Информатика","Русский язык"], url:"https://nsu.ru", tier:1, category:"tech" },
  { id:"ngu_econ", name:"НГУ", faculty:"Экономика", city:"Новосибирск", score:245, subjects:["Математика","Обществознание","Русский язык"], url:"https://nsu.ru", tier:1, category:"econ" },
  { id:"nstu", name:"НГТУ", faculty:"Прикладная математика", city:"Новосибирск", score:220, subjects:["Математика","Физика","Русский язык"], url:"https://nstu.ru", tier:2, category:"tech" },
  { id:"ngmu", name:"НГМУ", faculty:"Лечебное дело", city:"Новосибирск", score:218, subjects:["Химия","Биология","Русский язык"], url:"https://ngmu.ru", tier:2, category:"med" },
  { id:"ngmu_ped", name:"НГМУ", faculty:"Педиатрия", city:"Новосибирск", score:210, subjects:["Химия","Биология","Русский язык"], url:"https://ngmu.ru", tier:2, category:"med" },
  { id:"ngpu", name:"НГПУ", faculty:"Педагогическое образование", city:"Новосибирск", score:175, subjects:["Русский язык","Обществознание","Профильный предмет"], url:"https://nspu.ru", tier:3, category:"ped" },

  // =================== ЕКАТЕРИНБУРГ ===================
  { id:"urfu_math", name:"УрФУ", faculty:"Математика и механика", city:"Екатеринбург", score:225, subjects:["Математика","Физика","Русский язык"], note:"Средний балл ~74.8 за предмет в 2025", url:"https://urfu.ru", tier:2, category:"tech" },
  { id:"urfu_it", name:"УрФУ", faculty:"Информационные технологии", city:"Екатеринбург", score:230, subjects:["Математика","Информатика","Русский язык"], url:"https://urfu.ru", tier:2, category:"tech" },
  { id:"urfu_econ", name:"УрФУ", faculty:"Экономика", city:"Екатеринбург", score:215, subjects:["Математика","Обществознание","Русский язык"], url:"https://urfu.ru", tier:2, category:"econ" },
  { id:"urfu_law", name:"УрФУ", faculty:"Юриспруденция", city:"Екатеринбург", score:205, subjects:["Обществознание","История","Русский язык"], url:"https://urfu.ru", tier:2, category:"law" },
  { id:"ugmu", name:"УГМУ", faculty:"Лечебное дело", city:"Екатеринбург", score:220, subjects:["Химия","Биология","Русский язык"], url:"https://usma.ru", tier:2, category:"med" },
  { id:"ugmu_stom", name:"УГМУ", faculty:"Стоматология", city:"Екатеринбург", score:225, subjects:["Химия","Биология","Русский язык"], url:"https://usma.ru", tier:2, category:"med" },
  { id:"usppu", name:"УрГПУ", faculty:"Педагогическое образование", city:"Екатеринбург", score:175, subjects:["Русский язык","Обществознание","Профильный предмет"], url:"https://uspu.ru", tier:3, category:"ped" },

  // =================== КАЗАНЬ ===================
  { id:"kfu_math", name:"КФУ", faculty:"Математика и механика", city:"Казань", score:230, subjects:["Математика","Физика","Русский язык"], url:"https://kpfu.ru", tier:2, category:"tech" },
  { id:"kfu_it", name:"КФУ", faculty:"Информатика и вычислительные технологии", city:"Казань", score:225, subjects:["Математика","Информатика","Русский язык"], url:"https://kpfu.ru", tier:2, category:"tech" },
  { id:"kfu_law", name:"КФУ", faculty:"Юриспруденция", city:"Казань", score:220, subjects:["Обществознание","История","Русский язык"], url:"https://kpfu.ru", tier:2, category:"law" },
  { id:"kfu_econ", name:"КФУ", faculty:"Экономика", city:"Казань", score:210, subjects:["Математика","Обществознание","Русский язык"], url:"https://kpfu.ru", tier:2, category:"econ" },
  { id:"kgmu", name:"КГМУ", faculty:"Лечебное дело", city:"Казань", score:228, subjects:["Химия","Биология","Русский язык"], note:"Один из старейших медвузов России", url:"https://kazangmu.ru", tier:2, category:"med" },
  { id:"kgmu_stom", name:"КГМУ", faculty:"Стоматология", city:"Казань", score:235, subjects:["Химия","Биология","Русский язык"], url:"https://kazangmu.ru", tier:2, category:"med" },
  { id:"kgmu_ped", name:"КГМУ", faculty:"Педиатрия", city:"Казань", score:220, subjects:["Химия","Биология","Русский язык"], url:"https://kazangmu.ru", tier:2, category:"med" },

  // =================== НИЖНИЙ НОВГОРОД ===================
  { id:"nngu_math", name:"ННГУ им. Лобачевского", faculty:"Механико-математический", city:"Нижний Новгород", score:215, subjects:["Математика","Физика","Русский язык"], url:"https://unn.ru", tier:2, category:"tech" },
  { id:"nngu_it", name:"ННГУ им. Лобачевского", faculty:"Информатика", city:"Нижний Новгород", score:220, subjects:["Математика","Информатика","Русский язык"], url:"https://unn.ru", tier:2, category:"tech" },
  { id:"pimunn", name:"ПИМУ (Нижегородская медакадемия)", faculty:"Лечебное дело", city:"Нижний Новгород", score:208, subjects:["Химия","Биология","Русский язык"], url:"https://pimunn.ru", tier:2, category:"med" },

  // =================== ТОМСК ===================
  { id:"tgu_math", name:"ТГУ", faculty:"Механико-математический", city:"Томск", score:235, subjects:["Математика","Физика","Русский язык"], note:"Один из старейших вузов Сибири", url:"https://tsu.ru", tier:2, category:"tech" },
  { id:"tgu_it", name:"ТГУ", faculty:"Информатика", city:"Томск", score:230, subjects:["Математика","Информатика","Русский язык"], url:"https://tsu.ru", tier:2, category:"tech" },
  { id:"tpu", name:"ТПУ", faculty:"Прикладная математика и информатика", city:"Томск", score:215, subjects:["Математика","Физика/Информатика","Русский язык"], url:"https://tpu.ru", tier:2, category:"tech" },
  { id:"sibgmu", name:"СибГМУ", faculty:"Лечебное дело", city:"Томск", score:222, subjects:["Химия","Биология","Русский язык"], url:"https://ssmu.ru", tier:2, category:"med" },
  { id:"sibgmu_ped", name:"СибГМУ", faculty:"Педиатрия", city:"Томск", score:215, subjects:["Химия","Биология","Русский язык"], url:"https://ssmu.ru", tier:2, category:"med" },

  // =================== КРАСНОЯРСК ===================
  { id:"sfu_math", name:"СФУ", faculty:"Математика и IT", city:"Красноярск", score:195, subjects:["Математика","Физика/Информатика","Русский язык"], url:"https://sfu-kras.ru", tier:2, category:"tech" },
  { id:"sfu_econ", name:"СФУ", faculty:"Экономика", city:"Красноярск", score:185, subjects:["Математика","Обществознание","Русский язык"], url:"https://sfu-kras.ru", tier:2, category:"econ" },
  { id:"kgmu_krsk", name:"КрасГМУ им. Войно-Ясенецкого", faculty:"Лечебное дело", city:"Красноярск", score:210, subjects:["Химия","Биология","Русский язык"], url:"https://krasgmu.ru", tier:2, category:"med" },
  { id:"kgpu", name:"КГПУ им. Астафьева", faculty:"Педагогическое образование", city:"Красноярск", score:160, subjects:["Русский язык","Обществознание","Профильный предмет"], url:"https://kspu.ru", tier:3, category:"ped" },

  // =================== УФА ===================
  { id:"ugatu", name:"УГАТУ", faculty:"Авиационная техника", city:"Уфа", score:190, subjects:["Математика","Физика","Русский язык"], url:"https://ugatu.su", tier:3, category:"tech" },
  { id:"bashgu", name:"БашГУ", faculty:"Математика и IT", city:"Уфа", score:180, subjects:["Математика","Информатика","Русский язык"], url:"https://bashedu.ru", tier:3, category:"tech" },
  { id:"bashgmu", name:"БГМУ", faculty:"Лечебное дело", city:"Уфа", score:218, subjects:["Химия","Биология","Русский язык"], note:"Минимум 55 баллов за предмет", url:"https://bashgmu.ru", tier:2, category:"med" },
  { id:"bashgmu_stom", name:"БГМУ", faculty:"Стоматология", city:"Уфа", score:222, subjects:["Химия","Биология","Русский язык"], url:"https://bashgmu.ru", tier:2, category:"med" },

  // =================== РОСТОВ-НА-ДОНУ ===================
  { id:"yufu_math", name:"ЮФУ", faculty:"Математика и компьютерные науки", city:"Ростов-на-Дону", score:210, subjects:["Математика","Физика/Информатика","Русский язык"], url:"https://sfedu.ru", tier:2, category:"tech" },
  { id:"yufu_law", name:"ЮФУ", faculty:"Юриспруденция", city:"Ростов-на-Дону", score:200, subjects:["Обществознание","История","Русский язык"], url:"https://sfedu.ru", tier:2, category:"law" },
  { id:"rostgmu", name:"РостГМУ", faculty:"Лечебное дело", city:"Ростов-на-Дону", score:205, subjects:["Химия","Биология","Русский язык"], url:"https://rostgmu.ru", tier:2, category:"med" },
  { id:"rgeu", name:"РГЭУ (РИНХ)", faculty:"Экономика", city:"Ростов-на-Дону", score:185, subjects:["Математика","Обществознание","Русский язык"], url:"https://rsue.ru", tier:3, category:"econ" },

  // =================== КРАСНОДАР ===================
  { id:"kuban_math", name:"КубГУ", faculty:"Математика и компьютерные науки", city:"Краснодар", score:185, subjects:["Математика","Информатика","Русский язык"], url:"https://kubsu.ru", tier:3, category:"tech" },
  { id:"kgmu_krasnodar", name:"КубГМУ", faculty:"Лечебное дело", city:"Краснодар", score:200, subjects:["Химия","Биология","Русский язык"], note:"606 бюджетных мест", url:"https://www.ksma.ru", tier:2, category:"med" },
  { id:"kgmu_krd_stom", name:"КубГМУ", faculty:"Стоматология", city:"Краснодар", score:210, subjects:["Химия","Биология","Русский язык"], url:"https://www.ksma.ru", tier:2, category:"med" },
  { id:"kgtu", name:"КубГТУ", faculty:"Информационные технологии", city:"Краснодар", score:170, subjects:["Математика","Информатика","Русский язык"], url:"https://kubstu.ru", tier:3, category:"tech" },

  // =================== СТАВРОПОЛЬ ===================
  { id:"ncfu", name:"СКФУ", faculty:"Математика и IT", city:"Ставрополь", score:175, subjects:["Математика","Информатика","Русский язык"], url:"https://ncfu.ru", tier:3, category:"tech" },
  { id:"stgmu", name:"СтГМУ", faculty:"Лечебное дело", city:"Ставрополь", score:195, subjects:["Химия","Биология","Русский язык"], url:"https://stgmu.ru", tier:2, category:"med" },
  { id:"stgmu_stom", name:"СтГМУ", faculty:"Стоматология", city:"Ставрополь", score:200, subjects:["Химия","Биология","Русский язык"], url:"https://stgmu.ru", tier:2, category:"med" },

  // =================== САМАРА ===================
  { id:"samgtu", name:"Самарский университет", faculty:"Авиация и космонавтика", city:"Самара", score:215, subjects:["Математика","Физика","Русский язык"], url:"https://ssau.ru", tier:2, category:"tech" },
  { id:"sgu_samara", name:"СамГУ", faculty:"Математика и IT", city:"Самара", score:200, subjects:["Математика","Информатика","Русский язык"], url:"https://samgu.ru", tier:3, category:"tech" },
  { id:"smgmu", name:"СамГМУ", faculty:"Лечебное дело", city:"Самара", score:212, subjects:["Химия","Биология","Русский язык"], url:"https://samgmu.ru", tier:2, category:"med" },

  // =================== ПЕРМЬ ===================
  { id:"pgu_math", name:"ПГНИУ", faculty:"Механико-математический", city:"Пермь", score:200, subjects:["Математика","Физика","Русский язык"], url:"https://psu.ru", tier:2, category:"tech" },
  { id:"pgmu", name:"ПГМУ им. Вагнера", faculty:"Лечебное дело", city:"Пермь", score:198, subjects:["Химия","Биология","Русский язык"], url:"https://psma.ru", tier:2, category:"med" },

  // =================== ЧЕЛЯБИНСК ===================
  { id:"susu", name:"ЮУрГУ", faculty:"Прикладная математика и физика", city:"Челябинск", score:195, subjects:["Математика","Физика","Русский язык"], url:"https://susu.ru", tier:2, category:"tech" },
  { id:"yugmu", name:"ЮУГМУ", faculty:"Лечебное дело", city:"Челябинск", score:195, subjects:["Химия","Биология","Русский язык"], url:"https://csma.ru", tier:2, category:"med" },

  // =================== ВОРОНЕЖ ===================
  { id:"vgu_math", name:"ВГУ", faculty:"Математический факультет", city:"Воронеж", score:190, subjects:["Математика","Физика","Русский язык"], url:"https://vsu.ru", tier:3, category:"tech" },
  { id:"vgmu", name:"ВГМУ им. Бурденко", faculty:"Лечебное дело", city:"Воронеж", score:200, subjects:["Химия","Биология","Русский язык"], url:"https://vsmaburdenko.ru", tier:2, category:"med" },
  { id:"vgpu", name:"ВГПУ", faculty:"Педагогическое образование", city:"Воронеж", score:180, subjects:["Русский язык","Обществознание","Профильный предмет"], url:"https://vspu.ac.ru", tier:3, category:"ped" },

  // =================== САРАТОВ ===================
  { id:"sgu_math", name:"СГУ им. Чернышевского", faculty:"Механико-математический", city:"Саратов", score:190, subjects:["Математика","Физика","Русский язык"], url:"https://www.sgu.ru", tier:3, category:"tech" },
  { id:"sgmu_saratov", name:"СГМУ им. Разумовского", faculty:"Лечебное дело", city:"Саратов", score:195, subjects:["Химия","Биология","Русский язык"], url:"https://sgmu.ru", tier:2, category:"med" },

  // =================== ВОЛГОГРАД ===================
  { id:"volgu_math", name:"ВолГУ", faculty:"Математика и IT", city:"Волгоград", score:175, subjects:["Математика","Информатика","Русский язык"], url:"https://volsu.ru", tier:3, category:"tech" },
  { id:"volgmu", name:"ВолгГМУ", faculty:"Лечебное дело", city:"Волгоград", score:188, subjects:["Химия","Биология","Русский язык"], url:"https://volgmed.ru", tier:2, category:"med" },

  // =================== ОМСК ===================
  { id:"omgu_math", name:"ОмГУ", faculty:"Математика и IT", city:"Омск", score:175, subjects:["Математика","Информатика","Русский язык"], url:"https://omsu.ru", tier:3, category:"tech" },
  { id:"omgmu", name:"ОмГМУ", faculty:"Лечебное дело", city:"Омск", score:190, subjects:["Химия","Биология","Русский язык"], url:"https://omgmu.ru", tier:2, category:"med" },

  // =================== ИРКУТСК ===================
  { id:"isu_math", name:"ИГУ", faculty:"Математика", city:"Иркутск", score:185, subjects:["Математика","Физика","Русский язык"], url:"https://isu.ru", tier:3, category:"tech" },
  { id:"igmu", name:"ИГМУ", faculty:"Лечебное дело", city:"Иркутск", score:192, subjects:["Химия","Биология","Русский язык"], url:"https://ismu.baikal.ru", tier:2, category:"med" },

  // =================== ВЛАДИВОСТОК ===================
  { id:"dvfu_math", name:"ДВФУ", faculty:"Математика и компьютерные науки", city:"Владивосток", score:195, subjects:["Математика","Физика/Информатика","Русский язык"], url:"https://dvfu.ru", tier:2, category:"tech" },
  { id:"dvfu_econ", name:"ДВФУ", faculty:"Экономика", city:"Владивосток", score:180, subjects:["Математика","Обществознание","Русский язык"], url:"https://dvfu.ru", tier:2, category:"econ" },
  { id:"tgmu", name:"ТГМУ", faculty:"Лечебное дело", city:"Владивосток", score:185, subjects:["Химия","Биология","Русский язык"], url:"https://www.tigmed.ru", tier:2, category:"med" },

  // =================== ТЮМЕНЬ ===================
  { id:"utmn_math", name:"ТюмГУ", faculty:"Математика и компьютерные науки", city:"Тюмень", score:185, subjects:["Математика","Информатика","Русский язык"], url:"https://utmn.ru", tier:3, category:"tech" },
  { id:"tyugmu", name:"Тюменский ГМУ", faculty:"Лечебное дело", city:"Тюмень", score:188, subjects:["Химия","Биология","Русский язык"], url:"https://tyumsmu.ru", tier:2, category:"med" },

  // =================== БАРНАУЛ ===================
  { id:"algu_math", name:"АлтГУ", faculty:"Математика и IT", city:"Барнаул", score:170, subjects:["Математика","Информатика","Русский язык"], url:"https://www.asu.ru", tier:3, category:"tech" },
  { id:"agmu", name:"АГМУ", faculty:"Лечебное дело", city:"Барнаул", score:182, subjects:["Химия","Биология","Русский язык"], url:"https://agmu.ru", tier:2, category:"med" },

  // =================== КЕМЕРОВО ===================
  { id:"kemsugmu", name:"КемГМУ", faculty:"Лечебное дело", city:"Кемерово", score:175, subjects:["Химия","Биология","Русский язык"], url:"https://kemsmu.ru", tier:2, category:"med" },

  // =================== АРХАНГЕЛЬСК ===================
  { id:"narfu", name:"САФУ", faculty:"Информатика и вычислительная техника", city:"Архангельск", score:165, subjects:["Математика","Информатика","Русский язык"], url:"https://narfu.ru", tier:3, category:"tech" },
  { id:"nsmu", name:"СГМУ (Архангельск)", faculty:"Лечебное дело", city:"Архангельск", score:172, subjects:["Химия","Биология","Русский язык"], url:"https://nsmu.ru", tier:2, category:"med" },

  // =================== ЯРОСЛАВЛЬ ===================
  { id:"yagmu", name:"ЯГМУ", faculty:"Лечебное дело", city:"Ярославль", score:185, subjects:["Химия","Биология","Русский язык"], url:"https://yargma.ru", tier:2, category:"med" },
  { id:"yagpu", name:"ЯГПУ им. Ушинского", faculty:"Педагогическое образование", city:"Ярославль", score:165, subjects:["Русский язык","Обществознание","Профильный предмет"], url:"https://yspu.org", tier:3, category:"ped" },

  // =================== ХАБАРОВСК ===================
  { id:"dvgmu", name:"ДВГМУ", faculty:"Лечебное дело", city:"Хабаровск", score:170, subjects:["Химия","Биология","Русский язык"], url:"https://fesmu.ru", tier:2, category:"med" },

  // =================== АСТРАХАНЬ ===================
  { id:"astrgmu", name:"АстрГМУ", faculty:"Лечебное дело", city:"Астрахань", score:162, subjects:["Химия","Биология","Русский язык"], url:"https://astrsmu.ru", tier:3, category:"med" },
];

export const CITIES = [...new Set(UNIVERSITIES.map(u => u.city))].sort();

export const CATEGORIES = {
  all: "Все направления",
  tech: "Технические / IT / Математика",
  med: "Медицина",
  law: "Юриспруденция",
  econ: "Экономика",
  hum: "Гуманитарные / Языки",
  ped: "Педагогика",
};

export const TIERS = {
  1: { label: "Топ-вузы", color: "#f59e0b" },
  2: { label: "Сильные вузы", color: "#4f7ef7" },
  3: { label: "Региональные", color: "#10b981" },
};
