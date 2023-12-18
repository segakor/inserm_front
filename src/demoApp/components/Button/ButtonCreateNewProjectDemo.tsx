import { Button } from "antd";
import styled from "styled-components";

const OutlinedButton = styled(Button)`
  border-radius: 10px;
  min-width: 180px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

export const ButtonCreateNewProjectDemo = () => {
  return (
    <OutlinedButton disabled>
      Создать новый проект
    </OutlinedButton>
  );
};
