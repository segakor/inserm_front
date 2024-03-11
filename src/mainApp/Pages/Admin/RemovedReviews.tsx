import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { TableRemovedReviews } from "../../Table/TableRemovedReviews";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RemovedReviews = () => {
  return (
    <Page>
      <Header>Удаленные отзывы</Header>
      <TableRemovedReviews />
    </Page>
  );
};

export default RemovedReviews;
