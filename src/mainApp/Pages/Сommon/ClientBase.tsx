import React from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetAllClient } from "../../hooks/useGetAllClient";
import { TableAllClient } from "../../Table/TableAllClient";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ClientBase = () => {
  const { isLoading, allClient } = useGetAllClient();
  return (
    <Page>
      <Header>База клиентов</Header>
      <TableAllClient allClient={allClient} isLoading={isLoading}/>
    </Page>
  );
};
