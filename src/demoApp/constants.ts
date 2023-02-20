export const demoProject = [
  {
    id: 1,
    name: "Бар 'Поросячий визг'",
    autopay: false,
    tariff: {
      name: "M",
      start: 1673439915,
      end: 1681215915,
      amount: 10,
      price: 5500,
      forOne: 550,
    },
    statuses: {
      all: 10,
      success: 7,
      left: 3,
      wait: 4,
      moderate: 2,
      reject: 1,
      delete: 0,
    },
  },
  {
    id: 2,
    name: "Клиника подолгии 'Здоровая пятка'",
    autopay: false,
    tariff: {
      name: "L",
      start: 1673439957,
      end: 1681215957,
      amount: 15,
      price: 7485,
      forOne: 499,
    },
    statuses: {
      all: 15,
      success: 10,
      left: 5,
      wait: 7,
      moderate: 0,
      reject: 3,
      delete: 1,
    },
  },
  {
    id: 3,
    name: "Салон красоты 'Центрифуга'",
    autopay: false,
    tariff: {
      name: "M",
      start: 1674048575,
      end: 1676726975,
      amount: 10,
      price: 5500,
      forOne: 550,
    },
    statuses: {
      all: 10,
      success: 6,
      left: 4,
      wait: 2,
      moderate: 1,
      reject: 2,
      delete: 0,
    },
  },
];

export const demoReviews = [
  {
    id: 1,
    name: "Бар 'Поросячий визг'",
    tariff: {
      name: "S",
      start: 1673439915,
      end: 1681215915,
      amount: 10,
      price: 5500,
      forOne: 550,
    },
    statuses: {
      all: 14,
      success: 7,
      left: 0,
      wait: 4,
      moderate: 2,
      reject: 1,
      delete: 0,
    },
    reviews: [
      {
        id: "12",
        key: "0",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Классное, уютное место. Отличное качество напитков. Безупречный сервис. Особенно Анастасия и Дарья. Очень дружелюбные и позитивные. Энергия в заведении отличная. Конечно рекомендую это место!	Опубликован",
        status: "success",
        date: "28.09.2022",
      },
      {
        id: "24",
        key: "1",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Очень милое и уютное местечко! Были на завтраке и обеде и всё понравилось, повар молодец, обслуживание тоже на высоте",
        status: "success",
        date: '02.10.2022',
      },
      {
        id: "35",
        key: "2",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Вкусная еда. Блюда подают горячими и сочными. Ела с подругой у них чизбургер, пасту с креветками и шоколадный флан. Работают очень приятные дамы",
        status: "success",
        date: '05.10.2022',
      },
      {
        id: "41",
        key: "3",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Хороший бар!",
        status: "success",
        date: '10.10.2022',
      },
      {
        id: "52",
        key: "4",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Заскочила на бизнес ланч, цены для центра Москвы очень даже приятные, даже не верится, что ещё где-то есть ланч за 390₽ 😂 девчонки работают как пчелки, быстро носятся по залу, все чистенько и аккуратно.",
        status: "reject",
        date: '13.10.2022',
      },
      {
        id: "63",
        key: "5",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Хорошее атмосферное место! Кухня отличная. Официанты и бармен знают своë дело, приветливы, внимательны и любезны. В туалете отсутствовали бумажные полотенца и лампочка над зеркалом, за это снял звезду",
        status: "success",
        date: '18.10.2022',
      },
      {
        id: "74",
        key: "6",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Мне понравилось это заведение. Вкусная еда, хорошее пиво. Уютное, небольшое помещение, приятные девушки обслуживающего персонала. Ненавязчивая музыка. Было очень жарко на улице, а в пабе была комфортная температура. Заходите, не пожалеете!!!",
        status: "success",
        date: '21.10.2022',
      },
      {
        id: "81",
        key: "7",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Вкусно готовят, приятная атмосфера, для центра демократичные цены. Но зал не очень большой, вечером трудно найти место.",
        status: "success",
        date: '25.10.2022',
      },
      {
        id: "92",
        key: "8",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Очень милое и уютное местечко! Были на завтраке и обеде и всё понравилось, повар молодец, обслуживание тоже на высоте",
        status: "moderate",
        date: '28.10.2022',
      },
      {
        id: "102",
        key: "9",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Заходила несколько раз всего, не регулярно, но в каждый визит очень вкусно и быстро. И ланчи пробовала, и по общему меню - достойно",
        status: "moderate",
        date: '01.11.2022',
      },
      {
        id: "114",
        key: "10",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Прикольный, милый, маленький бар",
        status: "wait",
        date: '',
      },
      {
        id: "126",
        key: "11",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Очень уютно, небольшое пространство, по-домашнему мило. Вкусная еда и вежливый персонал.",
        status: "wait",
        date: "",
      },
      {
        id: "137",
        key: "12",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Пять баллов за плейлист! Заходил поужинать - все вкусно и нитро стаут на высоте! Небольшое заведение. Персонал отличный! Процветания Вам!",
        status: "wait",
        date: "",
      },
      {
        id: "148",
        key: "13",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Милый и уютный бар в центре Москвы в 1 минуте от метро Китай город (идеально зимой , выскочил из метро и сразу в барчик греться)",
        status: "wait",
        date: "",
      },
    ],
  },
  {
    id: 2,
    name: "Клиника подолгии 'Здоровая пятка'",
    tariff: {
      name: "S",
      start: 1673439915,
      end: 1681215915,
      amount: 15,
      price: 7485,
      forOne: 499,
    },
    statuses: {
      all: 10,
      success: 3,
      left: 7,
      wait: 2,
      moderate: 7,
      reject: 0,
      delete: 1,
    },
    reviews: [
      {
        id: "12",
        key: "0",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "К Марии Валерьевне ходила с онихогрифозом на большом пальце. Появляться стал с возрастом, я думала, это у всех, пока дочка не увидела. Сама отвела к подологу. Спасибо огромное, оказалось, просто привыкла обувь неудобную носить.",
        status: "reject",
        date: "29.11.2022",
      },
      {
        id: "12",
        key: "1",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Недавно заметила, что ноготь на большом пальце стал сильно отходить от ложа. Сначала думала, ушиблась, но ни боли, ни черноты не было. Когда не прошло, пошла в Московскую клинику подологии. Доктор Хлыст поставила диагноз - онихолизис, назначила лечение. Сейчас у меня все хорошо.",
        status: "reject",
        date: "01.12.2022",
      },
      {
        id: "12",
        key: "2",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Мучилась с врастающим ногтем несколько лет. Была у разных специалистов, вырезали, но потом все заново. Мария Валерьевна смогла помочь насовсем.",
        status: "success",
        date: "05.12.2022",
      },
      {
        id: "12",
        key: "3",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Один раз друг уговорил сходить в бассейн, уже через несколько дней я пожалел об этом. Появился грибок. Мучился, покупал разные гели и мази, только хуже становилось. Наконец решил обратиться в Московскую клинику Подологии. Спасибо Марии Валерьевне за помощь. Легче стало уже после первого посещения!",
        status: "delete",
        date: "06.12.2022",
      },
      {
        id: "12",
        key: "4",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Хожу к доктору Хлыст на медицинский педикюр. Потому что в салонах не умеют правильно ухаживать за врастающими ногтями.",
        status: "success",
        date: "09.12.2022",
      },
      {
        id: "12",
        key: "5",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Спасибо Марии Валерьевне за грамотную консультацию и полезные рекомендации. Теперь мои ножки довольны)",
        status: "success",
        date: "12.12.2022",
      },
      {
        id: "12",
        key: "6",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Уже 10 лет у меня сахарный диабет первого типа, раньше такого не было, но с весны 2022 года у меня на стопах начали появляться трещины, они очень долго заживали. Я сначала не придавала этому особого внимания, так как работаю в основном на ногах, и думала, что это в связи с работой, но потом это стало меня сильно беспокоить. Я почувствовала, что у меня началась деформация стопы, а сначала лета вообще появились маленькие язвы. Тогда я нашла в интернете Московскую клинику подологии, записалась на приём к Хлыст Марии Валерьевне. При первом же осмотре, я поняла, что попала в руки к хорошему, грамотному специалисту. С июня по сентябрь я проходила у неё лечение. Она дала полную оценку состояния стоп и ногтевых пластин, а затем, учитывая мои индивидуальные особенности, начала аппаратную обработку стоп. Также Мария Валерьевна дала рекомендации по подбору подходящей обуви. После окончания лечения мне были даны комплексные рекомендации по домашнему уходу за своими стопами (ЛФК, а также рассказали как правильно массировать стопы для улучшения кровообращения). Я очень благодарна клинике подологии, в особенности Хлыст М.В., ведь она помогла мне снова ходить без боли",
        status: "success",
        date: "13.12.2022",
      },
      {
        id: "12",
        key: "7",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Долгое время мучилась из-за отслойки ногтевой пластины от ногтевого ложа, не могла носить открытую обувь, потому что вид ногтей был не очень приятный. А очень хотелось летом в жаркую погоду гулять в босоножках. Подруга посоветовала обратиться в клинику подологии рядом с метро Смоленская. Долго думала, и вот в марте я решила обратиться в клинику. Была на приёме у Хлыст Марии Валерьевны. Сразу же на первом приёме мы обговорили предположительные сроки, схему  лечения, а также мне пояснили по ресурсам восстановления ногтевой пластины и назначениям. Меня всё устроило, и мы принялись за лечение. Процесс был не быстрым (у меня был сложный случай), но абсолютно безболезненный, в сопровождении приятного врача. И вот теперь спустя несколько месяцев после лечения, я могу сказать, что это стоило того, результат достигнут, у меня уже отросла своя ногтевая пластина. А летом я ходила с протезной массой, и она очень красиво и естественно смотрелась на ногах, и это совсем не доставляло дискомфорт.",
        status: "success",
        date: "11.01.2023",
      },
      {
        id: "12",
        key: "8",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Много слышала про медицинский педикюр, но особо не знала, чем он отличается от аппаратного. Но со временем на ногах очень часто стали появляться мозоли, натоптыши, в связи с этим я начала искать хорошего специалиста по медицинскому педикюру. В результате из интернета узнала про клинику подологии. Пришла на приём, и мне там сразу же понравилось. После осмотра со мной сразу обсудили план и методику лечения, также и в финансовом аспекте, что очень порадовало, потому что часто человеку пытаются навязать как можно больше дорогостоящих услуг, не поинтересовавшись, а сможет ли он за них заплатить. После же первого педикюра почувствовала легкость в ногах, теперь посещаю данную клинику, делаю медицинский педикюр, чтобы не запустить свои ножки.",
        status: "reject",
        date: "28.12.2022",
      },
      {
        id: "12",
        key: "9",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Страдаю от вросшего ногтя уже давно, боролась с ним самостоятельно, постоянно его выстригала, и этого хватало на пару месяцев, чтобы ходить без боли в пальце. Но летом я начала замечать, что на том месте, где врастает ноготь начало появляться покраснение, а через пару дней и отёк. Я решила не медлить, и не запускать данную проблему, в результате обратилась за помощью к Хлыст Марии Валерьевне, так как много хорошего слышала о данном специалисте. Как оказалось, она профессионал своего дела, всё понятно разъяснила. В результате правильно подобранного лечения, я теперь забыла про боль в пальце, а самое главное у меня теперь правильный, красивый ноготь, который больше не доставляет мне дискомфорт. Спасибо большое Марии Валерьевне! Если вы мучаетесь от данной проблемы, то рекомендую обратиться в Московскую клинику подологии.",
        status: "success",
        date: "9.1.2023",
      },
      {
        id: "12",
        key: "10",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Обратилась в данную клинику за лечением грибка ногтей на ногах (уже несколько месяцев беспокоила эта проблема, появились шероховатости, в некоторых местах расслоения ногтевой пластины). Было назначено лечение, и уже через 3 недели я заметила улучшения, но не стала на этом останавливаться, и довела дело до конца. Постоянно ходила на назначенные мне сеансы у подолога Хлыст М.В. Теперь мои ногти снова приобрели здоровый вид, и это очень важно, так как необходимо следить за здоровьем всего организма.",
        status: "success",
        date: "11.1.2023",
      },
      {
        id: "12",
        key: "11",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Летом сломал руку и обратился в клинику подологии. Там меня осмотрел врач травматолог, наложил мне гипс. После я наблюдался у травматолога в данной клинике. В связи с этим решил узнать по каким ещё направлениям деятельности работает клиника, и был приятно удивлен, когда узнал какой у них широкий спектр услуг в области подологии. После того, как мой перелом зажил, я ещё посетил клинику для удаления натоптышей (данная проблема уже давно меня беспокоила). Теперь я не ощущаю боль и дискомфорт на ступнях. Хорошая клиника, советую!",
        status: "success",
        date: "14.1.2023",
      },
      {
        id: "12",
        key: "12",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Из-за долгого ношения не правильно подобранной обуви, у меня стал врастать ноготь. Сначала меня это никак не волновало, да и проблема исчезала после педикюра. Но спустя полгода палец стал болеть и образовалась какая-то шишка около ногтя. Пришла в данную клинику, тк она находится недалеко от моего дома. Врач посмотрела и назначила лечение. Оно, признаюсь, было не очень приятным, но действенным. Уже прошло три месяца, ноготь не врастает и не болит. Спасибо за помощь.",
        status: "success",
        date: "17.01.2023",
      },
      {
        id: "12",
        key: "13",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "У меня был обширный грибок стоп. Запах стал невыносимый. Очень было неудобно перед коллегами, хотя я и работаю в сугубо мужском коллективе. Пришлось лечиться. Из-за обширности лечение было долгим, но эффективным и не таким уж дорогим. Теперь следую всем указаниям врача!",
        status: "success",
        date: "20.01.2023",
      },
      {
        id: "12",
        key: "14",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Помогли очень! За полгода жизни у моря образовались невероятные мозоли… там я ходила либо босиком, либо в свободной обуви. Вернулась в Россию к зиме и не смогла носить обычную тёплую обувь. Думала, что отвыкла, но оказалось всё намного сложнее. Мозоли лечила по вашей программе около месяца! Всё прошло!!! Спасибо большое!!!",
        status: "wait",
        date: "",
      },
      {
        id: "12",
        key: "15",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Клиника очень хорошая. Не только я сюда хожу. Но ещё и муж, и старший сын. Все врачи очень приятные, вежливые и квалифицированные. Спасибо за лечение)",
        status: "wait",
        date: "",
      },
      {
        id: "12",
        key: "16",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Неделю назад сделала тут мед педикюр. Это что-то невероятное! Теперь не хожу, а летаю! Спасибо вам!",
        status: "wait",
        date: "",
      },
      {
        id: "12",
        key: "17",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Перед летом заметила, что у мужа стали ужасно некрасивые ногти. Заставила его сходить на приём к врачу. Оказалось почти полное поражение ногтевой пластины. Срочно начали лечить. Вылечили!!! Безмерно вам благодарна!",
        status: "wait",
        date: "",
      },
      {
        id: "12",
        key: "18",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Очень довольна врачом Хлыст М.В. Проблема вросшего ногтя мучала давно, но никак не решалась обратиться к врачу. С каждым годом становилось всё хуже и хуже... Потом приехала на консультацию в другую клинику и мне толком ничем не помогли, только пустая трата денег. По совету позже обратилась сюда. Уже на первом приёме мне действительно помогли,  были видны первые результаты! Далее был задан правильный рост ногтя. Вышло безболезненно. Сейчас прошёл месяц и ноготь растёт правильно, никаких болезненных ощущений. Спасибо",
        status: "wait",
        date: "",
      },
      {
        id: "12",
        key: "19",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Ура, наконец-то избавилась от грибка на ногтях. Благодаря этой клинике и опытному специалисту Марии Валерьевне. Лечение долгое, но эффективное. До прихода сюда не думала, что это возможно.",
        status: "wait",
        date: "",
      },
      {
        id: "12",
        key: "20",
        link: "https://yandex.ru/profile/174310506876234632",
        text: "Мне 25 лет, была травма ногтевой пластины и ноготь так и не вырос. Очень стеснялась этого. Мама отправила на консультацию в клинику подологии. Тут я почувствовала действительно индивидуальный подход, строгий и чёткий план лечения и адекватные цены. Спустя время ноготь восстановился. Я очень этому рада!",
        status: "wait",
        date: "",
      },
    ],
  },
  {
    id: 3,
    name: "Салон красоты 'Центрифуга'",
    tariff: {
      name: "S",
      start: 1673439915,
      end: 1681215915,
      amount: 10,
      price: 3030,
      forOne: 303,
    },
    statuses: {
      all: 14,
      success: 7,
      left: 0,
      wait: 4,
      moderate: 2,
      reject: 1,
      delete: 0,
    },
    reviews: [
      {
        id: "12",
        key: "0",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Сначала только на ноготочки записывалась, а теперь еще и на эпиляцию решилась) я раньше делала, но мне было дико больно, а здесь у мастера рука легкая чтоли)) процедура проходит терпимо))",
        status: "success",
        date: "9.11.2022",
      },
      {
        id: "12",
        key: "1",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Салон мне нравится, только вот летом здесь душновато находиться, надеюсь что в этом году решат эту проблему. В остальном все более чем устраивает.",
        status: "success",
        date: "18.11.2022",
      },
      {
        id: "12",
        key: "2",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Сама тут стригусь и дочурку вожу. Работницы всегда общаются вежливо, находят подход абсолютно ко всем. Делают даже сложные короткие стрижки, я как раз к весне подстриглась по-новому! Достаточно показать фото и стрижку адаптируют под тебя!",
        status: "success",
        date: "23.11.2022",
      },
      {
        id: "12",
        key: "3",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Свои ногти доверяю только Гуле! Выполнит любой дизайн! Очень приятная девушка!",
        status: "success",
        date: "30.11.2022",
      },
      {
        id: "12",
        key: "4",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Больше двух лет посещаю данный салон и надо сказать, что качество услуг ни чуть не ухудшилось, даже наоборот. Приятно смотреть, как они развиваются и не смотря на сложности, становятся лучше. Желаю вам еще больше классных клиентов и процветания в своем деле. Спасибо вам.",
        status: "success",
        date: "01.12.2022",
      },
      {
        id: "12",
        key: "5",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Спасибо за обновленный цвет волос от мастера Ададин! получился такой платиновый блонд, как я давно мечтала!) Отдельное спасибо за рекомендации по уходу!",
        status: "success",
        date: "02.12.2022",
      },
      {
        id: "12",
        key: "6",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Делают качественный маникюр и внимательно следят за стерильностью инструментов – при тебе все достают. Спасибо девочки!",
        status: "reject",
        date: "05.12.2022",
      },
      {
        id: "12",
        key: "7",
        link: "https://yandex.ru/profile/8398451731378",
        text: "В салоне делаю брови, ресницы и эпиляцию. Удивительно, но мне нравятся все мастера в этих направлениях, хотя я та еще привереда. Надеюсь что и дальше будете держать такой высокий уровень качества.",
        status: "reject",
        date: "12.12.2022",
      },
      {
        id: "12",
        key: "8",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Полностью довольна качеством услуг, только вот частенько сложно записаться если хочется спонтанно придти, надо сильно заранее. Но в целом это не страшно, если ходишь регулярно можно и заранее спланировать визит. Тем более если мастера полностью устраивают.",
        status: "moderate",
        date: "15.12.2022",
      },
      {
        id: "12",
        key: "9",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Прихожу сюда каждый месяц на ногти к Ольге. Делает аккуратно, покрытие держится больше месяца. Салон чистенький и стильный. Цены на услуги средние.",
        status: "wait",
        date: "",
      },
      {
        id: "12",
        key: "10",
        link: "https://yandex.ru/profile/8398451731378",
        text: "Давно хожу к Гуле на маникюр и педикюр, все нравится. Все инструменты обязательно стерилизуют, все расходники одноразовые. Безопасность и гигиена для меня превыше всего.",
        status: "wait",
        date: "",
      },
    ],
  },
];

export const demoBrief = [
  {
    id: 1,
    field_1: "Поросячий визг",
    field_2: "сайта нет",
    field_3: "лаконичные, позитивные, можно указать небольшие недостатки",
    field_4: "о работе бара, качестве обслуживания, ассортименте напитков и еды",
    field_5: "Москва",
    field_6: "официанты: Юля, Мария, Татьяна, Дарья. Бармены: Игорь, Сергей, Карина",
    field_7: "расположение в центре города, уютная обстановка, большая алкогольная карта",
    field_8: "маленькое помещение, громкая музыка, иногда официанты тупят)",
    field_9: "https://yandex.ru/profile/8398451731378",
    field_10: "никогда не заказывали",
    field_11: "обслуживание, меню, атмосфера",
    field_12: "",
  },
  {
    id: 2,
    field_1: "Здоровая пятка",
    field_2: "здороваяпятка.рф",
    field_3: "развернутые отзывы с историей лечения от пациента, больше конкретики",
    field_4: "лечение вросшего ногтя, стержневой мозоли, медицинский педикюр, шпора",
    field_5: "Самара",
    field_6: "Главврач - Хрум Арина Варильевна",
    field_7: "удобное расположение, парковка на территории клиники, квалифицированный персонал, чистота в кабинетах и приемной",
    field_8: "Нет",
    field_9: "https://yandex.ru/profile/174310506876234632",
    field_10: "Полгода назад",
    field_11: "Эффективность лечение, профессионализм врача, чистота в клинике",
    field_12: "",
  },
  {
    id: 3,
    field_1: "Центрифуга",
    field_2: "centrifuge.com",
    field_3: "Небольшие, реалистичные, положительные",
    field_4: "Стрижки, окрашивание, маникюр, педикюр, услуги бровиста, эпиляция, услуги косметолога",
    field_5: "Череповец",
    field_6: "можно посмотреть на сайте",
    field_7: "стерильность инструмента, профессиональные колористы, чистота в помещении, индивидуальный подход, премиальные расходники, парикмахеры постоянно повышают квалификацию, сертифицированные косметологи",
    field_8: " клиенты говорят, что у нас иногда душно, плотная запись, нет собственной парковки",
    field_9: "https://yandex.ru/profile/1743105068762346332",
    field_10: "три месяца назад, у вас же",
    field_11: "работа колористов и парикмахеров, качество маникюра, безинъекционная методика омоложение - NanoAsia",
    field_12: "",
  },
];
