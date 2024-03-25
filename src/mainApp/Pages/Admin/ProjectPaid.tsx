import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetReviewsWithType } from "../../hooks/useGetReviewsWithType";
import { TableProjectPaid } from "../../Table/TableProjectPaid";
import { ChangeEvent } from "react";
import { SearchPanel } from "../../components/SearchPanel";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectPaid = () => {
  const { reviews, handleGetReviews, isLoading } =
    useGetReviewsWithType("isPaid");

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleGetReviews(event.target.value.toLowerCase());
  };

  return (
    <Page>
      <Header>Оплаченные отзывы</Header>
      <SearchPanel
        placeholder="Поиск по тексту отзыва"
        onChange={onChangeInput}
      />
      <TableProjectPaid
        reviews={reviews}
        onUpdate={handleGetReviews}
        isLoading={isLoading}
        typeTable={"isPaid"}
      />
    </Page>
  );
};

export default ProjectPaid;
