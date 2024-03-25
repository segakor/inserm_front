import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { useGetReviewsWithType } from "../../hooks/useGetReviewsWithType";
import { TableProjectModerate } from "../../Table/TableProjectModerate";
import { ChangeEvent } from "react";
import { SearchPanel } from "../../components/SearchPanel";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectModerate = () => {
  const { reviews, handleGetReviews, isLoading } =
    useGetReviewsWithType("moderate");

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleGetReviews(event.target.value.toLowerCase());
  };

  return (
    <Page>
      <Header>Проекты на модерации</Header>
      <SearchPanel
        placeholder="Поиск по тексту отзыва"
        onChange={onChangeInput}
      />
      <TableProjectModerate
        reviews={reviews}
        onUpdate={handleGetReviews}
        isLoading={isLoading}
      />
    </Page>
  );
};

export default ProjectModerate;
