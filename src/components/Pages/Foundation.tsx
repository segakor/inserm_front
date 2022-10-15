import React from "react";
import styled from "styled-components";
import { Title, Header } from "../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Foundation = () => {
  return (
    <Page>
      <Header>База знаний</Header>
    </Page>
  );
};
