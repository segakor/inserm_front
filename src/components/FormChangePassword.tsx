import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "./Typography";
import { Button, Input, Form } from "antd";
import { useChangePassword } from "../hooks/useChangePassword";

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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 20px;
`;

export const FormChangePassword = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [disabledSave, setDisabledSave] = useState(true);

  const { handleChangePassword } = useChangePassword();

  const [form] = Form.useForm();
  const oldPassword = Form.useWatch("currentPas", form);
  const newPassword = Form.useWatch("newPas", form);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSumbit = () => {
    handleChangePassword({
      oldPassword,
      newPassword,
    }).then(() => {
      setIsEdit(!isEdit);
      form.resetFields();
    });
  };

  const onResetSubmit = () => {
    setIsEdit(!isEdit);
    form.resetFields();
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };

  return (
    <Wrapper>
      <Form disabled={!isEdit} form={form} onFieldsChange={handleFormChange}>
        <Title level={5} style={{ fontWeight: "800" }}>
          Изменение пароля
        </Title>
        <Form.Item
          name="currentPas"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledInput placeholder="Текущий пароль" />
        </Form.Item>
        <Form.Item
          name="newPas"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledInput placeholder="Новый пароль" />
        </Form.Item>
        <Form.Item
          name="repeatNewPas"
          rules={[
            {
              validator: (_, value) => {
                if (value === newPassword) {
                  return Promise.resolve();
                } else {
                  if (!value) {
                    return Promise.reject("Обязательное поле");
                  }
                  return Promise.reject("Пароли не совпадают");
                }
              },
            },
          ]}
        >
          <StyledInput placeholder="Повторите новый пароль" />
        </Form.Item>
      </Form>
      {isEdit && (
        <ButtonWrapper>
          <StyledButton
            type="primary"
            block
            onClick={onSumbit}
            disabled={disabledSave}
          >
            Сохранить
          </StyledButton>
          <StyledButton type="primary" block onClick={onResetSubmit}>
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
