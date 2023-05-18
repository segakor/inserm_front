import { Title } from "../../../common/Typography";
import { getNumWord } from "../../../utils/getCountReviews";
import {
  FooterCardAmount,
  FooterWrapper,
  FooterCardPrice,
  FooterCardTime,
  FooterCardTotalPrice,
  FooterButton,
} from "./styles";

type Props = {
  count: number;
  price: number;
  month: number;
};

export const Footer = ({ count, price, month }: Props) => {
  return (
    <FooterWrapper>
      <FooterCardAmount>
        <Title level={5} style={{ color: "white", fontSize: 10 }}>
          Итоговая стоимость
        </Title>
        <Title level={5} style={{ color: "white" }}>
          {price * count} руб.
        </Title>
      </FooterCardAmount>
      <FooterCardPrice>
        <Title level={5} style={{ color: "white", fontSize: 10 }}>
          Цена за 1 шт.
        </Title>
        <Title level={5} style={{ color: "white" }}>
          {price} руб.
        </Title>
      </FooterCardPrice>
      <FooterCardTime>
        <Title level={5} style={{ color: "black", fontSize: 10 }}>
          Время выполнения
        </Title>
        <Title level={5} style={{ color: "black" }}>
          ~ {month} {getNumWord(month, "month")}
        </Title>
      </FooterCardTime>
      <FooterCardTotalPrice>
        <Title level={5} style={{ color: "black", fontSize: 10 }}>
          Итого
        </Title>
        <Title level={5} style={{ color: "black" }}>
          {count} {getNumWord(count, "review")}
        </Title>
      </FooterCardTotalPrice>
      <FooterButton htmlType="submit">
        <Title level={5} style={{ color: "white" }}>
          Оплатить
        </Title>
      </FooterButton>
    </FooterWrapper>
  );
};
