import { useCallback, useState } from "react";
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
  HeaderTariff,
  Status,
  FooterLink,
} from "../../mainApp/components/Projects/styles";
import { ButtonBrief } from "../../mainApp/Button/ButtonBrief";
import { demoBrief } from "../constants";
import { noop } from "../../constants";
import { ModalBriefDemo } from "./ModalBriefDemo";
import { CheckCircleFilled } from "@ant-design/icons";
import { ModalTemplate } from "../../mainApp/components/Modal";
import { template, act } from "../template";
import { OutlinedButton } from "../../mainApp/Button/styles";

export const CampaignCardDemo = (project: Campaign) => {
  const { name, statuses, id, period, isTransfer, isPaid } = project;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalActOpen, setIsModalActOpen] = useState(false);

  const [tempalate, setTempalate] = useState<any>("");
  const [typeTemplate, setTypeTemplate] = useState("");

  const handleActOpen = (type: "act" | "payment") => {
    switch (true) {
      case type === "act":
        setTypeTemplate("act");
        setTempalate(act);
        break;

      default:
        setTypeTemplate("payment");
        setTempalate(template);
        break;
    }
    setIsModalActOpen(true);
  };

  const handleActClose = () => {
    setIsModalActOpen(false);
  };

  const brief = demoBrief[id - 1];

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const navigation = useNavigate();

  const isCompleted = statuses.success >= statuses.all;

  const goToCampaign = useCallback(() => {
    isPaid ? navigation(`/demo/campaign/${id}`) : noop;
  }, [isPaid]);

  return (
    <Wrapper>
      <div>
        <Status>
          <CheckCircleFilled
            style={{ color: isCompleted ? "#1579e9" : "#23C915" }}
          />
          <Title
            level={5}
            style={{
              fontSize: "14px",
              color: isCompleted ? "#1579e9" : "#23C915",
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}
          >
            {isCompleted ? "Завершен" : "Оплачен"}
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
        <div>
          <OutlinedButton>Повторить заказ</OutlinedButton>
        </div>
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
