import { Form, Tooltip, Divider, Checkbox } from "antd";
import { Title } from "../../../common/Typography";
import { getNumWord } from "../../../utils";
import {
  FooterCardAmount,
  FooterWrapper,
  FooterCardPrice,
  FooterCardTime,
  FooterCardTotalPrice,
  FooterButton,
  Agreement,
} from "./styles";
import { useEffect, useState } from "react";
import { noop } from "../../../constants";
import { InvoiceTemplate } from "../../../types";
import { Link, useNavigate } from "react-router-dom";
import { ModalTemplate } from "../Modal";
import { GiftOutlined } from "@ant-design/icons";

type Props = {
  count: number;
  priceForOne: number;
  month: number;
  isLoading: boolean;
  isCashless?: boolean;
  invoiceTemplate: InvoiceTemplate | null;
  isErrorForm: boolean;
  giftCount?: number;
};

export const Footer = ({
  count,
  priceForOne,
  month,
  isLoading,
  isCashless,
  invoiceTemplate,
  isErrorForm,
  giftCount,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(true);

  const navigation = useNavigate();

  const onModalOpen = () => {
    if (!isErrorForm) {
      setIsModalOpen(true);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    navigation("/");
  };

  useEffect(() => {
    if (isErrorForm) {
      setIsModalOpen(false);
    }
  }, [isErrorForm]);

  return (
    <>
      <Divider />
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
              {count} {getNumWord(count, "review")}{" "}
              {giftCount && (
                <>+
                  ({giftCount}{' '}
                  <GiftOutlined />)
                </>
              )}
            </Title>
          </FooterCardTotalPrice>
          <Tooltip
            title={count < 3 ? "Минимальный заказ - 3 отзыва" : ""}
            placement="top"
            color={"red"}
          >
            <FooterButton
              htmlType={"submit"}
              loading={isLoading}
              disabled={count < 3 || !isAgree}
              onClick={isCashless ? onModalOpen : noop}
            >
              <Title level={5} style={{ color: "white" }}>
                {!isCashless ? "Оплатить" : "Получить счет"}
              </Title>
            </FooterButton>
          </Tooltip>
        </FooterWrapper>
        <Agreement>
          <Checkbox
            style={{ marginRight: "10px" }}
            checked={isAgree}
            onChange={() => setIsAgree((prev) => !prev)}
          />
          <label>
            Нажимая на кнопку, вы соглашаетесь с{" "}
            <Link className="decorate" to="/offer.docx" target="_blank">
              Офертой
            </Link>{" "}
            и{" "}
            <Link className="decorate" to="/privacyPolicy.odt" target="_blank">
              Политикой конфиденциальности
            </Link>
          </label>
        </Agreement>
      </Form.Item>
      {isModalOpen && (
        <ModalTemplate
          onClose={onModalClose}
          invoiceTemplate={invoiceTemplate}
          type={"payment"}
        />
      )}
    </>
  );
};
