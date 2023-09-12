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
  { id: 1, color: "#2CAE97", title: "2-24 отзыва" },
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

export const optionsWithDisabled = [
  { label: "Активные", value: true },
  { label: "Архивные", value: false },
];

export const optionTypeProject = [
  { label: "Проекты", value: "project" },
  { label: "Проекты штучные", value: "campaign" },
];

export const confirmationText = {
  autoPay:
    "Вы уверены, что хотите отключить автопродление? Обратите внимание,деньги за новый период не спишутся, пока все отзывы не будут опубликованы. Если отключить автоплатеж, то после завершения публикации отзывов работа приостановится.",
  archiveProject: "При архивации проекта, подписка будет отменена. Вы уверены?",
  brief: "Все несохраненные данные будут утеряны",
  removeCampaign:
    " Вы точно хотите удалить проект? Восстановить его обратно не получится.",
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
};

export const adminRoleList = ["HOST", "SUPERVISOR", "SUPPORT", "ADMIN"];
