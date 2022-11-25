import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Form, Input } from "antd";
import { Title } from "./Typography";

const { TextArea } = Input;

const StyledTitle = styled(Title)`
  margin-bottom: 40px !important;
`;
const StyledTextArea = styled(TextArea)`
  border-radius: 10px;
`;

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const ModalBrif = ({ onClose, isOpen }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('modal')
  }, [])
  return (
    <Modal
      title="Заполните бриф"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <StyledTitle level={5} style={{ fontWeight: "400" }}>
        Обратите внимание, что бриф по проекту заполняется{" "}
        <b>
          1 раз (внимательно проверьте все ответы перед сохранением)
        </b>
        . Далее бриф передается в работу и внести правки в него вы не сможете.
        Вы сможете просмотреть бриф в любое время на странице конкретного
        проекта.
      </StyledTitle>
      <Form layout={"vertical"} form={form} disabled>
        <Form.Item label="Укажите название проекта:">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Ссылка на ваш сайт">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Пожелания к текстам отзывов">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="По каким направлениям деятельности нужны отзывы (о каких товарах / услугах писать):">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="В каких городах происходит реализация ваших товаров/услуг:">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Имена сотрудников и их обязанности (чтобы мы могли отметить их хорошую работу):">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Опишите преимущества вашей компании:">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Опишите недостатки вашей компании:">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Ссылки на профили вашей компании, где необходимо размещать отзывы:">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Когда вы заказывали отзывы в последний раз/когда последний раз публиковались заказные отзывы на вышеперечисленных площадках?">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Какие моменты следует обязательно отметить в отзывах:">
          <StyledTextArea style={{ height: 50, resize: "none" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
