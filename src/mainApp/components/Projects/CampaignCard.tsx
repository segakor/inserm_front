import React, { useState } from "react";
import { DetailsCard } from "../Card";
import { useNavigate } from "react-router-dom";
import { ModalBrief } from "../ModalBrief";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { Campaign } from "../../../types";
import { useGetBrief } from "../../hooks/useGetBrief";
import { Title } from "../../../common/Typography";
import { CardBlock, Header, TariffBlock, TariffCard, TitleDate, Wrapper } from "./styles";

export const CampaignCard = (project: Campaign) => {
  const { name, statuses, id, period } = project;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { brief, handleGetBrief } = useGetBrief(id.toString(), 'campaign');

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleGetBrief();
  };

  const navigation = useNavigate();
  return (
    <Wrapper>
      <CardBlock color={"#585858"}>
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
            ~ {period} мес.
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
          onClick={() => navigation(`/app/client/campaign/${id}`)}
        >
          Смотреть отчет
        </Title>
      </CardBlock>
      <TariffBlock>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
        <TariffCard>
          <Header>
            <Title level={5} style={{ fontWeight: "800" }}>
              Поштучный пакет
            </Title>
            <TitleDate>~ {period} мес.</TitleDate>
          </Header>
        </TariffCard>
      </TariffBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          id={project.id.toString()}
          brief={brief}
          typeBrief={'campaign'}
        />
      )}
    </Wrapper>
  );
};
