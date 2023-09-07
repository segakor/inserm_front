import { Button, Modal, Input } from "antd";
import { Title } from "../../../common/Typography";
import styled from "styled-components";
import { useState } from "react";
import { useIdea } from "../../hooks/useIdea";

const { TextArea } = Input;

type Props = {
  onClose: () => void;
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

export const ModalCreateIdea = ({ onClose }: Props) => {
  const [value, setValue] = useState("");
  const { handleCreate } = useIdea();

  const onHandleCreate = async () => {
    await handleCreate(value);
    onClose();

  }

  return (
    <>
      <Modal onCancel={onClose} open footer={null} width={"400px"}>
        <Title level={5} style={{ fontWeight: "400" }}>
          Хотите предложить идею для улучшения нашего сервиса? Оставьте свое
          предложение в форме ниже
        </Title>
        <TextArea
          rows={4}
          style={{ marginTop: 20, height: 120, resize: "none" }}
          onChange={(e) => setValue(e.target.value)}
        />
        <FooterButton>
          <StyledButton
            isOk={true}
            onClick={onHandleCreate}
            loading={false}
            disabled={!value.length}
          >
            Отправить
          </StyledButton>
          <StyledButton isOk={false} onClick={onClose}>
            Отмена
          </StyledButton>
        </FooterButton>
      </Modal>
    </>
  );
};
