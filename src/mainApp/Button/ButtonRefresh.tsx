import { OutlinedButton } from "./styles";
import { useNavigate, createSearchParams } from "react-router-dom";

export const ButtonRefresh = ({
  campaignId,
  isCashless,
}: {
  campaignId: number;
  isCashless?: boolean;
}) => {
  const navigate = useNavigate();

  const goToUpdate = () => {
    navigate({
      pathname: `/app/client/updateproject/${campaignId}`,
      ...(isCashless && {
        search: createSearchParams({
          isCashless: isCashless && "true",
        }).toString(),
      }),
    });
  };

  return (
    <div>
      <OutlinedButton onClick={goToUpdate}>Повторить заказ</OutlinedButton>
    </div>
  );
};
