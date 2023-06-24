import { Divider, Form, Input, Select, Switch, Tooltip } from "antd";
import { TariffSelectionBlock } from "../TariffSelectionBlock";
import { StyledTitle } from "../CreateCampaign/styles";
import { goToAinoxPageProject, openNotificationWithIcon } from "../../../utils";
import { useLocalState } from "../../context/hooks";
import { useGetListOfBrief } from "../../hooks/useGetListOfBrief";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useCopyBrief } from "../../hooks/useCopyBrief";

export const ReviewsMonth = () => {
  const [form] = Form.useForm();

  const formValue = Form.useWatch([], form);

  const state = useLocalState();
  const { personInfo } = state;

  const { handleCopyBrief } = useCopyBrief();

  const onSelectedTariff = async (tariff: {
    period: number;
    price: number;
    id: number;
  }) => {
    try {
      await form.validateFields();

      if (formValue?.switchBrief) {
        const value = JSON.parse(formValue?.importBrief || "{}");

        await handleCopyBrief({
          id: value?.id,
          name: value?.name,
          type: value?.type,
          field: formValue?.fieldLinks,
        });
      }

      goToAinoxPageProject({
        email: personInfo?.email || "",
        projectName: formValue?.projectName || "",
        price: tariff.price || 0,
        period: tariff.period || 0,
        tariffId: tariff.id,
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: `Заполните все поля`,
        placement: "topRight",
      });
    }
  };

  const { listOfBrief } = useGetListOfBrief();

  const options = listOfBrief?.map((item) => ({
    label: item?.name,
    value: JSON.stringify({
      id: item?.id,
      type: item?.type,
      name: item?.name,
    }),
  }));

  const isCopyBriefFromCampaign =
    JSON.parse(formValue?.importBrief || "{}")?.type === "campaign";

  const disabledSwitch = !listOfBrief?.length;

  return (
    <Form form={form}>
      <StyledTitle level={5}>1. Введите название проекта</StyledTitle>
      <Form.Item
        name="projectName"
        rules={[{ required: true, message: "Обязательное поле" }]}
      >
        <Input placeholder="Название проекта" style={{ width: "300px" }} />
      </Form.Item>
      {formValue?.projectName && (
        <>
          <StyledTitle level={5}>
            Импортировать бриф из предыдущего проекта?
          </StyledTitle>
          <Form.Item name="switchBrief" valuePropName="checked">
            <Switch
              checkedChildren="Да"
              unCheckedChildren="Нет"
              disabled={disabledSwitch}
            />
          </Form.Item>
        </>
      )}
      {formValue?.switchBrief && (
        <>
          <StyledTitle level={5}>Выберите бриф проекта для импорта</StyledTitle>
          <Form.Item
            name="importBrief"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Select options={options} style={{ width: "300px" }} />
          </Form.Item>
        </>
      )}
      {isCopyBriefFromCampaign && (
        <>
          <Form.Item
            name="fieldLinks"
            style={{ width: "300px" }}
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <div style={{ display: "flex", alignItems: "center", gridGap: 8 }}>
              <Input placeholder="Ссылка на ваш сайт" />
              <Tooltip
                title={
                  "Вы выбрали бриф из поштучного проекта, необходимо заполнить ссылку на ваш сайт"
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
          </Form.Item>
        </>
      )}
      <Divider />
      <StyledTitle level={5}>2. Выберите тариф</StyledTitle>
      <TariffSelectionBlock onSelectTarif={onSelectedTariff} />
    </Form>
  );
};
