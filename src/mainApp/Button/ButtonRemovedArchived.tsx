import { useState } from "react";
import { useReturnArchived } from "../hooks/useReturnArchived";
import { OutlinedButton } from "./styles";
import { ModalСonfirmation } from "../components/Modal";
import { confirmationText } from "../../constants";

export const ButtonRemovedArchived = ({
  onUpdate,
  campaignId,
}: {
  campaignId: number;
  onUpdate: (campaignId: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleReturnArchived } = useReturnArchived();

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onHandleDelete = () => {
    handleReturnArchived({ id: campaignId });
    handleClose();
    onUpdate(campaignId.toString());
  };

  return (
    <div>
      <OutlinedButton onClick={handleOpen}>
        Удалить последнюю архивацию
      </OutlinedButton>
      {isModalOpen && (
        <ModalСonfirmation
          onClose={handleClose}
          onConfirm={onHandleDelete}
          confirmationText={confirmationText.removedArchived}
        />
      )}
    </div>
  );
};
