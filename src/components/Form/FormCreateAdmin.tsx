import React, { useState } from "react";
import styled from "styled-components";
import { Title } from "../Typography";
import { Button, Input, Form, Select } from "antd";
import { useCreateAdmin } from "../../hooks/useCreateAdmin";
import { useUpdateAdmin } from "../../hooks/useUpdateAdmin";

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
  @media (max-width: 768px) {
    width: auto;
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

type Props = {
  editMode?: boolean;
  id?: number;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
};

export const FormCreateAdmin = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isErrorValues, setIsErrorValues] = useState(true);

  const [form] = Form.useForm();

  const { handleCreateAdmin } = useCreateAdmin();
  const { handleUpdateAdmin } = useUpdateAdmin();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSumbit = async () => {
    const rows = await form.validateFields();
    !props.editMode
      ? handleCreateAdmin({ ...rows }).then(() => {
        onResetSubmitEdit();
      })
      : handleUpdateAdmin({ ...rows });
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
      <Form
        disabled={!props.editMode ? !isEdit : false}
        form={form}
        initialValues={props}
        onFieldsChange={handleFormChange}
      >
        <Title level={5} style={{ fontWeight: "800" }}>
          {!props.editMode
            ? "Создание нового профиля"
            : "Редактирование профиля"}
        </Title>
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledSelect
            disabled={!props.editMode ? !isEdit : false}
            bordered={false}
            placeholder={"Роль"}
            value={
              props.role === "HOST"
                ? "Размещатель"
                : props.role === "SUPERVISOR"
                  ? "Руководитель проектов"
                  : "Техподдержка"
            }
          >
            <Select.Option value="HOST">Размещатель</Select.Option>
            <Select.Option value="SUPERVISOR">
              Руководитель проектов
            </Select.Option>
            <Select.Option value="SUPPORT">Техподдержка</Select.Option>
          </StyledSelect>
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledInput placeholder="Имя" title="Имя" />
        </Form.Item>
        <Form.Item
          name="id"
          hidden
        >
          <StyledInput placeholder="id" title="id" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledInput placeholder="Фамилия" title="Фамилия" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Обазятальное поле",
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
      {isEdit && !props.editMode && (
        <ButtonWrapper>
          <StyledButton
            type="primary"
            block
            onClick={onSumbit}
            disabled={isErrorValues}
          >
            Сохранить
          </StyledButton>
          <StyledButton type="primary" block onClick={onResetSubmitEdit}>
            Отменить
          </StyledButton>
        </ButtonWrapper>
      )}
      {!isEdit && !props.editMode && (
        <StyledButton type="primary" block onClick={handleEdit}>
          Создать админа
        </StyledButton>
      )}
      {props.editMode && (
        <ButtonWrapper>
          <StyledButton type="primary" block onClick={onSumbit}>
            Сохранить
          </StyledButton>
          <Button
            type="primary"
            block
            style={{
              background: " #313131",
              height: "50px",
              borderRadius: "10px",
            }}
          >
            Удалить
          </Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};
