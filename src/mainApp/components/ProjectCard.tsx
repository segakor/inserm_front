import React, { useState } from "react";
import styled from "styled-components";
import { DetailsCard } from "./DetailsCard";
import { useNavigate } from "react-router-dom";
import { ModalBrief } from "./ModalBrief";
import { ButtonBrief } from "../Button/ButtonBrief";
import { Project } from "../../types";
import { useGetBrief } from "../hooks/useGetBrief";
import { Title } from "../../common/Typography";
import { getRangeDate } from "../../utils";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;
const CardBlock = styled.div`
  width: 600px;
  border-radius: 10px;
  background: #1579e9;
  padding: 20px 20px 20px 20px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  @media (max-width: 768px) {
    width: auto;
    margin: 0 0 40px 0;
  }
`;
const TariffBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const TariffCard = styled.div`
  width: 267px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 15px 20px 15px;
`;
const TitleDate = styled.div`
  padding: 5px 10px 5px 10px;
  background: #1579e9;
  border-radius: 5px;
  color: #ffffff;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;


export const ProjectCard = (project: Project) => {

  const { name, tariff: { start, end, name: tariffName }, statuses, id } = project

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { brief, handleGetBrief } = useGetBrief(id.toString());

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleGetBrief()
  };

  const navigation = useNavigate();
  return (
    <Flex>
      <CardBlock>
        <Header>
          <Title level={5} style={{ color: "white", textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {name}
          </Title>
          <Title
            level={5}
            style={{ fontSize: "14px", color: "white", fontWeight: "400", whiteSpace: 'nowrap' }}
          >
            {getRangeDate({ start, end })}
          </Title>
        </Header>
        <DetailsCard statuses={statuses} />
        <Title
          level={5}
          style={{
            fontWeight: "500",
            color: "#FFFFFF",
            fontSize: "14px",
            textDecorationLine: "underline",
            cursor: "pointer",
          }}
          onClick={() => navigation(`/app/client/project/${id}`)}
        >
          Смотреть отчет
        </Title>
      </CardBlock>
      <TariffBlock>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
        <TariffCard>
          <Header>
            <Title level={5} style={{ fontWeight: "800" }}>
              Тариф “{tariffName}”
            </Title>
            <TitleDate>{getRangeDate({ start, end })}</TitleDate>
          </Header>
          <Title
            level={5}
            style={{
              fontWeight: "500",
              color: "#8E8E8E",
              fontSize: "14px",
              textDecorationLine: "underline",
              cursor: "pointer",
            }}
            onClick={() => navigation(`/app/client/tariff`)}
          >
            Изменить тариф
          </Title>
        </TariffCard>
      </TariffBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          projectId={project.id.toString()}
          brief={brief}
        />
      )}
    </Flex>
  );
};
