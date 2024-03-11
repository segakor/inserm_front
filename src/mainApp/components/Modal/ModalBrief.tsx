import styled from "styled-components";
import { Modal, Form, Input, Button } from "antd";
import { Title } from "../../../common/Typography";
import { useCreateBrief } from "../../hooks/useCreateBrief";
import { Brief } from "../../../types";
import { briefField, confirmationText } from "../../../constants";
import { useState } from "react";
import { ModalСonfirmation } from "./ModalСonfirmation";
import { NotesBrief } from "../NotesBrief";

const { TextArea } = Input;

const StyledTitle = styled(Title)`
  margin-bottom: 40px !important;
`;
const StyledTextArea = styled(TextArea)`
  border-radius: 10px;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 50px;
  background: transparent;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

type Props = {
  onClose: () => void;
  id: string;
  brief: Brief | undefined;
  typeBrief: "campaign" | "project";
};

export const ModalBrief = ({ onClose, id, brief, typeBrief }: Props) => {
  const { handleCreateBrief, isLoading: isLoadingCreate } = useCreateBrief();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [form] = Form.useForm();
  const formValue = Form.useWatch([], form);

  let fieldValue = {
    ...formValue,
  };

  if (typeBrief === "project") {
    fieldValue.projectId = id;
  } else {
    fieldValue.campaignId = id;
  }

  const isBrief = brief ? true : false;

  const field =
    typeBrief === "project"
      ? briefField.mainField
      : briefField.mainField.filter((item) => !item?.canHide);

  const onFinish = (values: any) => {
    handleCreateBrief(fieldValue).then(() => onClose());
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };
  const handleConfirmModalOpen = () => {
    setIsConfirmModalOpen(true);
  };

  const handleClose = () => {
    if (form.isFieldsTouched()) {
      handleConfirmModalOpen();
      return;
    }
    onClose();
  };

  return (
    <Modal
      title="Заполните бриф"
      open
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <StyledTitle level={5} style={{ fontWeight: "400" }}>
        Обратите внимание, что бриф по проекту заполняется{" "}
        <b>1 раз (внимательно проверьте все ответы перед сохранением)</b>. Далее
        бриф передается в работу и внести правки в него вы не сможете. Вы
        сможете просмотреть бриф в любое время на странице конкретного проекта.
      </StyledTitle>
      <Form
        layout={"vertical"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={brief}
      >
        {field.map((item, index) => (
          <Form.Item
            label={item.label}
            name={item.name}
            key={index}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledTextArea autoSize disabled={isBrief} />
          </Form.Item>
        ))}
        {!isBrief && (
          <StyledButton
            type="primary"
            disabled={isBrief}
            htmlType="submit"
            loading={isLoadingCreate}
          >
            Сохранить
          </StyledButton>
        )}
        {brief && <NotesBrief brief={brief} />}
      </Form>
      {isConfirmModalOpen && (
        <ModalСonfirmation
          onClose={handleConfirmModalClose}
          onConfirm={onClose}
          confirmationText={confirmationText.brief}
        />
      )}
    </Modal>
  );
};
