import { Button, Modal } from "antd";
import { Title } from "../../../common/Typography";
import styled from "styled-components";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
  confirmationText: string;
  isLoading?: boolean;
};

const StyledButton = styled(Button)<{ isOk: boolean }>`
  border-radius: 10px;
  width: 150px;
  height: 50px;
  background: ${(props) => (props.isOk ? "#1579e9" : "#313131")};
  font-size: 16px;
  color: white;
  :hover {
    color: white !important;
  }
`;

const FooterButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  grid-gap: 15px;
`;

export const ModalСonfirmation = ({
  onClose,
  onConfirm,
  confirmationText,
  isLoading,
}: Props) => {
  return (
    <>
      <Modal onCancel={onClose} open footer={null} width={"400px"} title="Подтвердите выбор">
        <Title
          level={5}
          style={{ fontWeight: "400", marginTop: "16px" }}
        >
          {confirmationText}
        </Title>
        <FooterButton>
          <StyledButton isOk={true} onClick={onConfirm} loading={isLoading}>
            Ок
          </StyledButton>
          <StyledButton isOk={false} onClick={onClose}>
            Отмена
          </StyledButton>
        </FooterButton>
      </Modal>
    </>
  );
};
