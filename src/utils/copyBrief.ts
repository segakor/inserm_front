import { Brief } from "../types";

type BriefCopy = Omit<Brief, "id"> & {
  clField: { text: string }[];
};

export const copyBrief = (value: BriefCopy) => {
  return `Укажите название проекта:\n${value.field_1}\n\nСсылка на ваш сайт\n${
    value.field_2
  }\n\nПожелания к текстам отзывов\n${
    value.field_3
  }\n\nПо каким направлениям деятельности нужны отзывы (о каких товарах / услугах писать):\n${
    value.field_4
  }\n\nВ каких городах происходит реализация ваших товаров/услуг:\n${
    value.field_5
  }\n\nИмена сотрудников и их обязанности (чтобы мы могли отметить их хорошую работу):\n${
    value.field_6
  }\n\nОпишите преимущества вашей компании:\n${
    value.field_7
  }\n\nОпишите недостатки вашей компании:\n${
    value.field_8
  }\n\nСсылки на профили вашей компании, где необходимо размещать отзывы:\n${
    value.field_9
  }\n\nКогда вы заказывали отзывы в последний раз/когда последний раз публиковались заказные отзывы на вышеперечисленных площадках?\n${
    value.field_10
  }\n\nКакие моменты следует обязательно отметить в отзывах:\n${
    value.field_11
  }\n\nЕсли в брифе изменения, вы можете указать их тут:\n${value.clField
    .map((item) => item.text)
    .join(", ")}\n\n`;
};
