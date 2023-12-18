import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Campaign } from "../../types";
import { Title } from "../../common/Typography";
import { Tooltip } from "antd";
import { DetailsCard } from "../../mainApp/components/Card";
import {
  CardBlock,
  TariffBlock,
  TariffCard,
  TitleDate,
  Wrapper,
  Header,
  HeaderTariff
} from "../../mainApp/components/Projects/styles";
import { ButtonBrief } from "../../mainApp/Button/ButtonBrief";
import { demoBrief } from "../constants";
import { noop } from "../../constants";
import { ModalBriefDemo } from "./ModalBriefDemo";

export const CampaignCardDemo = (project: Campaign) => {
  const { name, statuses, id, period } = project;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const brief = demoBrief[id - 1];

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
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
            cursor: project.isPaid ? "pointer" : "not-allowed",
          }}
          onClick={
            project.isPaid
              ? () => navigation(`/demo/campaign/${id}`)
              : noop
          }
        >
          <Tooltip
            title={
              !project.isPaid
                ? "Ожидание оплаты может занять несколько минут"
                : ""
            }
          >
            Смотреть отчет
          </Tooltip>
        </Title>
      </CardBlock>
      <TariffBlock>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
        <TariffCard>
          <HeaderTariff>
            <Title level={5} style={{ fontWeight: "800" }}>
              Поштучный пакет
            </Title>
            <TitleDate>~ {period} мес.</TitleDate>
          </HeaderTariff>
        </TariffCard>
      </TariffBlock>
      {isModalOpen && (
        <ModalBriefDemo
          onClose={handleClose}
          id={project.id.toString()}
          brief={brief}
          typeBrief={"campaign"}
        />
      )}
    </Wrapper>
  );
};
