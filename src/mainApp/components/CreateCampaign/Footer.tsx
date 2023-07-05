import { Form, Tooltip } from "antd";
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
  priceForOne: number;
  month: number;
  isLoading: boolean;
};

export const Footer = ({ count, priceForOne, month, isLoading }: Props) => {
  return (
    <Form.Item>
      <FooterWrapper>
        <FooterCardAmount>
          <Title level={5} style={{ color: "white", fontSize: 10 }}>
            Итоговая стоимость
          </Title>
          <Title level={5} style={{ color: "white" }}>
            {(priceForOne * count).toLocaleString()} руб.
          </Title>
        </FooterCardAmount>
        <FooterCardPrice>
          <Title level={5} style={{ color: "white", fontSize: 10 }}>
            Цена за 1 шт.
          </Title>
          <Title level={5} style={{ color: "white" }}>
            {priceForOne} руб.
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
        <Tooltip title={count < 2 ? "Минимальный заказ - 2 отзыва" : ""} placement="bottom" color={'red'}>
          <FooterButton
            htmlType="submit"
            loading={isLoading}
            disabled={count < 2}
          >
            <Title level={5} style={{ color: "white" }}>
              Оплатить
            </Title>
          </FooterButton>
        </Tooltip>
      </FooterWrapper>
    </Form.Item>
  );
};
