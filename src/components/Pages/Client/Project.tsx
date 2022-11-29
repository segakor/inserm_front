import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../Typography";
import { DetailsCard } from "../../DetailsCard";
import { ModalBrif } from "../../ModalBrif";
import { TableProject } from "../../TableProject";
import { ArchiveProject } from "../../ArchiveProject";

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

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${params.projectId}`)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, [params.projectId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Page>
      <HeaderFlex>
        <Header>{`айди проекта ->>>${params.projectId}`}</Header>
        <StyledButton onClick={handleOpen}>Открыть бриф</StyledButton>
      </HeaderFlex>
      <CardBlock>
        <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
          01.09.22-01.10.22
        </TitleDate>
        <DetailsCard />
      </CardBlock>
      <ModalBrif onClose={handleClose} isOpen={isModalOpen} />
      <TableProject />
      <ArchiveProject />
    </Page>
  );
};
