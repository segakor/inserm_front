import React, { useState } from "react";
import styled from "styled-components";
import { useLocalState } from "../context/hooks";
import { Button, Form, Input, Typography } from "antd";
import { openNotificationWithIcon } from "../utils/notification";
import "antd/dist/antd.css";
import "./AntComponentStyle.css";

const { Title } = Typography;

const Wrapper = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "auto" : "520px")};
  height: ${(props) => (props.isMobile ? "auto" : "400px")};
  background-color: #ffffff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: ${(props) =>
    props.isMobile ? "20px 20px 0px 20px" : "40px 40px 20px 40px"};
  border-radius: 20px;
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
  width: 120px;
`;

export const LoginForm = () => {
  const [form] = Form.useForm();
  const username = Form.useWatch('username', form);
  const password = Form.useWatch('password', form);

  const [isRestore, setIsRestore] = useState(false);

  const { isMobile } = useLocalState();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onClickRestore = () => {
    console.log('onClickRestore')
    setIsRestore(true);
  };
  const ButtonName = !isRestore ? 'Войти' : 'Отправить';

  const onSubmit = () => {
    if (!isRestore) {
      console.log()
    } else { setIsRestore(false); form.setFieldsValue({ password: '' }); console.log(form) }
  }

  console.log(username, password)
  return (
    <>
      <Wrapper isMobile={isMobile}>
        <Title level={isMobile ? 4 : 3}>
          {!isRestore ? "Вход в личный кабинет" : "Восстановление пароля"}
        </Title>
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
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <StyledInput placeholder="Электронная почта" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
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
              <div>Укажите вашу почту для восстановления пароля</div>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
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
        <Button
          onClick={() =>
            openNotificationWithIcon({
              type: "success",
              message: "test",
              description: "test2",
            })
          }
        >
          Success
        </Button>
      </Wrapper>
    </>
  );
};
