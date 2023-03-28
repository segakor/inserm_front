import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio } from "antd";
import { useCreateProjectByAdmin } from "../hooks/useCreateProjectAdmin";

type Props = {
  onClose: () => void;
  onUpdate: () => void;
};

const option = [
  { label: "Тариф S", value: 1 },
  { label: "Тариф M", value: 2 },
  { label: "Тариф L", value: 3 },
];

export const ModalCreateProjectByAdmin = ({ onClose, onUpdate }: Props) => {
  const [form] = Form.useForm();
  const [isErrorValues, setIsErrorValues] = useState(true);

  const { isLoading, handleCreateProjectByAdmin } = useCreateProjectByAdmin();

  const save = async () => {
    const row = await form.validateFields();
    console.log(row);
    handleCreateProjectByAdmin({ ...row }).then(() => {
      onClose();
      onUpdate();
    });
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsErrorValues(hasErrors);
  };

  return (
    <>
      <Modal
        title="Создать проект"
        open
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} component={false} onFieldsChange={handleFormChange}>
          <Form.Item
            name={"email"}
            rules={[
              {
                type: "email",
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name={"name"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Input placeholder="Название проекта" />
          </Form.Item>
          <Form.Item
            name={"tariffId"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Radio.Group
              options={option}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            name={"price"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <InputNumber
              placeholder="Цена"
              style={{ width: "100%" }}
              prefix="₽"
            />
          </Form.Item>
          <Button
            onClick={save}
            type="primary"
            style={{ marginBottom: 16 }}
            block
            disabled={isErrorValues}
            loading={isLoading}
          >
            Создать
          </Button>
        </Form>
      </Modal>
    </>
  );
};
