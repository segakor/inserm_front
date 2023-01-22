import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useCreateReview } from "../hooks/useCreateReview";


type Props = {
  onClose: () => void;
  projectId: string;
  onUpdate: (project: string) => void;
};

export const ModalCreateReview = ({ onClose, projectId, onUpdate }: Props) => {
  const [form] = Form.useForm();
  const [isErrorValues, setIsErrorValues] = useState(true);

  const { handleCreateReview } = useCreateReview();

  const save = async () => {
    const row = (await form.validateFields());
    handleCreateReview({ ...row, projectId }).then(() => {
      onClose()
      onUpdate(projectId)
    })
  }

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsErrorValues(hasErrors);
  };

  return (
    <>
      <Modal
        title="Добавить запись"
        open
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} component={false} onFieldsChange={handleFormChange}>
          <Form.Item
            name={"text"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Input placeholder="Текст отзыва" />
          </Form.Item>
          <Form.Item
            name={"link"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Input placeholder="Ссылка на отзыв" />
          </Form.Item>
          <Button
            onClick={save}
            type="primary"
            style={{ marginBottom: 16 }}
            block
            disabled={isErrorValues}
          >
            Добавить
          </Button>
        </Form>
      </Modal>
    </>
  );
};

