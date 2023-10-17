import { useNavigate } from "react-router-dom";
import { Title } from "../../../common/Typography";
import { Campaign } from "../../../types";
import { getDate } from "../../../utils";
import { Box, Panel } from "./styles";
import { StatusesFlat } from "./StatusesFlat";
import { useChangeProjectStatus } from "../../hooks/useChangeProjectStatus";
import { DollarTwoTone } from "@ant-design/icons";

type Props = {
  campaign: Campaign;
  isActive: boolean;
  onUpdate: () => void;
};

export const FlatCardCampaign = ({ campaign, isActive, onUpdate }: Props) => {
  const { period, statuses, name, id, brief, autopay } = campaign;

  const navigation = useNavigate();

  const isCompleted = (statuses?.success || 0) >= (statuses?.all || 0);
  const isReadyToWork = statuses?.moderate === 0 && (brief as boolean);

  const { handleChangeProjectStatus } = useChangeProjectStatus("campaign");

  const onChangeStatus = () => {
    handleChangeProjectStatus({ id, isActive: !isActive }).then(() => {
      onUpdate();
    });
  };

  const onNavigate = (e: React.MouseEvent<HTMLElement>) => {
    if (e.ctrlKey) {
      window.open(
        `/app/admin/campaign/${id}`,
        "_blank",
        "rel=noopener noreferrer"
      );
      return;
    }
    navigation(`/app/admin/campaign/${id}`);
  };

  return (
    <>
      <Panel
        isReadyToWork={isReadyToWork}
        isCompleted={isCompleted}
        onClick={onNavigate}
      >
        <Box style={{ marginBottom: "15px" }}>
          <Title level={5} style={{ fontWeight: "800" }}>
            {`[${id}] `}
            {name}
            {autopay && (
              <DollarTwoTone
                twoToneColor="#52c41a"
                style={{ marginLeft: "4px" }}
              />
            )}
          </Title>
          <div>
            {getDate({ date: campaign.date })} ~ {period} мес.
          </div>
        </Box>
        <Box>
          <StatusesFlat statuses={statuses} />
          <Title
            style={{
              fontSize: "14px",
              color: "#8E8E8E",
              textDecorationLine: "underline",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onChangeStatus();
            }}
          >
            {isActive ? "Добавить в архив" : "Убрать из архива"}
          </Title>
        </Box>
      </Panel>
    </>
  );
};
