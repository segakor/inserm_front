import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { Title } from "./Typography";
import { useAuth } from '../hooks/useAuth';

const Wrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px 20px 0px 20px;
  width: auto;
  height: auto;
  @media (min-width: 768px) {
    padding: 40px 40px 20px 40px;
    width: 520px;
    height: 400px;
  }
`;
const StyledInput = styled(Input)`
  border-radius: 10px;
  height: 50px;
`;
const StyledInputPassword = styled(Input.Password)`
  border-radius: 10px;
  height: 50px;
`;
const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 50px;
`;
const SubTitle = styled.div`
  width: fit-content; 
  color: #8e8e8e;
  text-decoration-line: underline;
  cursor: pointer;
  margin-bottom: 40px;
`;
const HeaderForm = styled(Title)`
  margin-bottom: 40px !important;
`;
const DescRestore = styled(Title)`
  margin-bottom: 30px !important;
`;

export const LoginForm = () => {
  const [form] = Form.useForm();
  const email = Form.useWatch("username", form);
  const password = Form.useWatch("password", form);

  const [isRestore, setIsRestore] = useState(false);

  const { handleLogin } = useAuth();

  const buttonName = !isRestore ? "Войти" : "Отправить";

  const onSubmit = () => {
    if (!isRestore) {
      handleLogin({ email, password })
    } else {
      form.setFieldsValue({ password: "" });
      alert('handleRestore')
    }
  };

  const isDisableBtn =
    email && password && !isRestore
      ? false
      : email && isRestore
        ? false
        : true;

  return (
    <>
      <Wrapper>
        <HeaderForm level={3} style={{ fontWeight: "800" }}>
          {!isRestore
            ? "Войдите в свой личный кабинет"
            : "Восстановление пароля"}
        </HeaderForm>
        <StyledForm
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="on"
          form={form}
        >
          {!isRestore && (
            <>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите адрес электронной почты!",
                  },
                ]}
              >
                <StyledInput placeholder="Электронная почта" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Пожалуйста, введите пароль!" },
                ]}
              >
                <StyledInputPassword placeholder="Пароль" />
              </Form.Item>

              <SubTitle onClick={() => setIsRestore(true)}>
                Не помню пароль
              </SubTitle>
            </>
          )}
          {isRestore && (
            <>
              <DescRestore level={5} style={{ fontWeight: "400" }}>
                Укажите вашу почту для восстановления пароля
              </DescRestore>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите адрес электронной почты!",
                  },
                ]}
              >
                <StyledInput placeholder="Электронная почта" />
              </Form.Item>
              <SubTitle onClick={() => setIsRestore(false)}>
                Назад
              </SubTitle>
            </>
          )}

          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              block
              onClick={onSubmit}
              disabled={isDisableBtn}
            /* loading */
            >
              {buttonName}
            </StyledButton>
          </Form.Item>
        </StyledForm>
      </Wrapper>
    </>
  );
};
