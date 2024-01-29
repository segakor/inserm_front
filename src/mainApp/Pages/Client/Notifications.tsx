import styled from "styled-components";
import { Header } from "../../../common/Typography";
import { Alert, Button, Input, Space, Form } from "antd";
import { usePerson } from "../../hooks/usePerson";
import { useLocalState } from "../../context/hooks";
import { useEffect } from "react";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .ant-alert {
    width: 50%;
    margin: 0;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .ant-form {
    width: 50%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .ant-space-compact {
    width: 100%;
  }
  .ant-form-item {
    width: 100%;
    margin: 0;
  }
`;

const Notifications = () => {
  const state = useLocalState();
  const { personInfo } = state;

  const { handleAddTgKey } = usePerson();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("tgId", personInfo?.tgId);
  }, [personInfo?.tgId]);

  const formValue = Form.useWatch([], form);

  const onClick = () => {
    personInfo?.tgId
      ? handleAddTgKey({ tgId: "" })
      : handleAddTgKey({ tgId: formValue.tgId });
  };

  return (
    <Page>
      <Header>Интеграция с telegram</Header>
      <Alert
        message="Подключение сервиса приёма данных Telegram"
        description={
          <span>
            Получайте уведомления в Telegram с помощью нашего бота. Для этого
            перейдите по ссылке:{" "}
            <a href="https://t.me/inserm_bot" target="_blank">
              https://t.me/inserm_bot
            </a>{" "}
            и напишите команду /start. Бот активируется и покажет API key,
            который нужно вставить в поле ниже и сохранить.
          </span>
        }
        type="info"
        showIcon
        style={{ marginBottom: "24px" }}
      />
      <Form form={form}>
        <Space.Compact size="large">
          <Form.Item name={"tgId"}>
            <Input placeholder="API key" />
          </Form.Item>
          <Button type="primary" onClick={onClick}>
            {personInfo?.tgId ? "Отключить" : "Сохранить"}
          </Button>
        </Space.Compact>
      </Form>
    </Page>
  );
};

export default Notifications;
