import React, { useState } from "react";
import { DetailsCard } from "../Card";
import { useNavigate } from "react-router-dom";
import { ModalBrief } from "../ModalBrief";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { Project } from "../../../types";
import { useGetBrief } from "../../hooks/useGetBrief";
import { Title } from "../../../common/Typography";
import { getRangeDate } from "../../../utils";
import { colorCard } from "../../../constants";
import { CardBlock, Header, TariffBlock, TariffCard, TitleDate, Wrapper } from "./styles";

export const ProjectCard = (project: Project) => {
  const {
    name,
    tariff: { start, end, name: tariffName },
    statuses,
    id,
  } = project;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { brief, handleGetBrief } = useGetBrief(id.toString());

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleGetBrief();
  };

  const color = colorCard.find((item) => item.tariffName === tariffName)?.color;

  const navigation = useNavigate();
  return (
    <Wrapper>
      <CardBlock color={color}>
        <Header>
          <Title
            level={5}
            style={{
              color: "white",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {name}
          </Title>
          <Title
            level={5}
            style={{
              fontSize: "14px",
              color: "white",
              fontWeight: "400",
              whiteSpace: "nowrap",
            }}
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
          id={project.id.toString()}
          brief={brief}
          typeBrief={'project'}
        />
      )}
    </Wrapper>
  );
};
