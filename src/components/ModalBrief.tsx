import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Form, Input, Button } from "antd";
import { Title } from "./Typography";
import { useSendBrief } from '../hooks/useSendBrief';

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
  projectId: string;
  brief: string | undefined;
};

export const ModalBrief = ({ onClose, projectId, brief }: Props) => {
  const [form] = Form.useForm();

  const [isErrorValues, setIsErrorValues] = useState(true);
  const [isEmptyValues, setIsEmptyValues] = useState(true);

  const disabledSave = isErrorValues || isEmptyValues;

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsErrorValues(hasErrors);
  };

  const { handeSendBrief } = useSendBrief();

  const onSumbit = () => {
    const fieldValue = [];
    for (let i = 1; i < 12; i++) {
      fieldValue.push({
        key: `field_${i}`,
        value: form.getFieldValue(`field_${i}`),
      });
    }
    console.log(fieldValue);

    handeSendBrief(projectId, JSON.stringify(fieldValue))
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (
      allValues.field_1 === undefined ||
      allValues.field_2 === undefined ||
      allValues.field_3 === undefined ||
      allValues.field_4 === undefined ||
      allValues.field_5 === undefined ||
      allValues.field_6 === undefined ||
      allValues.field_7 === undefined ||
      allValues.field_8 === undefined ||
      allValues.field_9 === undefined ||
      allValues.field_10 === undefined ||
      allValues.field_11 === undefined
    ) {
      setIsEmptyValues(true);
    } else setIsEmptyValues(false);
  };

  return (
    <Modal
      title="Заполните бриф"
      open
      onOk={onClose}
      onCancel={onClose}
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
        onFieldsChange={handleFormChange}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="Укажите название проекта:"
          name="field_1"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Ссылка на ваш сайт"
          name="field_2"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Пожелания к текстам отзывов"
          name="field_3"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="По каким направлениям деятельности нужны отзывы (о каких товарах / услугах писать):"
          name="field_4"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="В каких городах происходит реализация ваших товаров/услуг:"
          name="field_5"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Имена сотрудников и их обязанности (чтобы мы могли отметить их хорошую работу):"
          name="field_6"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Опишите преимущества вашей компании:"
          name="field_7"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Опишите недостатки вашей компании:"
          name="field_8"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Ссылки на профили вашей компании, где необходимо размещать отзывы:"
          name="field_9"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Когда вы заказывали отзывы в последний раз/когда последний раз публиковались заказные отзывы на вышеперечисленных площадках?"
          name="field_10"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item
          label="Какие моменты следует обязательно отметить в отзывах:"
          name="field_11"
          rules={[
            {
              required: true,
              message: "Обязательное поле",
            },
          ]}
        >
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <StyledButton
          type="primary"
          block
          onClick={onSumbit}
          disabled={disabledSave}
        >
          Сохранить
        </StyledButton>
      </Form>
    </Modal>
  );
};
