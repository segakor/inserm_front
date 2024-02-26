import styled from "styled-components";
import { Alert, Button, Input, Space, Form } from "antd";
import { Header } from "../../common/Typography";

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

export const NotificationsDemo = () => {
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
      <Form>
        <Space.Compact size="large">
          <Form.Item name={"tgId"}>
            <Input placeholder="API key" defaultValue={648462635} disabled />
          </Form.Item>
          <Button type="primary" disabled>
            Отключить
          </Button>
        </Space.Compact>
      </Form>
    </Page>
  );
};
