import React from "react";
import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


export const FoundationClient = () => {
  return (
    <Page>
      <Header>База знаний клиента</Header>
      <Title level={5}>В работе</Title>
    </Page>
  );
};
