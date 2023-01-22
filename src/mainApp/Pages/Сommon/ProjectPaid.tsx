import React from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetReviewsWithType } from "../../hooks/useGetReviewsWithType";
import { TableProjectPaid } from "../../Table/TableProjectPaid";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProjectPaid = () => {
  const { reviews, handleGetReviews, isLoading } =
    useGetReviewsWithType("isPaid");

  return (
    <Page>
      <Header>Оплаченные отзывы</Header>
      <TableProjectPaid
        reviews={reviews}
        onUpdate={handleGetReviews}
        isLoading={isLoading}
        typeTable={'isPaid'}
      />
    </Page>
  );
};
