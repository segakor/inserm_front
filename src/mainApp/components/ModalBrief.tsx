import styled from "styled-components";
import { Modal, Form, Input, Button, Divider } from "antd";
import { useLocation } from "react-router-dom";
import { Title } from "../../common/Typography";
import { useCreateBrief } from "../hooks/useCreateBrief";
import { useUpdateBrief } from "../hooks/useUpdateBrief";
import { Brief } from "../../types";
import { ButtonCopy } from "../Button/ButtonCopy";
import { cliapbord, copyBrief, tokenService } from "../../utils";
import { briefField } from "../../constants";

const { TextArea } = Input;

const StyledTitle = styled(Title)`
  margin-bottom: 40px !important;
`;
const StyledTextArea = styled(TextArea)`
  border-radius: 10px;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 50px;
  background: transparent;
  border: 2px solid #1579e9;
  color: #1579e9;
`;

type Props = {
  onClose: () => void;
  id: string;
  brief: Brief | undefined;
  typeBrief: "campaign" | "project";
};

export const ModalBrief = ({ onClose, id, brief, typeBrief }: Props) => {
  const { handleCreateBrief, isLoading: isLoadingCreate } = useCreateBrief();
  const { handleUpdateBrief, isLoading: isLoadingUpdate } = useUpdateBrief();

  const [form] = Form.useForm();
  const formValue = Form.useWatch([], form);

  let fieldValue = {
    ...formValue,
  };

  if (typeBrief === "project") {
    fieldValue.projectId = id;
  } else {
    fieldValue.campaignId = id;
  }

  const onCopyBrief = () => {
    cliapbord(
      copyBrief({
        ...formValue,
      })
    );
  };

  const role = tokenService.getRole();

  let location = useLocation();

  const isBrief = brief ? true : false;

  const disabledComment =
    role === "HOST" || role === "SUPPORT" || location.pathname.includes("demo");

  const field =
    typeBrief === "project"
      ? briefField.mainField
      : briefField.mainField.filter((item) => !item?.canHide);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleCreateBrief(fieldValue).then(() => onClose());
  };

  const onSumbitUpdate = () => {
    handleUpdateBrief(fieldValue).then(() => onClose());
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Заполните бриф"
      open
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      width={1000}
    >
      <StyledTitle level={5} style={{ fontWeight: "400" }}>
        Обратите внимание, что бриф по проекту заполняется{" "}
        <b>1 раз (внимательно проверьте все ответы перед сохранением)</b>. Далее
        бриф передается в работу и внести правки в него вы не сможете. Вы
        сможете просмотреть бриф в любое время на странице конкретного проекта.
      </StyledTitle>
      <Form
        layout={"vertical"}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={brief}
      >
        {field.map((item, index) => (
          <Form.Item
            label={item.label}
            name={item.name}
            key={index}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
            ]}
          >
            <StyledTextArea style={{ height: 100 }} disabled={isBrief} />
          </Form.Item>
        ))}
        <StyledButton
          type="primary"
          disabled={isBrief}
          htmlType="submit"
          loading={isLoadingCreate}
        >
          Сохранить
        </StyledButton>
        {isBrief && (
          <>
            <Divider />
            {briefField.additionalField.map((item, index) => (
              <Form.Item
                label={item.label}
                name={item.name}
                key={index}
                rules={[
                  {
                    required: true,
                    message: "Обязательное поле",
                  },
                ]}
              >
                <StyledTextArea
                  style={{ height: 100 }}
                  disabled={disabledComment}
                />
              </Form.Item>
            ))}
            <StyledButton
              type="primary"
              disabled={disabledComment}
              onClick={onSumbitUpdate}
              loading={isLoadingUpdate}
            >
              Добавить комментарий
            </StyledButton>
            {role !== "CLIENT" && <ButtonCopy onClick={onCopyBrief} />}
          </>
        )}
      </Form>
    </Modal>
  );
};
