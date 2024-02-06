import { useCallback, useState } from "react";
import { DetailsCard } from "../Card";
import { useNavigate } from "react-router-dom";
import { ModalBrief } from "../../components/Modal";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { Project } from "../../../types";
import { useGetBrief } from "../../hooks/useGetBrief";
import { Title } from "../../../common/Typography";
import { getRangeDate } from "../../../utils";
import { colorCardProject } from "../../../constants";
import {
  CardBlock,
  Header,
  HeaderTariff,
  Status,
  TariffBlock,
  TariffCard,
  TitleDate,
  Wrapper,
} from "./styles";
import { ButtonArhiveCampaign } from "../../Button/ButtonArhiveCampaign";
import { ReactComponent as WaitIcon } from "../../../assets/transferWait.svg";
import { ReactComponent as ApproveIcon } from "../../../assets/transferApprove.svg";

export const ProjectCard = (project: Project) => {
  const {
    name,
    tariff: { start, end, name: tariffName },
    statuses,
    id,
    autopay,
    isActive,
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

  const color = colorCardProject.find(
    (item) => item.tariffName === tariffName
  )?.color;

  const navigation = useNavigate();

  const isCompleted =
    statuses && statuses?.success >= statuses?.all && !autopay;
  const isPaid = true;

  const goToProjeсt = useCallback(() => {
    navigation(`/app/client/project/${id}`);
  }, []);

  return (
    <Wrapper>
      <div>
        <Status>
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
            {!isPaid ? "Ожидает оплаты" : isCompleted ? "Завершен" : "Оплачен"}
          </Title>
        </Status>
        <CardBlock color={color}>
          <Header>
            <Title
              level={5}
              style={{
                color: "white",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={goToProjeсt}
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
            onClick={goToProjeсt}
          >
            Смотреть отчет
          </Title>
        </CardBlock>
      </div>
      <TariffBlock>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
        {isCompleted && isActive &&  (
          <ButtonArhiveCampaign
            id={id}
            type="project"
            isActive={isActive || false}
          />
        )}
        <TariffCard>
          <HeaderTariff>
            <Title level={5} style={{ fontWeight: "800" }}>
              Период
            </Title>
            <TitleDate>{getRangeDate({ start, end })}</TitleDate>
          </HeaderTariff>
        </TariffCard>
      </TariffBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          id={project.id.toString()}
          brief={brief}
          typeBrief={"project"}
        />
      )}
    </Wrapper>
  );
};
