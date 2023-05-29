import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const TariffClient = () => {
  return (
    <Page>
      <Header>Тарифы клиентов</Header>
      <Title level={5}>В работе</Title>
    </Page>
  );
};

export default TariffClient;
