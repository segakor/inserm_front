import React from "react";
import styled from "styled-components";
import { Header } from "../../Typography";
import { useGetReviewsWithType } from "../../../hooks/useGetReviewsWithType";
import { TableProjectPaid } from "../../Table/TableProjectPaid";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProjectForPayment = () => {
  const { reviews, handleGetReviews, isLoading } =
    useGetReviewsWithType('noPaid');

  return (
    <Page>
      <Header>Отзывы на оплату</Header>
      <TableProjectPaid
        reviews={reviews}
        onUpdate={handleGetReviews}
        isLoading={isLoading}
        typeTable={'noPaid'}
      />
    </Page>
  );
};
