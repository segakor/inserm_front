import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { usePromo } from "../../hooks/usePromo";
import "dayjs/locale/zh-cn";
import { toUnixDate } from "../../../utils";
import { News } from "../../../types";

type Props = {
  onClose: () => void;
  onCreate: (value: News) => void;
};

export const ModalCreateNews = ({ onClose, onCreate }: Props) => {
  const [form] = Form.useForm();
  const [isErrorValues, setIsErrorValues] = useState(true);

  const save = async () => {
    const row = await form.validateFields();
    onCreate({...row})
    onClose();
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsErrorValues(hasErrors);
  };

  return (
    <>
      <Modal
        title="Добавить новость"
        open
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} component={false} onFieldsChange={handleFormChange}>
          <Form.Item
            name={"title"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Input placeholder="Заголовок" />
          </Form.Item>
          <Form.Item
            name={"description"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Input placeholder="Описание" />
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
