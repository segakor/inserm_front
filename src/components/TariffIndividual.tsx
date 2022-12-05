import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Title } from "./Typography";
import { ReactComponent as Telegram } from "../assets/telegram.svg";
import { ReactComponent as Whatsapp } from "../assets/whatsapp.svg";
import { ReactComponent as Email } from "../assets/email.svg";

const Wrapper = styled.div`
  width: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 40px;
  border: 2px solid #1579e9;
`;
const IconRow = styled.div`
  display: flex;
  grid-gap: 25px;
`;
const TelegramIcon = styled(Telegram)`
  width: 30px;
  height: 30px;
`;
const WhatsappIcon = styled(Whatsapp)`
  width: 30px;
  height: 30px;
`;
const EmailIcon = styled(Email)`
  width: 30px;
  height: 30px;
`;

export const TariffIndividual = () => {
  return (
    <Wrapper>
      <Row style={{ marginBottom: 40 }}>
        <Title level={4} style={{ fontWeight: "800" }}>
          Тариф "Индивидуальный"
        </Title>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Title style={{ fontSize: 14, fontWeight: "400" }}>
          Если у вас много карточек и нужен особый тариф, то мы готовы обсудить
          все детали отдельно любым удобным способом:
        </Title>
      </Row>
      <IconRow style={{ marginBottom: 100 }}>
        <TelegramIcon />
        <WhatsappIcon />
        <EmailIcon />
      </IconRow>
      <StyledButton type="primary" block disabled>
        Создать тариф
      </StyledButton>
    </Wrapper>
  );
};
