import { Button, Badge } from "antd";
import styled from "styled-components";
import { ExclamationCircleFilled } from "@ant-design/icons";

const StyledButton = styled(Button) <{ brief: boolean }>`
  border-radius: 10px;
  width: 180px;
  height: 50px;
  background-color: ${(props) => (props.brief ? "transparent" : "#1579E9")};
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: ${(props) => (props.brief ? "#1579E9" : "#FFFFFF")};
`;

type Props = {
  brief: boolean;
  onClick: () => void;
};

export const ButtonBrief = ({ brief, onClick }: Props) => {
  return (
    <Badge
      count={
        !brief ? (
          <ExclamationCircleFilled
            style={{ color: "#f5222d", fontSize: "20px" }}
          />
        ) : (
          0
        )
      }
    >
      <StyledButton onClick={onClick} brief={brief}>
        {brief ? "Открыть бриф" : "Заполнить бриф"}
      </StyledButton>
    </Badge>
  );
};
