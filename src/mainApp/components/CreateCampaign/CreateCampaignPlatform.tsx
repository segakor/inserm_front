import React, { useState } from "react";
import { Divider, Form, Input } from "antd";
import { StyledTitle, Wrapper } from "./styles";
import { ListOfAreaCheckBox } from "./ListOfAreaCheckBox";
import { ListOfAreaItem } from "./ListOfAreaItem";
import { Price } from "./Price";
import { Footer } from "./Footer";
import { getCountReviews } from "../../../utils/getCountReviews";
import { useCreateCampaign } from "../../hooks/useCreateCampaign";
import { openNotificationWithIcon } from "../../../utils";
import { useGetCampaignTariff } from "../../hooks/useGetCampaignTariff";

export const CreateCampaignPlatform = () => {
  const [selectedArea, setSelectedArea] = useState<string[]>([]);

  const handleClickArea = (area: string) => {
    selectedArea.find((item) => item === area)
      ? setSelectedArea((prev) => prev.filter((item) => item !== area))
      : setSelectedArea((prev) => [...prev, area]);
  };
  const [form] = Form.useForm();

  const formValue = Form.useWatch([], form);

  const { campaignTariff, isLoading: isLoadingTariff } = useGetCampaignTariff();

  const { count, priceForOne, priceTotal, month, cards } = getCountReviews(
    formValue,
    campaignTariff
  );

  const { handleCreateCampaign, isLoading } = useCreateCampaign();

  const onFinish = (values: any) => {
    console.log("Success:", values);

    if (count < 2) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: `Покупка возможна от 2-х штук`,
        placement: "topRight",
      });
      return;
    }

    let value = {
      email: formValue?.email || "",
      name: formValue?.projectName || "",
      cards,
      brief: formValue?.importBrief
        ? JSON.parse(formValue?.importBrief)
        : undefined,
    };

    handleCreateCampaign(value, priceTotal);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    openNotificationWithIcon({
      type: "error",
      message: "",
      description: `Заполните все поля`,
    });
  };

  return (
    <Wrapper>
      <Form
        name="reviewPiece"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        disabled={isLoading || isLoadingTariff}
      >
        <Price
          tariff={campaignTariff || []}
          isLoadingTariff={isLoadingTariff}
        />
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
              message:
                "Пожалуйста, введите корректный адрес электронной почты!",
            },
          ]}
        >
          <Input placeholder="email" style={{ width: "300px" }} />
        </Form.Item>
        <Divider />
        {formValue?.projectName && (
          <>
            <StyledTitle level={5}>
              3. Выберите нужные площадки для размещения отзывов (наша компания
              работает только с данными площадками)
            </StyledTitle>
            <ListOfAreaCheckBox
              handleClickArea={handleClickArea}
              selectedArea={selectedArea}
              isLoading={isLoading}
            />
          </>
        )}
        {!!selectedArea.length && formValue?.projectName && (
          <ListOfAreaItem
            selectedArea={selectedArea}
            priceForOne={priceForOne}
            form={form}
          />
        )}
        {count > 0 && (
          <Footer
            count={count}
            priceForOne={priceForOne}
            month={month}
            isLoading={isLoading}
          />
        )}
      </Form>
    </Wrapper>
  );
};
