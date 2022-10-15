import React from "react";
import styled from "styled-components";
import { Title, Header } from "../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Profile = () => {
  return (
    <Page>
      <Header>Профиль</Header>
    </Page>
  );
};
