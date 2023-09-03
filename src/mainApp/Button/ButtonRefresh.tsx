import { Button } from "antd";
import styled from "styled-components";
import { useRefreshCampaign } from "../hooks/useRefreshCampaign";

const StyledButton = styled(Button)`
  border-radius: 10px;
  width: 180px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

export const ButtonRefresh = ({ campaignId }: { campaignId: number }) => {
  const { handleRefresh } = useRefreshCampaign();

  const onHandleRefresh = () => {
    handleRefresh(campaignId);
  };
  return <StyledButton onClick={onHandleRefresh}>Обновить проект</StyledButton>;
};
