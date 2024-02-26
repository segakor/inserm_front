import { useState } from "react";
import { FilledSmallButton } from "../../../mainApp/Button/styles";
import { ModalCreateIdea } from "../../../mainApp/components/Modal";

export const ButtonCreateIdeaDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpen = () => {
    setIsModalOpen(true);
  };
  const onModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <FilledSmallButton onClick={onModalOpen}>
        Предложить идею
      </FilledSmallButton>
      {isModalOpen && <ModalCreateIdea onClose={onModalClose} />}
    </>
  );
};
