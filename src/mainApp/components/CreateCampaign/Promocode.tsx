import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  Space,
  Alert,
  Select,
} from "antd";
import { PromoCard, PromoWrapper, StyledTitle } from "./styles";
import { usePromo } from "../../hooks/usePromo";
import { areas } from "../../../constants";
import { getNumWord } from "../../../utils";
import { useEffect } from "react";
import { getPromoResult } from "../../../utils";

type Props = {
  form: FormInstance;
  count: number;
  email: string;
};

export const Promocode = ({ form, count, email }: Props) => {
  const { handleCheckPromo, resultCode, giftCount } = usePromo();

  const formValue = Form.useWatch([], form);

  const onCheckPromo = () => {
    handleCheckPromo({ email, name: formValue?.promoCode, count });
  };

  const alertText = getPromoResult(resultCode || "");

  const completedPromo = resultCode === "success";

  useEffect(() => {
    form.setFieldValue("giftCount", giftCount);
  }, [giftCount]);

  useEffect(() => {
    if (giftCount) onCheckPromo();
  }, [count, giftCount]);

  return (
    <>
      <StyledTitle level={5}>Промокод</StyledTitle>
      <p>Введите промокод, если у вас он есть</p>
      <PromoWrapper>
        <Form.Item name={"promoCode"}>
          <Space.Compact style={{ width: "100%" }} size="large">
            <Input placeholder="Промокод" disabled={!!giftCount} />
            {!giftCount && (
              <Button
                type="primary"
                onClick={onCheckPromo}
                disabled={!formValue?.promoCode || completedPromo}
              >
                Применить
              </Button>
            )}
          </Space.Compact>
        </Form.Item>
        {resultCode && (
          <Alert
            style={{ marginTop: "16px" }}
            message={alertText?.message}
            type={(alertText?.type as any) || "error"}
            showIcon
          />
        )}
      </PromoWrapper>
      {resultCode === "success" && (
        <>
          <Divider />
          <StyledTitle level={5}>
            Выберите нужную площадку для размещения отзывов
          </StyledTitle>
          <p>Подарочные отзывы доступны только для одной площадки</p>
          <PromoCard>
            <Space.Compact size="large" style={{ width: "100%" }}>
              <Form.Item
                name={"promoAreaType"}
                style={{ width: "25%" }}
                rules={[{ required: true, message: "Обязательное поле" }]}
              >
                <Select options={areas} placeholder={"Площадка"} />
              </Form.Item>
              <Form.Item
                name={"promoLink"}
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Обязательное поле" }]}
              >
                <Input placeholder="Ссылка на карточку" />
              </Form.Item>
              <Form.Item style={{ width: "30%" }}>
                <Input
                  placeholder="Кол-во отзывов"
                  defaultValue={`${giftCount} ${getNumWord(
                    giftCount,
                    "review"
                  )} в подарок`}
                  disabled
                />
              </Form.Item>
              <Form.Item hidden name={"giftCount"}></Form.Item>
            </Space.Compact>
          </PromoCard>
        </>
      )}
      <Divider />
    </>
  );
};
