import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { ListOfNews } from "../../components/News";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const News = () => {
  return (
    <Page>
      <Header>Обновления сервиса</Header>
      <ListOfNews isAdmin />
    </Page>
  );
};

export default News;
