import { Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)`
  border-radius: 10px;
  width: 180px;
  height: 50px;
  background: transparent;
  margin-bottom: 20px;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

export const ButtonCreateNewProject = () => {
  const navigation = useNavigate();
  //TODO: объединить, сделать униварсальной для кнопок ./Button
  return (
    <StyledButton onClick={() => navigation(`/app/client/createproject`)}>
      Создать новый проект
    </StyledButton>
  );
};
