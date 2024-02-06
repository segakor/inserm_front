import { useState } from "react";
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
import { PaymentType } from "./PaymentType";
import { CashlessBlock } from "./CashlessBlock";
import { RecurentSwitch } from "./RecurentSwitch";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCampaignDetails } from "../../hooks/useGetCampaignDetails";
import { usePerson } from "../../hooks/usePerson";
import { useLocalState } from "../../context/hooks";

export const UpdateProject = () => {
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [isErrorForm, setIsErrorForm] = useState(false);

  usePerson();
  const state = useLocalState();
  const { personInfo, clientCampaign, clientProject } = state;

  const params = useParams();
  const campaignId = params.id || "";
  const [searchParams] = useSearchParams();
  const isCashless = Boolean(searchParams.get("isCashless"));

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

  const { handleCreateCampaign, isLoading, invoiceTemplate } =
    useCreateCampaign();

  const onFinish = (values: any) => {
    console.log("Success:", values);

    let value = {
      email: personInfo?.email || "",
      name: formValue?.projectName.trim() || "",
      cards,
      brief: {
        type: "campaign" as any,
        id: campaignId as any,
      },
      promo: formValue?.promoLink
        ? {
            name: formValue?.promoCode,
            link: formValue?.promoLink,
            type: formValue?.promoAreaType,
          }
        : undefined,
    };

    let isRecurent = formValue?.isRecurent;

    let cashlessData =
      formValue.paymentType === "cashless"
        ? {
            company: formValue?.company,
            inn: formValue?.inn,
            ogrn: formValue?.ogrn,
            email: personInfo?.email || 'personInfo?.email',
            phone: formValue?.phone,
            address: formValue?.address,
          }
        : null;

    handleCreateCampaign(value, priceTotal, cashlessData, isRecurent);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    openNotificationWithIcon({
      type: "error",
      message: "",
      description: `Заполните все поля`,
    });
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsErrorForm(hasErrors);
  };

  const { isLoading: isLoadingDetails } = useGetCampaignDetails({
    id: campaignId,
    form,
    setArea: setSelectedArea,
    isCashless
  });

  const allProject = [clientCampaign, clientProject].flat();

  const listOfProject = allProject?.map((item) => ({
    label: item?.name,
    value: JSON.stringify({
      id: item?.id,
      type: item?.type,
    }),
  }));

  return (
    <Form
      name="reviewPiece"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      disabled={isLoading || isLoadingTariff || isLoadingDetails}
      layout="vertical"
      initialValues={{
        paymentType: isCashless ? "cashless" : "card",
        isRecurent: true,
      }}
      onFieldsChange={handleFormChange}
    >
      <Price tariff={campaignTariff || []} isLoadingTariff={isLoadingTariff} />
      <Wrapper>
        <StyledTitle level={5}>1. Введите название проекта</StyledTitle>
        <Form.Item
          name="projectName"
          rules={[
            { required: true, message: "Обязательное поле" },
            {
              validator: (_, value) => {
                if (
                  listOfProject?.find((item) => item.label === value.trim())
                ) {
                  return Promise.reject(
                    "Проект с таким названием уже существует"
                  );
                }

                if (/[`~!@#№$%^&*_|+=?;:'"<>”“‘’]/gi.test(value)) {
                  return Promise.reject(
                    "Спецсимволы ~!@#№$%^&*_|+=?;:'<>”“‘’ недоступны"
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Название проекта" style={{ width: "300px" }} />
        </Form.Item>
        <Divider />
        {formValue?.projectName && (
          <>
            <StyledTitle level={5}>
              2. Выберите нужные площадки для размещения отзывов
            </StyledTitle>
            <p>На данный момент мы работаем с площадками:</p>
            <ListOfAreaCheckBox
              handleClickArea={handleClickArea}
              selectedArea={selectedArea}
              isLoading={isLoading}
            />
          </>
        )}
        {!!selectedArea.length && formValue?.projectName && (
          <>
            <StyledTitle level={5}>
              3. Укажите ссылки на карточки вашей компании и количество отзывов
              для каждой карточки
            </StyledTitle>
            <ListOfAreaItem
              selectedArea={selectedArea}
              priceForOne={priceForOne}
              form={form}
            />
          </>
        )}
        {count > 0 && (
          <>
            <StyledTitle level={5}>4. Выберите способ оплаты</StyledTitle>
            <PaymentType />
            {formValue.paymentType !== "cashless" && <RecurentSwitch />}
            {formValue.paymentType === "cashless" && <CashlessBlock />}
            <Footer
              count={count}
              priceForOne={priceForOne}
              month={month}
              isLoading={isLoading}
              invoiceTemplate={invoiceTemplate}
              isCashless={formValue.paymentType === "cashless"}
              isErrorForm={isErrorForm}
            />
          </>
        )}
      </Wrapper>
    </Form>
  );
};
