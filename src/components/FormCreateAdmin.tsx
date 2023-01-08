import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "./Typography";
import { Button, Input, Form, Select } from "antd";
import { useCreateAdmin } from "../hooks/useCreateAdmin";

const Wrapper = styled.div`
  padding: 20px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  width: 420px;
  margin-bottom: 50px;
  h5 {
    margin-bottom: 20px !important;
  }
`;
const StyledInput = styled(Input)`
  border-radius: 10px;
  height: 50px;
`;
const StyledSelect = styled(Select) <{ disabled: boolean }>`
  border-radius: 10px;
  height: 50px;
  border: 1px solid #d9d9d9;
  background: ${(props) => (props.disabled ? "#f5f5f5" : "")};
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

export const FormCreateAdmin = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isErrorValues, setIsErrorValues] = useState(true);

  const [form] = Form.useForm();

  const { handleCreateAdmin } = useCreateAdmin();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSumbit = async () => {
    const rows = (await form.validateFields());
    handleCreateAdmin({ ...rows }).then(() => {
      onResetSubmitEdit();
    });
  };

  const onResetSubmitEdit = () => {
    setIsEdit(!isEdit);
    form.resetFields();
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsErrorValues(hasErrors);
  };

  return (
    <Wrapper>
      <Form disabled={!isEdit} form={form} onFieldsChange={handleFormChange}>
        <Title level={5} style={{ fontWeight: "800" }}>
          Создание нового профиля
        </Title>
        <Form.Item name="role" rules={[
          {
            required: true,
            message: "Обязательное поле",
          },
        ]}>
          <StyledSelect
            disabled={!isEdit}
            bordered={false}
            placeholder={"Роль"}
          >
            <Select.Option value="host">Размещатель</Select.Option>
            <Select.Option value="supervisor">
              Руководитель проектов
            </Select.Option>
            <Select.Option value="support">Техподдержка</Select.Option>
          </StyledSelect>
        </Form.Item>
        <Form.Item name="firstName">
          <StyledInput placeholder="Имя" title="Имя" />
        </Form.Item>
        <Form.Item name="lastName">
          <StyledInput placeholder="Фамилия" title="Фамилия" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Обазятальное поле',
            },
          ]}
        >
          <StyledInput
            placeholder="Электронная почта"
            title="Электронная почта"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledInput placeholder="Пароль" title="Пароль" />
        </Form.Item>
      </Form>
      {isEdit && (
        <ButtonWrapper>
          <StyledButton type="primary" block onClick={onSumbit} disabled={isErrorValues}>
            Сохранить
          </StyledButton>
          <StyledButton type="primary" block onClick={onResetSubmitEdit}>
            Отменить
          </StyledButton>
        </ButtonWrapper>
      )}
      {!isEdit && (
        <StyledButton type="primary" block onClick={handleEdit}>
          Создать админа
        </StyledButton>
      )}
    </Wrapper>
  );
};
