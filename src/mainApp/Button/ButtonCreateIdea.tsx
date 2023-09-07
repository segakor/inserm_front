import { useState } from "react";
import { FilledSmallButton } from "./styles";
import { ModalCreateIdea } from "../components/Modal";

export const ButtonCreateIdea = () => {
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
