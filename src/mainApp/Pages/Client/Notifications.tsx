import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";
import { Alert, Button, Input, Space, Form, Checkbox, Spin } from "antd";
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
  }
`;

const SystemGroup = styled.div`
  margin-left: 24px;
`;

const Notifications = () => {
  const state = useLocalState();
  const { personInfo } = state;

  const {
    handleAddTgKey,
    handleGetNotificationSettings,
    handleUpdateNotificationSettings,
    notifySettings,
  } = usePerson();

  const [form] = Form.useForm();
  const [formCheckbox] = Form.useForm();

  const disabledTg = !personInfo?.tgId;

  useEffect(() => {
    form.setFieldValue("tgId", personInfo?.tgId);
  }, [personInfo?.tgId]);

  useEffect(() => {
    handleGetNotificationSettings();
  }, []);

  const formValue = Form.useWatch([], form);
  const formValueCheckbox = Form.useWatch([], formCheckbox);

  const onClick = () => {
    personInfo?.tgId
      ? handleAddTgKey({ tgId: "" })
      : handleAddTgKey({ tgId: formValue.tgId });
  };

  const onFinish = () => {
    handleUpdateNotificationSettings(formValueCheckbox);
  };

  useEffect(() => {
    if (notifySettings) {
      if (
        ["isTgPaid", "isTgFinished", "isTgReview", "isTgSupport", "isTgReport"]
          .map((item) => formValueCheckbox?.[item])
          .includes(true) &&
        !formValueCheckbox?.isTgSystem
      ) {
        formCheckbox.setFieldValue("isTgSystem", true);
      }
    }
  }, [formValueCheckbox]);

  const onClickAll = (e: boolean) => {
    if (e) {
      [
        "isTgPaid",
        "isTgFinished",
        "isTgReview",
        "isTgSupport",
        "isTgReport",
      ].map((item) => formCheckbox.setFieldValue(item, true));
      console.log(1);
    } else {
      [
        "isTgPaid",
        "isTgFinished",
        "isTgReview",
        "isTgSupport",
        "isTgReport",
      ].map((item) => formCheckbox.setFieldValue(item, false));
      console.log(2);
    }
  };

  return (
    <Page>
      <Header>Уведомления</Header>
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
      <Form form={form} initialValues={notifySettings}>
        <Space.Compact size="large">
          <Form.Item name={"tgId"}>
            <Input placeholder="API key" disabled={!!personInfo?.tgId} />
          </Form.Item>
          <Button type="primary" onClick={onClick}>
            {personInfo?.tgId ? "Отключить" : "Подключить"}
          </Button>
        </Space.Compact>
      </Form>
      {notifySettings ? (
        <Form
          form={formCheckbox}
          onFinish={onFinish}
          initialValues={notifySettings}
        >
          <Title level={5}>Email:</Title>
          <Form.Item name={"isEmailInfo"} valuePropName="checked">
            <Checkbox>Информационная рассылка</Checkbox>
          </Form.Item>
          <Title level={5}>Telegram:</Title>
          <Form.Item name={"isTgSystem"} valuePropName="checked">
            <Checkbox
              onChange={(e) => onClickAll(e.target.checked)}
              disabled={disabledTg}
            >
              Системные уведомления
            </Checkbox>
          </Form.Item>
          <SystemGroup>
            <Form.Item name={"isTgPaid"} valuePropName="checked">
              <Checkbox disabled={disabledTg}>Проект оплачен</Checkbox>
            </Form.Item>
            <Form.Item name={"isTgReview"} valuePropName="checked">
              <Checkbox disabled={disabledTg}>Отзыв опубликован</Checkbox>
            </Form.Item>
            <Form.Item name={"isTgFinished"} valuePropName="checked">
              <Checkbox disabled={disabledTg}>Проект закончен</Checkbox>
            </Form.Item>
            <Form.Item name={"isTgSupport"} valuePropName="checked">
              <Checkbox disabled={disabledTg}>Уведомления из чата ТП</Checkbox>
            </Form.Item>
            <Form.Item name={"isTgReport"} valuePropName="checked">
              <Checkbox disabled={disabledTg}>Еженедельный отчет</Checkbox>
            </Form.Item>
          </SystemGroup>
          <Form.Item name={"isTgInfo"} valuePropName="checked">
            <Checkbox disabled={disabledTg}>
              Информационные уведомления
            </Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form>
      ) : (
        <Spin />
      )}
    </Page>
  );
};

export default Notifications;
