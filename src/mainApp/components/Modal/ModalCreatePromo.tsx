import { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { usePromo } from "../../hooks/usePromo";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { toUnixDate } from "../../../utils";

type Props = {
  onClose: () => void;
  onUpdate: () => void;
};

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export const ModalCreatePromo = ({ onClose, onUpdate }: Props) => {
  const [form] = Form.useForm();
  const [isErrorValues, setIsErrorValues] = useState(true);

  const { handleCreatePromo } = usePromo();


  const save = async () => {
    const row = await form.validateFields();
    row.start = toUnixDate(row.start?.$d);
    row.end = toUnixDate(row.end?.$d)
    handleCreatePromo({ ...row }).then(() => {
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
        title="Добавить промокод"
        open
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <Form form={form} component={false} onFieldsChange={handleFormChange}>
          <Form.Item
            name={"name"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <Input placeholder="Промокод" />
          </Form.Item>
          <Form.Item
            name={"start"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format={"DD-MM-YYYY"}
              locale={locale}
              placeholder={'Дата с'}
            />
          </Form.Item>
          <Form.Item
            name={"end"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format={"DD-MM-YYYY"}
              locale={locale}
              placeholder={'Дата по'}
            />
          </Form.Item>
          <Form.Item
            name={"giftCount"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <InputNumber
              placeholder="Колличество отзывов в подарок"
              style={{ width: "100%" }}
              min={1}
            />
          </Form.Item>
          <Form.Item
            name={"minCount"}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <InputNumber
              placeholder="Покупка от (условие промокода)"
              style={{ width: "100%" }}
              min={3}
            />
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
