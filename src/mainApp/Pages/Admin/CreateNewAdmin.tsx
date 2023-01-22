import React from "react";
import styled from "styled-components";
import { FormCreateAdmin } from "../../Form/FormCreateAdmin";
import { Header } from "../../../common/Typography";
import { ListOfAdmin } from "../../components/ListOfAdmin";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CreateAdmin = () => {
  return (
    <Page>
      <Header>Создание админов</Header>
      <FormCreateAdmin />
      <ListOfAdmin />
    </Page>
  );
};
