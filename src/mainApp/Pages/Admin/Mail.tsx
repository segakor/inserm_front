import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useMail } from "../../hooks/useEmail";
import { ListOfMails } from "../../components/Mail";
import { useEffect } from "react";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Mail = () => {
  return (
    <Page>
      <Header>Настройка писем</Header>
      <ListOfMails />
    </Page>
  );
};

export default Mail;
