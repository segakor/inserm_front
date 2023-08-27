import React, { useState } from "react";
import { DetailsCard } from "../Card";
import { useNavigate } from "react-router-dom";
import { ModalBrief } from "../ModalBrief";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { Campaign } from "../../../types";
import { useGetBrief } from "../../hooks/useGetBrief";
import { Title } from "../../../common/Typography";
import {
  CardBlock,
  FooterLink,
  Header,
  StatusTransfer,
  TariffBlock,
  TariffCard,
  TitleDate,
  Wrapper,
} from "./styles";
import { Tooltip } from "antd";
import { noop } from "../../../constants";
import { ReactComponent as WaitIcon } from "../../../assets/transferWait.svg";
import { ReactComponent as ApproveIcon } from "../../../assets/transferApprove.svg";

export const CampaignCard = (campaign: Campaign) => {
  const { name, statuses, id, period, isPaid, isTransfer } = campaign;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { brief, handleGetBrief } = useGetBrief(id.toString(), "campaign");

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
      <div>
        {isTransfer && (
          <StatusTransfer>
            {isPaid ? <ApproveIcon /> : <WaitIcon />}
            <Title
              level={5}
              style={{
                fontSize: "14px",
                color: isPaid ? "#23C915" : "#E73E3E",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              {isPaid ? "Оплачен" : "Ожидает оплаты"}
            </Title>
          </StatusTransfer>
        )}
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
          <FooterLink>
            <Title
              level={5}
              style={{
                fontWeight: "500",
                color: "#FFFFFF",
                fontSize: "14px",
                textDecorationLine: "underline",
                cursor: isPaid ? "pointer" : "not-allowed",
              }}
              onClick={
                isPaid ? () => navigation(`/app/client/campaign/${id}`) : noop
              }
            >
              <Tooltip
                title={
                  !isPaid ? "Ожидание оплаты может занять несколько минут" : ""
                }
              >
                Смотреть отчет
              </Tooltip>
            </Title>
            {isTransfer && (
              <Title
                level={5}
                style={{
                  fontWeight: "500",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  textDecorationLine: "underline",
                  cursor: "not-allowed",
                }}
              >
                <Tooltip title={"Временно недоступно"}>
                  Получить акт выполненных работ
                </Tooltip>
              </Title>
            )}
          </FooterLink>
        </CardBlock>
      </div>
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
          id={id.toString()}
          brief={brief}
          typeBrief={"campaign"}
        />
      )}
    </Wrapper>
  );
};
