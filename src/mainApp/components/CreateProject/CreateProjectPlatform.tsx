import { Divider, Form, Input } from "antd";
import { TariffSelectionBlock } from "../TariffSelectionBlock";
import { StyledTitle } from "../CreateCampaign/styles";
import { goToAinoxPage, openNotificationWithIcon } from "../../../utils";
import { formIds } from "../../../constants";

export const CreateProjectPlatform = () => {
  const [form] = Form.useForm();

  const formValue = Form.useWatch([], form);

  const onSelectedTariff = async (tariff: {
    period: number;
    price: number;
    id: number;
  }) => {
    try {
      await form.validateFields();

      const formIdValue = formIds[tariff.id - 1];

      goToAinoxPage({
        email: formValue?.email || "",
        projectName: formValue?.projectName || "",
        formId: formIdValue,
        price: tariff.price || 0,
        period: tariff.period || 0,
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: `Заполните все поля`,
      });
    }
  };

  return (
    <Form form={form}>
      <StyledTitle level={5}>1. Введите название проекта</StyledTitle>
      <Form.Item
        name="projectName"
        rules={[{ required: true, message: "Обязательное поле" }]}
      >
        <Input placeholder="Название проекта" style={{ width: "300px" }} />
      </Form.Item>
      <StyledTitle level={5}>2. Введите ваш email</StyledTitle>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Обязательное поле" },
          {
            type: "email",
            message: "Пожалуйста, введите корректный адрес электронной почты!",
          },
        ]}
      >
        <Input placeholder="email" style={{ width: "300px" }} />
      </Form.Item>
      <Divider />
      <StyledTitle level={5}>3. Выберите тариф</StyledTitle>
      <TariffSelectionBlock onSelectTarif={onSelectedTariff} />
    </Form>
  );
};
