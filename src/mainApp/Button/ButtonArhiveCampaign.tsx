import { useState } from "react";
import { OutlinedButton } from "./styles";
import { ModalСonfirmation } from "../components/Modal";
import { confirmationText } from "../../constants";
import { useChangeProjectStatus } from "../hooks/useChangeProjectStatus";
import { useDispatch } from "../context/hooks";
import { removeProject } from "../context/action";

export const ButtonArhiveCampaign = ({
  id,
  type,
  isActive,
}: {
  id: number;
  type: "project" | "campaign";
  isActive: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const { handleChangeProjectStatus } = useChangeProjectStatus(type);

  const onChangeStatus = () => {
    handleChangeProjectStatus({ id, isActive: !isActive }).then(() => {
      console.log('sdasd')
      dispatch(removeProject({ id, type }));
    });
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onHandleDelete = () => {
    onChangeStatus();
    handleClose();
  };

  return (
    <div>
      <OutlinedButton onClick={handleOpen}>В архив</OutlinedButton>
      {isModalOpen && (
        <ModalСonfirmation
          onClose={handleClose}
          onConfirm={onHandleDelete}
          confirmationText={confirmationText.archiveProjectClient}
        />
      )}
    </div>
  );
};
