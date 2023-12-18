import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "./styles";

export const ButtonCreateNewProject = () => {
  const navigation = useNavigate();
  //TODO: объединить, сделать униварсальной для кнопок ./Button
  return (
    <div>
      <OutlinedButton onClick={() => navigation(`/app/client/createproject`)}>
        Создать новый проект
      </OutlinedButton>
    </div>
  );
};
