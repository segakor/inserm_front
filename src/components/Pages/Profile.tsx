import React from "react";
import styled from "styled-components";
import { Title, Header } from "../Typography";
import { Button, Input } from "antd";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FlexBox = styled.div`
  display: flex;
  height: auto;
  width: 819px;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;
const AboutMe = styled.div`
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  margin-right: 20px;
  input,
  h5 {
    margin-bottom: 20px !important;
  }
  input {
    width: 360px;
    border-radius: 10px;
    height: 50px;
    @media (max-width: 768px) {
      width: auto;
    }
  }
  @media (max-width: 768px) {
    margin: 0 0 20px 0;
  }
`;
const ChangePassword = styled.div`
  padding: 20px 20px 0 20px;
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
const StyledButton = styled(Button)`
  border-radius: 10px;
  width: 150px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
`;
const StyledInputPassword = styled(Input.Password)`
  border-radius: 10px;
  height: 50px;
  margin-bottom: 20px;
`;

export const Profile = () => {
  return (
    <Page>
      <Header>Профиль</Header>
      <Title level={4} style={{ fontWeight: "700" }}>
        Иван Иванов
      </Title>
      <Title level={5} style={{ fontWeight: "400" }}>
        ivanov@yandex.ru
      </Title>
      <FlexBox>
        <AboutMe>
          <Title
            level={5}
            style={{ fontWeight: "800", marginBottom: "20px !important" }}
          >
            О себе
          </Title>
          <Input placeholder="Имя" />
          <Input placeholder="Фамилия" />
          <Input placeholder="Электронная почта" />
          <Input placeholder="Номер телефона" />
          <Input placeholder="Логин в telegram" />
          <StyledButton>Сохранить</StyledButton>
        </AboutMe>
        <ChangePassword>
          <div>
            <Title level={5} style={{ fontWeight: "800" }}>
              Изменение пароля
            </Title>
            <StyledInputPassword placeholder="Текущий пароль" />
            <StyledInputPassword placeholder="Новый пароль" />
            <StyledInputPassword placeholder="Повторите новый пароль" />
          </div>
          <StyledButton>Сохранить</StyledButton>
        </ChangePassword>
      </FlexBox>
    </Page>
  );
};
