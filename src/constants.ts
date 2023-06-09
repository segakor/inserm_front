import { AreaType, PiecePrice } from "./types";

export const areas = [
  { value: AreaType.YA_MAP, label: "Яндекс карты" },
  { value: AreaType.GOOGLE, label: "Google Карты" },
  { value: AreaType.TWO_GIS, label: "2ГИС" },
  { value: AreaType.AVITO, label: "Aвито" },
  { value: AreaType.FLAMP, label: "Flamp" },
  { value: AreaType.YELL, label: "Yell" },
  { value: AreaType.ZOON, label: "Zoon" },
  { value: AreaType.YA_BRA, label: "Яндекс Браузер" },
];

export const piecePrice: PiecePrice[] = [
  { countRange: [1, 24], price: 650, color: "#2CAE97", title: "1-24 отзыва" },
  {
    countRange: [25, 49],
    price: 590,
    color: "#ECA843",
    title: "25-49 отзывов",
  },
  {
    countRange: [50, 99],
    price: 550,
    color: "#EF5479",
    title: "50-99 отзывов",
  },
  {
    countRange: [100, 199],
    price: 499,
    color: "#7E6DE7",
    title: "100-199 отзывов",
  },
  { countRange: [200], price: 479, color: "#12BDF3", title: "от 200 отзывов" },
];

export const colorCard = [
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
    desc: "Вы можете выбрать один из существующих тарифов и сообщить техподдержке о желаемом распределении отзывов между карточками. Либо, можно оформить индивидуальный тариф, написав нам.",
  },
  {
    title: "На какие сайты распространяется подписка?",
    desc: "Яндекс карты, яндекс маркет (только без выкупа), 2гис, фламп, yell, zoon, авито, яндекс браузер. Количество ресурсов буду постоянно пополняться.",
  },
  {
    title: "Можно ли дать вам свои тексты отзывов?",
    desc: "Да, можно. На стоимость это не повлияет.",
  },
  {
    title: "Как можно оплатить?",
    desc: "Любым удобным способом, в том числе через расчетный счет. Тариф автометически продлится через месяц (автопродление можно отключить в личном кабинете).",
  },
  {
    title: "Как происходит работа?",
    desc: "Сперва вы выбираете тариф и оплачиваете его. В течение 10 минут автоматически создается ваш личный кабинет, доступы придут вам на почту. Вам остается заполнить небольшой бриф в личном кабинете. Далее в течение 1-2 дней мы напишем тексты и начнем работу по вашему проекту.",
  },
  {
    title: "Можно ли изменить ваши тексты?",
    desc: "Да, Вы можете внести правки в тексты, написав в техподдержку.",
  },
];

export const noop = () => {};

export const formIds = [
  "96267607a9857ae",
  "b93d944a83a9ac1",
  "f334a093ff4dbfa",
]; //NOTE: для тарифов с подпиской

export const optionsWithDisabled = [
  { label: "Активные", value: true },
  { label: "Архивные", value: false },
];

export const optionTypeProject = [
  { label: "Проекты", value: "project" },
  { label: "Проекты штучные", value: "campaign" },
];