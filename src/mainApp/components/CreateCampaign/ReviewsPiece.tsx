import { useState } from "react";
import { Form } from "antd";
import { useLocalState } from "../../context/hooks";
import { StyledTitle, Wrapper } from "./styles";
import { ListOfAreaCheckBox } from "./ListOfAreaCheckBox";
import { ListOfAreaItem } from "./ListOfAreaItem";
import { Price } from "./Price";
import { Footer } from "./Footer";
import { getCountReviews } from "../../../utils/getCountReviews";
import { useCreateCampaign } from "../../hooks/useCreateCampaign";
import { ProjectName } from "./ProjectName";
import { openNotificationWithIcon } from "../../../utils";
import { useGetCampaignTariff } from "../../hooks/useGetCampaignTariff";
import { CashlessBlock } from "./CashlessBlock";
import { PaymentType } from "./PaymentType";
import { RecurentSwitch } from "./RecurentSwitch";
import { Promocode } from "./Promocode";
import { usePerson } from "../../hooks/usePerson";
import { useLocation } from "react-router-dom";

export const ReviewsPiece = () => {
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [isErrorForm, setIsErrorForm] = useState(false);

  usePerson();

  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const referral = params.get("referral");

  const state = useLocalState();
  const { personInfo } = state;

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

    let value = {
      email: personInfo?.email || "",
      name: formValue?.projectName.trim() || "",
      cards,
      brief: formValue?.importBrief
        ? JSON.parse(formValue?.importBrief)
        : undefined,
      promo: formValue?.promoLink
        ? {
            name: formValue?.promoCode,
            link: formValue?.promoLink,
            type: formValue?.promoAreaType,
          }
        : undefined,
      referral: referral ?? undefined,
    };

    let isRecurent = formValue?.isRecurent;

    let cashlessData =
      formValue.paymentType === "cashless"
        ? {
            company: formValue?.company,
            inn: formValue?.inn,
            ogrn: formValue?.ogrn,
            email: personInfo?.email || "",
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
      placement: "topRight",
    });
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setIsErrorForm(hasErrors);
  };

  return (
    <Form
      name="reviewPiece"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      disabled={isLoading || isLoadingTariff}
      layout="vertical"
      initialValues={{
        paymentType: "card",
        isRecurent: true,
      }}
      onFieldsChange={handleFormChange}
    >
      <Price tariff={campaignTariff || []} isLoadingTariff={isLoadingTariff} />
      <Wrapper>
        <ProjectName form={form} />
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
            <Promocode
              form={form}
              count={count}
              email={personInfo?.email || ""}
            />
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
              giftCount={formValue.giftCount}
            />
          </>
        )}
      </Wrapper>
    </Form>
  );
};
