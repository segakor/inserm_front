import styled from "styled-components";
import { Title } from "../../common/Typography";
import { Button, Input, Form, Select } from "antd";
import { PartnerPayment } from "../../types";

const Wrapper = styled.div`
  padding: 20px 30px;
  border-radius: 10px;
  background-color: #ffffff;
  width: 810px;
  .ant-form-item {
    margin: 0;
  }
  @media (max-width: 768px) {
    width: auto;
    .ant-form-item {
      margin: 0;
      margin-bottom: 12px;
    }
  }
`;

const Header = styled(Title)`
  font-size: 18px !important;
  margin-bottom: 12px !important;
`;

const FooterButton = styled(Button)`
  background: #1579e9;
  border-radius: 10px;
  height: 50px;
  min-width: 360px;
  @media (max-width: 1200px) {
    width: 100%;
    min-width: auto;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 10px;
  height: 50px;
  border: 1px solid #888888;
  width: 360px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledSelect = styled(Select)`
  border-radius: 10px;
  height: 50px;
  border: 1px solid #888888;
  min-width: 360px;
  .ant-select-selector {
    margin-top: 7px;
    font-size: 16px;
  }
  &.ant-select-disabled {
    border-color: #d9d9d9;
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const WrapperItem = styled.div`
  display: flex;
  width: auto;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 15px;
  @media (max-width: 768px) {
    display: block;
  }
`;

type Props = {
  onCreatePartnerPayment?: (value: PartnerPayment) => void;
  isLoading: boolean;
  partnerPayment: PartnerPayment | null;
  readOnly?: boolean;
};

export const FormPartnerPayment = ({
  onCreatePartnerPayment,
  isLoading,
  partnerPayment,
  readOnly,
}: Props) => {
  const [form] = Form.useForm();

  const type = Form.useWatch("type", form) as
    | "individualPerson"
    | "legalPerson";

  const onFinish = async (values: any) => {
    onCreatePartnerPayment && onCreatePartnerPayment(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const initilaValue = partnerPayment?.type
    ? partnerPayment
    : { type: "individualPerson" };

  return (
    <Wrapper>
      {!readOnly && <Header level={5}>Форма для вывода ДС</Header>}
      <Form
        form={form}
        initialValues={initilaValue}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        disabled={isLoading || readOnly}
        layout={"vertical"}
      >
        <WrapperItem>
          <Form.Item name="type">
            <StyledSelect bordered={false} placeholder={"Ваш статус"}>
              <Select.Option value="individualPerson">
                Физическое лицо
              </Select.Option>
              <Select.Option value="legalPerson">
                Юридическое лицо
              </Select.Option>
            </StyledSelect>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput placeholder="ФИО" />
          </Form.Item>
          {type === "legalPerson" && (
            <Form.Item
              name="company"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <StyledInput placeholder="Полное наименование организации" />
            </Form.Item>
          )}
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput
              placeholder={
                type === "individualPerson" ? "Адрес" : "Юридический адрес"
              }
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput placeholder="Электронная почта" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput placeholder="Телефон" />
          </Form.Item>
          {type === "legalPerson" && (
            <Form.Item
              name="inn"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <StyledInput placeholder="ИНН" />
            </Form.Item>
          )}
          {type === "legalPerson" && (
            <Form.Item
              name="ogrn"
              rules={[
                {
                  required: true,
                  message: "Обязательное поле",
                },
              ]}
            >
              <StyledInput placeholder="ОГРН" />
            </Form.Item>
          )}
          <Form.Item
            name="bic"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput placeholder="БИК банка" />
          </Form.Item>
          <Form.Item
            name="rs"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput placeholder="Реквизиты счета" />
          </Form.Item>
          <Form.Item
            name="ks"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput placeholder="К/С" />
          </Form.Item>
          <Form.Item
            name="bank_inn"
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledInput placeholder="ИНН Банка" />
          </Form.Item>
          {!readOnly && (
            <FooterButton htmlType="submit">
              <div style={{ color: "white" }}>Сохранить</div>
            </FooterButton>
          )}
        </WrapperItem>
      </Form>
    </Wrapper>
  );
};
