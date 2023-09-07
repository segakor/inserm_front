import { useEditCampaign } from "../hooks/useEditCampaign";
import { OutlinedButton } from "./styles";

export const ButtonRemoveCampaign = ({
  campaignId,
}: {
  campaignId: number;
}) => {
  const { handleRemove } = useEditCampaign();

  const onHandleDelete = () => {
    handleRemove(campaignId);
  };
  return (
    <OutlinedButton onClick={onHandleDelete}>Удалить проект</OutlinedButton>
  );
};
