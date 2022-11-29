import React from "react";
import styled from "styled-components";
import { Header, Title } from "../../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListOfProject = () => {
  return (
    <Page>
      <Header>Список проектов</Header>
    </Page>
  );
};
