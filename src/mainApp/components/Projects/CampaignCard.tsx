import { useCallback, useState } from "react";
import { DetailsCard } from "../Card";
import { useNavigate } from "react-router-dom";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { Campaign } from "../../../types";
import { useGetBrief } from "../../hooks/useGetBrief";
import { Title } from "../../../common/Typography";
import {
  CardBlock,
  FooterLink,
  Header,
  HeaderTariff,
  IsProcessOfWriting,
  Status,
  TariffBlock,
  TariffCard,
  TitleDate,
  Wrapper,
} from "./styles";
import { Tooltip } from "antd";
import { noop } from "../../../constants";
import { ReactComponent as WaitIcon } from "../../../assets/transferWait.svg";
import { ReactComponent as ReviewEmpty } from "../../../assets/reviewEmpty.svg";
import { useActTemplate } from "../../hooks/useGetActTemplate";
import { ButtonRefresh } from "../../Button/ButtonRefresh";
import { ButtonRemoveCampaign } from "../../Button/ButtonRemoveCampaign";
import { ModalBrief, ModalTemplate } from "../Modal";
import { ButtonArhiveCampaign } from "../../Button/ButtonArhiveCampaign";
import { CheckCircleFilled } from "@ant-design/icons";

export const CampaignCard = (campaign: Campaign) => {
  const {
    name,
    statuses,
    id,
    period,
    isPaid,
    isTransfer,
    transferId,
    autopay,
    isProcessOfWriting,
    isActive,
  } = campaign;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalActOpen, setIsModalActOpen] = useState(false);

  const { brief, handleGetBrief } = useGetBrief(id.toString(), "campaign");

  const { handleGetAct, handleGetInvoice, tempalate, typeTemplate } =
    useActTemplate();

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleGetBrief();
  };

  const handleActOpen = (type: "act" | "payment") => {
    type === "act" ? handleGetAct(transferId) : handleGetInvoice(transferId);
    setIsModalActOpen(true);
  };
  const handleActClose = () => {
    setIsModalActOpen(false);
  };

  const navigation = useNavigate();

  const isCanRefresh = !autopay && isPaid;
  const isCanRemove = !isPaid;
  const isCompleted = statuses.success >= statuses.all && !autopay;

  const goToCampaign = useCallback(() => {
    isPaid ? navigation(`/app/client/campaign/${id}`) : noop;
  }, [isPaid]);

  return (
    <Wrapper>
      <div>
        <Status>
          {isPaid ? (
            <CheckCircleFilled
              style={{ color: isCompleted ? "#1579e9" : "#23C915" }}
            />
          ) : (
            <WaitIcon />
          )}
          <Title
            level={5}
            style={{
              fontSize: "14px",
              color: isCompleted ? "#1579e9" : isPaid ? "#23C915" : "#E73E3E",
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}
          >
            {!isPaid ? "Ожидает оплаты" : isCompleted ? "Завершен" : "Оплачен"}
          </Title>
        </Status>
        <CardBlock color={"#2CAE97"}>
          <Header>
            <Title
              level={5}
              style={{
                color: "white",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: isPaid ? "pointer" : "not-allowed",
              }}
              onClick={goToCampaign}
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
              onClick={goToCampaign}
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
                onClick={() => handleActOpen("act")}
                level={5}
                style={{
                  fontWeight: "500",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                Получить акт выполненных работ
              </Title>
            )}
            {isTransfer && (
              <Title
                onClick={() => handleActOpen("payment")}
                level={5}
                style={{
                  fontWeight: "500",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                Получить счет
              </Title>
            )}
          </FooterLink>
        </CardBlock>
      </div>
      <TariffBlock>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
        {isCanRefresh && (
          <ButtonRefresh campaignId={id} isCashless={isTransfer} />
        )}
        {isCanRemove && <ButtonRemoveCampaign campaignId={id} />}
        {isCompleted && isActive && (
          <ButtonArhiveCampaign
            id={id}
            type="campaign"
            isActive={isActive || false}
          />
        )}
        <TariffCard>
          <HeaderTariff>
            <Title level={5} style={{ fontWeight: "800" }}>
              Срок выполнения
            </Title>
            <TitleDate>~ {period} мес.</TitleDate>
          </HeaderTariff>
        </TariffCard>
        {isProcessOfWriting && (
          <IsProcessOfWriting>
            <ReviewEmpty />
            <Title level={5} style={{ fontWeight: "400" }}>
              Тексты в процессе написания
            </Title>
          </IsProcessOfWriting>
        )}
      </TariffBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          id={id.toString()}
          brief={brief}
          typeBrief={"campaign"}
        />
      )}
      {isModalActOpen && (
        <ModalTemplate
          onClose={handleActClose}
          invoiceTemplate={tempalate}
          type={typeTemplate as "act" | "payment"}
        />
      )}
    </Wrapper>
  );
};
