import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "./Typography";
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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 20px;
`;

export const FormChangeClientInfo = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [form] = Form.useForm();
  const name = Form.useWatch("name", form);
  const secondName = Form.useWatch("secondName", form);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSumbit = () => {
    console.log(name, secondName);
  };

  const onResetSubmitEdit = () => {
    setIsEdit(!isEdit);
    form.resetFields();
  };

  return (
    <Wrapper>
      <Form disabled={!isEdit} form={form}>
        <Title level={5} style={{ fontWeight: "800" }}>
          О себе
        </Title>
        <Form.Item name="name">
          <StyledInput placeholder="Имя" defaultValue={"Sergey"} />
        </Form.Item>
        <Form.Item name="secondName">
          <StyledInput placeholder="Фамилия" />
        </Form.Item>
        <Form.Item name="email">
          <StyledInput placeholder="Электронная почта" />
        </Form.Item>
        <Form.Item name="phone">
          <StyledInput placeholder="Номер телефона" />
        </Form.Item>
        <Form.Item name="telegram">
          <StyledInput placeholder="Логин телеграм" />
        </Form.Item>
      </Form>
      {isEdit && (
        <ButtonWrapper>
          <StyledButton type="primary" block onClick={onSumbit}>
            Сохранить
          </StyledButton>
          <StyledButton type="primary" block onClick={onResetSubmitEdit}>
            Отменить
          </StyledButton>
        </ButtonWrapper>
      )}
      {!isEdit && (
        <StyledButton type="primary" block onClick={handleEdit}>
          Изменить
        </StyledButton>
      )}
    </Wrapper>
  );
};
