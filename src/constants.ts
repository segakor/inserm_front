import { AreaType } from "./types";

export const areas = [
  { value: AreaType.YA_MAP, label: "Яндекс карты" },
  { value: AreaType.GOOGLE, label: "Google Карты" },
  { value: AreaType.TWO_GIS, label: "2ГИС" },
  { value: AreaType.FLAMP, label: "Flamp" },
  { value: AreaType.YELL, label: "Yell" },
  { value: AreaType.ZOON, label: "Zoon" },
  { value: AreaType.YA_BRA, label: "Яндекс Браузер" },
];

export const colorCardCampaign = [
  { id: 1, color: "#2CAE97", title: "4-24 отзыва" },
  { id: 2, color: "#ECA843", title: "25-49 отзывов" },
  { id: 3, color: "#EF5479", title: "50-99 отзывов" },
  { id: 4, color: "#7E6DE7", title: "100-199 отзывов" },
  { id: 5, color: "#12BDF3", title: "от 200 отзывов" },
];

export const colorCardProject = [
  { tariffName: "S", color: "#2CAE97" },
  { tariffName: "M", color: "#ECA843" },
  { tariffName: "L", color: "#EF5479" },
];

export const briefField = {
  mainField: [
    { name: "field_1", label: "Укажите название проекта:" },
    { name: "field_2", label: "Ссылка на ваш сайт:" },
    { name: "field_3", label: "Пожелания к текстам отзывов:" },
    {
      name: "field_4",
      label:
        "По каким направлениям деятельности нужны отзывы (о каких товарах / услугах писать):",
    },
    {
      name: "field_5",
      label: "В каких городах происходит реализация ваших товаров/услуг:",
    },
    {
      name: "field_6",
      label:
        "Имена сотрудников и их обязанности (чтобы мы могли отметить их хорошую работу):",
    },
    { name: "field_7", label: "Опишите преимущества вашей компании:" },
    { name: "field_8", label: "Опишите недостатки вашей компании:" },
    {
      name: "field_9",
      label:
        "Ссылки на профили вашей компании, где необходимо размещать отзывы:",
      canHide: true,
    },
    {
      name: "field_10",
      label:
        "Когда вы заказывали отзывы в последний раз/когда последний раз публиковались заказные отзывы на вышеперечисленных площадках?:",
    },
    {
      name: "field_11",
      label: "Какие моменты следует обязательно отметить в отзывах:",
    },
  ],
  additionalField: [
    {
      name: "field_12",
      label: "Если в брифе изменения, вы можете указать их тут:",
    },
  ],
};

export const textFoundation = [
  {
    title: "А что, если у меня более 1 карточки на разных площадках?",
    desc: "Вы можете выбрать любое желаемое распределение на каждую карточку компании, заказав отзывы через поштучный тариф.",
  },
  {
    title: "На какие сайты распространяется подписка?",
    desc: "Яндекс карты, 2гис, google карты, фламп, yell, zoon, яндекс браузер. Количество ресурсов будет постоянно пополняться.",
  },
  {
    title: "Можно ли дать вам свои тексты отзывов?",
    desc: "Да, можно. На стоимость это не повлияет.",
  },
  {
    title: "Как можно оплатить?",
    desc: "На данный момент можно оплатить по карте, сбп, Yandex Pay и МТС Pay, а так же по безналичной оплате по счету.",
  },
  {
    title: "Как происходит работа?",
    desc: "Сперва вы выбираете тариф и оплачиваете его. Вам остается заполнить небольшой бриф в личном кабинете. Далее в течение 1-2 дней мы напишем тексты и начнем работу по вашему проекту.",
  },
  {
    title: "Можно ли изменить ваши тексты?",
    desc: "Да, Вы можете внести правки в тексты, написав в техподдержку.",
  },
];

export const noop = () => {};

export const optionsStatusProject = [
  { label: "Активные", value: true },
  { label: "Архивные", value: false },
];

export const optionsTypeProject = [
  { label: "Проекты штучные", value: "campaign" },
  { label: "Проекты", value: "project" },
];

export const confirmationText = {
  autoPay:
    "Вы уверены, что хотите отключить автопродление? Обратите внимание, деньги за новый период не спишутся, пока все отзывы не будут опубликованы. Если отключить автоплатеж, то после завершения публикации отзывов работа приостановится.",
  archiveProject: "При архивации проекта, подписка будет отменена. Вы уверены?",
  brief: "Все несохраненные данные будут утеряны",
  removeCampaign:
    "Вы точно хотите удалить проект? Восстановить его обратно не получится.",
  removedArchived: "Вы уверены, что хотите удалить последнее продление?",
  archiveProjectClient: "Вы уверены, что хотите архивировать проект?",
};

export const optionsSort = [
  { value: "asc", label: "По возрастанию" },
  { value: "desc", label: "По убыванию" },
];

export const optionsKey = [
  { value: "success", label: "Опубликовано" },
  { value: "left", label: "Осталось" },
  { value: "moderate", label: "На модерации" },
  { value: "reject", label: "Не прошло" },
  { value: "delete", label: "Удалено" },
  { value: "all", label: "Всего" },
  { value: "id", label: "id" },
];

export const templateModal = {
  titleModalPayment:
    "Вы можете скачать и оплатить счет. После успешной оплаты, в течение 1-2 рабочих дней на вашем аккаунте будет создан проект и мы возьмем его в работу. В случае возникновения проблем вы можете написать нам на почту info@inserm.ru",
  titleModalAct: "Акт выполненных работ",
  loadAct: "Загружаем акт выполненных работ",
  loadPayment: "Загружаем счет на оплату",
};

export const adminRoleList = ["HOST", "SUPERVISOR", "SUPPORT", "ADMIN"];

export const optionsCreateProject = [
  { label: "Оплата поштучно", value: "piece" },
  { label: "Оплата помесячно", value: "month" },
];

export const promoCodeResult = [
  { code: "success", message: "Промокод успешно применен", type: "success" },
  { code: "promo_not_found", message: "Промокод не найден", type: "error" },
  {
    code: "promo_has_expired",
    message: "Истек срок действия промокода",
    type: "error",
  },
  {
    code: "not_enough_reviews_in_the_order",
    message: "Не выполнены обязательные условия. Минимальный заказ от min шт.",
    type: "error",
  },
  {
    code: "promo_has_already_been_used",
    message: "Вы уже использовали этот промокод",
    type: "error",
  },
  {
    code: "promo_is_archived",
    message: "Промокод находится в архиве",
    type: "error",
  },
];

export const optionsReferral = [
  { value: "getLink", label: "Реферальная ссылка" },
  { value: "paymentStatistics", label: "Статистика по оплатам" },
  { value: "exportMoney", label: "Вывод ДС" },
];

export const optionsClientBase = [
  { label: "Все клиенты", value: "allClient" },
  { label: "Заявки безнала", value: "cashless" },
  { label: "Неоплаченные заявки", value: "warmClient" },
  { label: "Идеи", value: "idea" },
];

export const optionsPromo = [
  { value: "promo", label: "Промокоды" },
  { value: "promoStatistics", label: "Статистика" },
];

export const optionsStatistics = [
  { value: "host", label: "Выкладка" },
  { value: "finance", label: "Финансы" },
];
export const optionsRefferal = [
  { value: "base", label: "Общая база рефералов" },
  { value: "conclusion", label: "Запросы на вывод ДС" },
];

export const localeLogin = {
  clientRegistration: [
    {
      type: "login",
      formTitle: "Войдите в свой личный кабинет",
      submitTitle: "Войти",
    },
    {
      type: "restore",
      formTitle: "Восстановление пароля",
      submitTitle: "Отправить",
    },
    {
      type: "registration",
      formTitle: "Регистрация",
      submitTitle: "Зарегистрироваться",
    },
  ],
  partnerRegistration: [
    {
      type: "login",
      formTitle: "Войдите в свой личный кабинет как партнер",
      submitTitle: "Войти",
    },
    {
      type: "restore",
      formTitle: "Восстановление пароля",
      submitTitle: "Отправить",
    },
    {
      type: "registration",
      formTitle: "Регистрация в партнерской программе",
      submitTitle: "Зарегистрироваться",
    },
  ],
};

export const newsMonth = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const bannerText = [
  "<b>Техподдержка доступна</b> на каждом этапе и всегда готова вам помочь",
  "Оплатить можно по <b>карте</b> (эквайринг) или по <b>счету</b>",
  "<b>Гарантия</b> на каждый опубликованный отзыв (если удалят - заменим на новый)",
  "Стандартная периодичичность публикации текстов - <b>1-3 отзыва в неделю</b>. Это оптимальное количество выкладки, которое позволяет нам избежать проблем с модерацией",
  "По вашему запросу мы можем <b>отдавать их чаще или реже</b>. При необходимости, напишите об этом в техподдержку или укажите в брифе после оплаты",
  "<b>Схема работы</b>: Создание и оплата проекта - заполнение брифа в личном кабинете - мы пишем тексты (2 рабочих дня) - публикуем их - вы видите всю статистику онлайн",
  "Чтобы <b>совершить заказ</b>, заполните все поля ниже",
];

export const contacts = {
  tg: "https://t.me/helpotziv",
  whatsup: "https://api.whatsapp.com/send?phone=79107775066",
};

export const statusReviews = [
  {
    status: "success",
    label: "Опубликовано",
  },
  {
    status: "moderate",
    label: "На модерации",
  },
  {
    status: "delete",
    label: "Удалено",
  },
  {
    status: "reject",
    label: "Не прошло",
  },
  {
    status: "wait",
    label: "В очереди",
  },
];

export const statusRemovedReviews = [
  {
    status: "not",
    label: "Сообщить об удалении отзыва",
    color: "",
    desc: "Нажимая на эту кнопку вы подтверждаете, что данный отзыв удален с данного профиля компании на соответствующем ресурсе",
  },
  {
    status: "wait",
    label: "Заявка на рассмотрении",
    color: "#FFD600",
    desc: "Мы проверяем наличие отзыва на картах, ожидайте",
  },
  {
    status: "rejected",
    label: "Отзыв опубликован",
    color: "#FF1E1E",
    desc: "Мы подтверждаем наличие данного текста на картах в момент проверки",
  },
  {
    status: "approved",
    label: "Принято",
    color: "#1BBD3F",
  },
];
