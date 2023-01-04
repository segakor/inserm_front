import React, { useState } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../Typography";
import { DetailsCard } from "../../DetailsCard";
import { ModalBrief } from "../../ModalBrief";
import { ArchiveProjectList } from "../../ArchiveProjectList";
import { getRangeDate } from "../../../utils/getDate";
import { useGetReviews } from "../../../hooks/useGetReviews";
import { TableProjectChangeable } from "../../TableProjectChangeable";
import { useGetBrief } from "../../../hooks/useGetBrief";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  width: 180px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
`;
const CardBlock = styled.div`
  width: 600px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const TitleDate = styled(Title)`
  margin-bottom: 20px !important;
`;

export const ProjectAllStatusses = () => {
  const params = useParams();
  const projectId = params.projectId || ""

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleGetBrief()
  };

  const {
    reviews,
    isLoading,
    projectName,
    statusess,
    tariff,
    handleGetReviews,
  } = useGetReviews(projectId);

  const { brief, handleGetBrief } = useGetBrief(projectId);

  const start = tariff?.start;
  const end = tariff?.end;

  return (
    <Page>
      <HeaderFlex>
        <Header>{projectName || ""}</Header>
        <StyledButton onClick={handleOpen}>
          {brief ? "Открыть бриф" : "Заполнить бриф"}
        </StyledButton>
      </HeaderFlex>
      <CardBlock>
        <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
          {getRangeDate({ start, end })}
        </TitleDate>
        <DetailsCard statuses={statusess} />
      </CardBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          projectId={projectId}
          brief={brief}
        />
      )}
      <TableProjectChangeable
        reviews={reviews}
        isLoading={isLoading}
        onUpdate={handleGetReviews}
        projectId={projectId}
      />
      <ArchiveProjectList projectId={projectId} />
    </Page>
  );
};
