import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { ReviewsPiece } from "../../components/CreateCampaign";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CreateProject = () => {
  return (
    <Page>
      <Header>Оформление заказа</Header>
      <ReviewsPiece />
    </Page>
  );
};

export default CreateProject;
