import { useState } from "react";
import { OutlinedButton } from "./styles";
import { ModalСonfirmation } from "../components/Modal";
import { confirmationText } from "../../constants";

export const ButtonDeleteCampaign = ({
  campaignId,
}: {
  campaignId: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onHandleDelete = () => {
    handleClose();
    alert(`Пока не готово! ${campaignId}`);
  };

  return (
    <div>
      <OutlinedButton onClick={handleOpen}>Удалить проект</OutlinedButton>
      {isModalOpen && (
        <ModalСonfirmation
          onClose={handleClose}
          onConfirm={onHandleDelete}
          confirmationText={confirmationText.removeCampaign}
        />
      )}
    </div>
  );
};
