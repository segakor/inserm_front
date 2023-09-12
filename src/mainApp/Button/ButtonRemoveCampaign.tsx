import { useState } from "react";
import { useEditCampaign } from "../hooks/useEditCampaign";
import { OutlinedButton } from "./styles";
import { ModalСonfirmation } from "../components/Modal";
import { confirmationText } from "../../constants";

export const ButtonRemoveCampaign = ({
  campaignId,
}: {
  campaignId: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleRemove } = useEditCampaign();

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onHandleDelete = () => {
    handleRemove(campaignId);
    handleClose();
  };

  return (
    <>
      <OutlinedButton onClick={handleOpen}>Удалить проект</OutlinedButton>
      {isModalOpen && (
        <ModalСonfirmation
          onClose={handleClose}
          onConfirm={onHandleDelete}
          confirmationText={confirmationText.removeCampaign}
        />
      )}
    </>
  );
};
