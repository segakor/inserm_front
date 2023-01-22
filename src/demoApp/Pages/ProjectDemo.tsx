import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ButtonBrief } from "../../mainApp/Button/ButtonBrief";
import { DetailsCard } from "../../mainApp/components/DetailsCard";
import { TableProject } from "../../mainApp/Table/TableProject";
import { Title, Header } from "../../common/Typography";
import { getRangeDate } from "../../utils/getDate";
import { demoProject, demoReviews } from "../constants";
import { demoBrief } from "../constants";
import { ModalBrief } from "../../mainApp/components/ModalBrief";

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
const CardBlock = styled.div`
  width: 600px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const TitleDate = styled(Title)`
  margin-bottom: 20px !important;
`;

export const ProjectDemo = () => {
  const params = useParams();
  const projectId = params.projectId || ""

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const currentProject = demoProject?.find(
    (item) => item.id === Number(projectId)
  );

  const reviews = demoReviews[Number(projectId) - 1].reviews


  const start = currentProject?.tariff?.start;
  const end = currentProject?.tariff?.end;

  const brief = demoBrief[Number(projectId)]

  return (
    <Page>
      <HeaderFlex>
        <Header>{currentProject?.name || ""}</Header>
        <ButtonBrief brief={true} onClick={handleOpen} />
      </HeaderFlex>
      <CardBlock>
        <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
          {getRangeDate({ start, end })}
        </TitleDate>
        <DetailsCard statuses={currentProject?.statuses} />
      </CardBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          projectId={projectId}
          brief={brief}
        />
      )}
      <TableProject reviews={reviews} isLoading={false} />
    </Page>
  );
};
