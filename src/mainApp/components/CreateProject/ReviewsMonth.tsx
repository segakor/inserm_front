import React from "react";
import { Divider, Form, Input } from "antd";
import { TariffSelectionBlock } from "../TariffSelectionBlock";
import { StyledTitle } from "../CreateCampaign/styles";
import { goToAinoxPage } from "../../../utils";
import { useLocalState } from "../../context/hooks";
import { formIds } from "../../../constants";

export const ReviewsMonth = () => {
  const [form] = Form.useForm();

  const formValue = Form.useWatch([], form);

  const state = useLocalState();
  const { personInfo } = state;

  const onSelectedTariff = (tariff: {
    period: number;
    price: number;
    id: number;
  }) => {
    const formIdValue = formIds[tariff.id - 1];

    goToAinoxPage({
      email: personInfo?.email || "",
      projectName: formValue?.projectName || "",
      formId: formIdValue,
      price: tariff.price || 0,
      period: tariff.period || 0,
    });
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
      <Divider />
      {formValue?.projectName && (
        <>
          <StyledTitle level={5}>2. Выберите тариф</StyledTitle>
          <TariffSelectionBlock onSelectTarif={onSelectedTariff} />
        </>
      )}
    </Form>
  );
};
