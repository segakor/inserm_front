import React from "react";
import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ClientBase = () => {
  return (
    <Page>
      <Header>База клиентов</Header>
      <Title level={5}>В работе</Title>
    </Page>
  );
};
