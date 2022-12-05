import React, { useState } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../Typography";
import { DetailsCard } from "../../DetailsCard";
import { ModalBrif } from "../../ModalBrif";
import { TableProject } from "../../TableProject";
import { ArchiveProject } from "../../ArchiveProject";
import { useLocalState } from "../../../context/hooks";
import { getRangeDate } from "../../../utils/getRangeDate";

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

export const Project = () => {
  const params = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const state = useLocalState();

  const { clientProject } = state;

  const currentProject = clientProject?.find(
    (item) => item.id === Number(params.projectId)
  );

  return (
    <Page>
      <HeaderFlex>
        <Header>{currentProject?.name || ""}</Header>
        <StyledButton onClick={handleOpen}>
          {currentProject?.brief ? "Открыть бриф" : "Заполнить бриф"}
        </StyledButton>
      </HeaderFlex>
      <CardBlock>
        <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
          {getRangeDate(
            currentProject?.tariff_start || 0,
            currentProject?.tariff_end || 0
          )}
        </TitleDate>
        <DetailsCard statuses={currentProject?.statuses} />
      </CardBlock>
      <ModalBrif onClose={handleClose} isOpen={isModalOpen} />
      <TableProject />
      <ArchiveProject />
    </Page>
  );
};
