import React from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { Button, Input, Form } from "antd";

const Wrapper = styled.div`
  padding: 20px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  h5 {
    margin-bottom: 20px !important;
  }
`;
const StyledInput = styled(Input)`
  border-radius: 10px;
  height: 50px;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 50px;
  background: transparent;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

export const FormChangeClientInfoDemo = () => {
  const [form] = Form.useForm();

  return (
    <Wrapper>
      <Form disabled form={form}>
        <Title level={5} style={{ fontWeight: "800" }}>
          О себе
        </Title>
        <Form.Item name="name">
          <StyledInput placeholder="Имя" defaultValue={"Иван"} title="Имя" />
        </Form.Item>
        <Form.Item name="secondName">
          <StyledInput
            placeholder="Фамилия"
            defaultValue={"Иванов"}
            title="Фамилия"
          />
        </Form.Item>
        <Form.Item name="email">
          <StyledInput
            placeholder="Электронная почта"
            title="email"
            defaultValue={"demo@test.ru"}
          />
        </Form.Item>
        <Form.Item name="phone">
          <StyledInput
            placeholder="Номер телефона"
            defaultValue={123456789}
            title="phone"
          />
        </Form.Item>
        <Form.Item name="tg">
          <StyledInput
            placeholder="Логин телеграм"
            defaultValue={"@demo"}
            title="telegram"
          />
        </Form.Item>
      </Form>
      <StyledButton type="primary" block disabled >
        Изменить
      </StyledButton>
    </Wrapper>
  );
};
