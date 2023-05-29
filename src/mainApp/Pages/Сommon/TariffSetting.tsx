import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


const TariffSetting = () => {
  return (
    <Page>
      <Header>Замена и создание нового тарифа</Header>
      <Title level={5}>В работе</Title>
    </Page>
  );
};

export default TariffSetting;