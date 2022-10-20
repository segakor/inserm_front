import React, { useState } from "react";
import styled from "styled-components";
import { useLocalState } from "../context/hooks";
import { Button, Form, Input } from "antd";
import { openNotificationWithIcon } from "../utils/notification";
import "antd/dist/antd.css";
/* import "./AntComponentStyle.css"; */
import { Title } from "./Typography";

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
const RememberPassword = styled.div`
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
  const username = Form.useWatch("username", form);
  const password = Form.useWatch("password", form);

  const [isRestore, setIsRestore] = useState(false);

  const { isMobile } = useLocalState();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onClickRestore = () => {
    console.log("onClickRestore");
    setIsRestore(true);
  };
  const ButtonName = !isRestore ? "Войти" : "Отправить";

  const onSubmit = () => {
    if (!isRestore) {
      console.log();
    } else {
      setIsRestore(false);
      form.setFieldsValue({ password: "" });
      console.log(form);
    }
  };

  console.log(username, password);
  return (
    <>
      <Wrapper>
        <HeaderForm level={isMobile ? 4 : 3} style={{ fontWeight: "800" }}>
          {!isRestore
            ? "Войдите в свой личный кабинет"
            : "Восстановление пароля"}
        </HeaderForm>
        <StyledForm
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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

              <RememberPassword onClick={onClickRestore}>
                Не помню пароль
              </RememberPassword>
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
            </>
          )}

          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              block
              onClick={onSubmit}
            >
              {ButtonName}
            </StyledButton>
          </Form.Item>
        </StyledForm>
        {/*         <Button
          onClick={() =>
            openNotificationWithIcon({
              type: "success",
              message: "test",
              description: "test2",
            })
          }
        >
          Success
        </Button> */}
      </Wrapper>
    </>
  );
};
