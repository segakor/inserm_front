import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";
import { Alert, Button, Input, Space, Form, Checkbox } from "antd";
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
    /* margin: 0; */
  }
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
  const [form2] = Form.useForm();

  const disabledTg = !personInfo?.tgId;

  useEffect(() => {
    form.setFieldValue("tgId", personInfo?.tgId);
  }, [personInfo?.tgId]);

  useEffect(() => {
    handleGetNotificationSettings();
    form2.setFieldValue("isEmailInfo", notifySettings?.isEmailInfo);
    form2.setFieldValue("isTgInfo", notifySettings?.isTgInfo);
    form2.setFieldValue("isTgSystem", notifySettings?.isTgSystem);
  }, []);

  useEffect(() => {
    form2.setFieldValue("isEmailInfo", notifySettings?.isEmailInfo);
    if (disabledTg) {
      form2.setFieldValue("isTgInfo", false);
      form2.setFieldValue("isTgSystem", false);
    } else {
      form2.setFieldValue("isTgInfo", notifySettings?.isTgInfo);
      form2.setFieldValue("isTgSystem", notifySettings?.isTgSystem);
    }
  }, [notifySettings, personInfo?.tgId]);

  const formValue = Form.useWatch([], form);
  const formValue2 = Form.useWatch([], form2);

  const onClick = () => {
    personInfo?.tgId
      ? handleAddTgKey({ tgId: "" })
      : handleAddTgKey({ tgId: formValue.tgId });
  };

  const onFinish = () => {
    handleUpdateNotificationSettings(formValue2);
  };

  const disabledSaveForm2 =
    formValue2?.isEmailInfo === notifySettings?.isEmailInfo &&
    formValue2?.isTgInfo === notifySettings?.isTgInfo &&
    formValue2?.isTgSystem === notifySettings?.isTgSystem;

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
      <Form form={form}>
        <Space.Compact size="large">
          <Form.Item name={"tgId"}>
            <Input placeholder="API key" disabled={!!personInfo?.tgId} />
          </Form.Item>
          <Button type="primary" onClick={onClick}>
            {personInfo?.tgId ? "Отключить" : "Подключить"}
          </Button>
        </Space.Compact>
      </Form>
      <Form form={form2} onFinish={onFinish}>
        <Title level={5}>Email:</Title>
        <Form.Item name={"isEmailInfo"} valuePropName="checked">
          <Checkbox>Информационная рассылка</Checkbox>
        </Form.Item>
        <Title level={5}>Telegram:</Title>
        <Form.Item name={"isTgSystem"} valuePropName="checked">
          <Checkbox disabled={disabledTg}>Системные уведомления</Checkbox>
        </Form.Item>
        <Form.Item name={"isTgInfo"} valuePropName="checked">
          <Checkbox disabled={disabledTg}>Информационные уведомления</Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={disabledSaveForm2}>
          Сохранить
        </Button>
      </Form>
    </Page>
  );
};

export default Notifications;
