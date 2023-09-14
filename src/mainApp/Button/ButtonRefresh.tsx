import { useEditCampaign } from "../hooks/useEditCampaign";
import { OutlinedButton } from "./styles";

export const ButtonRefresh = ({ campaignId }: { campaignId: number }) => {
  const { handleRefresh } = useEditCampaign();

  const onHandleRefresh = () => {
    handleRefresh(campaignId);
  };
  return (
    <div>
      <OutlinedButton onClick={onHandleRefresh}>Обновить проект</OutlinedButton>
    </div>
  );
};
