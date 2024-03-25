import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetReviewsWithType } from "../../hooks/useGetReviewsWithType";
import { TableProjectPaid } from "../../Table/TableProjectPaid";
import { SearchPanel } from "../../components/SearchPanel";
import { ChangeEvent } from "react";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectForPayment = () => {
  const { reviews, handleGetReviews, isLoading } =
    useGetReviewsWithType("noPaid");

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleGetReviews(event.target.value.toLowerCase());
  };

  return (
    <Page>
      <Header>Отзывы на оплату</Header>
      <SearchPanel
        placeholder="Поиск по тексту отзыва"
        onChange={onChangeInput}
      />
      <TableProjectPaid
        reviews={reviews}
        onUpdate={handleGetReviews}
        isLoading={isLoading}
        typeTable={"noPaid"}
      />
    </Page>
  );
};

export default ProjectForPayment;
