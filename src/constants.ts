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
  { countRange: [1, 24], price: 600, color: "#2CAE97", title: "1-24 отзыва" },
  {
    countRange: [25, 49],
    price: 550,
    color: "#ECA843",
    title: "25-49 отзывов",
  },
  {
    countRange: [50, 99],
    price: 519,
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
