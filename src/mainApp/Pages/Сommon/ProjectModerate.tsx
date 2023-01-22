import React from "react";
import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetReviewsWithType } from "../../hooks/useGetReviewsWithType";
import { TableProjectModerate } from "../../Table/TableProjectModerate";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProjectModerate = () => {
  const { reviews, handleGetReviews, isLoading } =
    useGetReviewsWithType("moderate");

  return (
    <Page>
      <Header>Проекты на модерации</Header>
      <TableProjectModerate
        reviews={reviews}
        onUpdate={handleGetReviews}
        isLoading={isLoading}
      />
    </Page>
  );
};
