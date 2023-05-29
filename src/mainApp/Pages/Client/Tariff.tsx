import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { CurrentTariff } from "../../components/CurrentTariff";
import { ButtonCreateNewProject } from "../../Button/ButtonCreateNewProject";
import { useLocalState } from "../../context/hooks";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderFlex = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Tariff = () => {
  const state = useLocalState();
  const { clientProject } = state;

  return (
    <Page>
      <HeaderFlex>
        <Header>Управление тарифами</Header>
        <ButtonCreateNewProject />
      </HeaderFlex>
      <CurrentTariff clientProject={clientProject} />
    </Page>
  );
};

export default Tariff;