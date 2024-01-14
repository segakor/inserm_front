import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { UpdateProject as UpdateProjectComponent } from "../../components/CreateCampaign";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UpdateProject = () => {
  return (
    <Page>
      <Header>Обновление проекта</Header>
      <UpdateProjectComponent />
    </Page>
  );
};

export default UpdateProject;
