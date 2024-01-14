import { OutlinedButton } from "./styles";
import { useNavigate } from "react-router-dom";

export const ButtonRefresh = ({ campaignId }: { campaignId: number }) => {
  const navigation = useNavigate();

  return (
    <div>
      <OutlinedButton
        onClick={() => navigation(`/app/client/updateproject/${campaignId}`)}
      >
        Обновить проект
      </OutlinedButton>
    </div>
  );
};
