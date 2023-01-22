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
const StyledInput = styled(Input.Password)`
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

export const FormChangePasswordDemo = () => {
  const [form] = Form.useForm();

  return (
    <Wrapper>
      <Form disabled form={form}>
        <Title level={5} style={{ fontWeight: "800" }}>
          Изменение пароля
        </Title>
        <Form.Item>
          <StyledInput placeholder="Текущий пароль" />
        </Form.Item>
        <Form.Item>
          <StyledInput placeholder="Новый пароль" />
        </Form.Item>
        <Form.Item>
          <StyledInput placeholder="Повторите новый пароль" />
        </Form.Item>
      </Form>
      <StyledButton type="primary" block disabled>
        Изменить
      </StyledButton>
    </Wrapper>
  );
};
