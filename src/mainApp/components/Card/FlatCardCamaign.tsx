import { useNavigate } from "react-router-dom";
import { Title } from "../../../common/Typography";
import { Campaign } from "../../../types";
import { getDate, tokenService } from "../../../utils";
import { Box, Panel } from "./styles";
import { StatusesFlat } from "./StatusesFlat";
import { useChangeProjectStatus } from "../../hooks/useChangeProjectStatus";

type Props = {
  campaign: Campaign;
  isActive: boolean;
  onUpdate: () => void;
};

export const FlatCardCampaign = ({ campaign, isActive, onUpdate }: Props) => {
  const { period, statuses, name, id, brief } = campaign;

  const navigation = useNavigate();
  const isAdminRole = tokenService.getIsAdmin();

  const isCompleted = (statuses?.success || 0) >= (statuses?.all || 0);
  const isReadyToWork = statuses?.moderate === 0 && (brief as boolean);

  const { handleChangeProjectStatus } = useChangeProjectStatus("campaign");

  const onChangeStatus = () => {
    handleChangeProjectStatus({ id, isActive: !isActive }).then(() => {
      onUpdate();
    });
  };

  return (
    <>
      <Panel
        isReadyToWork={isReadyToWork}
        isCompleted={isCompleted}
        onClick={() =>
          navigation(`/app/${isAdminRole ? "admin" : "client"}/campaign/${id}`)
        }
      >
        <Box style={{ marginBottom: "15px" }}>
          <Title level={5} style={{ fontWeight: "800" }}>
            {`[${id}] `}
            {name}
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
