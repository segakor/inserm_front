import { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { Title } from "../../common/Typography";
import { useAuth } from "../hooks/useAuth";
import { useResetPassword } from "../hooks/useResetPassword";
import { useRegistartion } from "../hooks/useRegistration";
import ReCAPTCHA from "react-google-recaptcha";
import { localeLogin } from "../../constants";
import { openNotificationWithIcon } from "../../utils";

const Wrapper = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px 20px 20px 20px;
  width: auto;
  height: auto;
  @media (min-width: 768px) {
    padding: 40px 40px 0px 40px;
    width: 520px;
  }
`;
const StyledInput = styled(Input)`
  border-radius: 10px;
  height: 50px;
`;
const StyledInputPassword = styled(Input.Password)`
  border-radius: 10px;
  height: 50px;
  margin-top: 10px;
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
const RegisterButton = styled(StyledButton)`
  color: white;
  background-color: #313131;
  :hover {
    color: white !important;
  }
  margin-bottom: 20px;
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

export const FormLogin = () => {
  const [form] = Form.useForm();
  const email = Form.useWatch("username", form);
  const password = Form.useWatch("password", form);

  const [typeForm, setTypeForm] = useState<
    "login" | "restore" | "registration"
  >("login");

  const [isVerified, setIsVerified] = useState(false);

  const { handleLogin, isLoading: isLoadingLogin } = useAuth();

  const { handleResetPassword } = useResetPassword();

  const { handleRegistartion, isLoading: isLoadingRegistration } =
    useRegistartion();

  const isLoading = isLoadingRegistration || isLoadingLogin;

  const title = localeLogin.find((item) => item.type === typeForm);

  const onChangeCapcha = (value: any) => {
    value ? setIsVerified(true) : setIsVerified(false);
  };

  const handleBack = () => {
    setTypeForm("login");
    setIsVerified(false);
  };

  const onFinish = () => {
    const emailL = email.toLowerCase();

    if (typeForm === "login") {
      handleLogin({ email: emailL, password });
    }
    
    if (typeForm === "registration") {
      isVerified
        ? handleRegistartion({ email: emailL, password })
        : openNotificationWithIcon({
            type: "error",
            message: "",
            description: `CAPTCHA не пройдена`,
          });
    }

    if (typeForm === "restore") {
      form.setFieldsValue({ password: "" });
      handleResetPassword({ email: emailL });
    }
  };

  const onFinishFailed = () => {
    openNotificationWithIcon({
      type: "error",
      message: "",
      description: `Заполните все поля`,
    });
  };

  return (
    <>
      <Wrapper>
        <HeaderForm level={3} style={{ fontWeight: "800" }}>
          {title?.formTitle}
        </HeaderForm>
        <StyledForm
          name="login"
          initialValues={{ remember: true }}
          autoComplete="on"
          form={form}
          disabled={isLoading}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {typeForm === "login" && (
            <>
              <Form.Item
                name="username"
                rules={[
                  {
                    type: "email",
                    message:
                      "Пожалуйста, введите корректный адрес электронной почты!",
                  },
                  {
                    required: true,
                    message:
                      "Пожалуйста, введите корректный адрес электронной почты!",
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
              <SubTitle onClick={() => setTypeForm("restore")}>
                Не помню пароль
              </SubTitle>
            </>
          )}
          {typeForm === "restore" && (
            <>
              <DescRestore level={5} style={{ fontWeight: "400" }}>
                Укажите вашу почту для восстановления пароля
              </DescRestore>
              <Form.Item
                name="username"
                rules={[
                  {
                    type: "email",
                    message:
                      "Пожалуйста, введите корректный адрес электронной почты!",
                  },
                  {
                    required: true,
                    message:
                      "Пожалуйста, введите корректный адрес электронной почты!",
                  },
                ]}
              >
                <StyledInput placeholder="Электронная почта" />
              </Form.Item>
              <SubTitle onClick={handleBack}>Назад</SubTitle>
            </>
          )}
          {typeForm === "registration" && (
            <>
              <Form.Item
                name="username"
                rules={[
                  {
                    type: "email",
                    message:
                      "Пожалуйста, введите корректный адрес электронной почты!",
                  },
                  {
                    required: true,
                    message:
                      "Пожалуйста, введите корректный адрес электронной почты!",
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
              <Form.Item
                name="password_repeat"
                rules={[
                  { required: true, message: "Пожалуйста, введите пароль!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Пароли не совпадают!"));
                    },
                  }),
                ]}
              >
                <StyledInputPassword placeholder="Повторите пароль" />
              </Form.Item>
              <SubTitle onClick={handleBack}>Назад</SubTitle>
              <ReCAPTCHA
                style={{ marginBottom: 16 }}
                sitekey="6Le3qHYlAAAAAEeZz21F3gumg3ohJGIyyjVFadnM"
                onChange={onChangeCapcha}
              />
            </>
          )}
          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
            >
              {title?.submitTitle}
            </StyledButton>
          </Form.Item>
          {typeForm === "login" && (
            <RegisterButton block onClick={() => setTypeForm("registration")}>
              Регистрация
            </RegisterButton>
          )}
        </StyledForm>
      </Wrapper>
    </>
  );
};
