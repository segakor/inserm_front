import { Title } from "../../../common/Typography";
import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Mail } from "../../../types";
import { useMail } from "../../hooks/useEmail";
import { Button, Spin, Divider, Input, Form } from "antd";
import { openNotificationWithIcon } from "../../../utils";
import { ReactComponent as UpIcon } from "../../../assets/up.svg";
import { ReactComponent as DownIcon } from "../../../assets/down.svg";
import { Body, Buttons, StyledForm, TitleMail, Wrapper } from "./style";

type Props = {
  mail: Mail;
};

export const MailItem = ({ mail }: Props) => {
  const [form] = Form.useForm();
  const formValue = Form.useWatch([], form);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { handleGetDetails, handleUpdate, details, loading } = useMail();

  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    monacoRef.current = editor;

    setTimeout(() => {
      monacoRef.current
        .getAction("editor.action.formatDocument")
        .run()
        .then(() => monacoRef.current.updateOptions({ readOnly: true }));
    }, 200);
  };

  const setFormValues = () => {
    form.setFieldValue("body", details?.body);
    form.setFieldValue("subject", details?.subject);
    form.setFieldValue("id", details?.id);
  };

  useEffect(() => {
    if (open && details) {
      setFormValues();
    }
  }, [open, details]);

  const onOpen = () => {
    setOpen(true);
    !details && handleGetDetails(mail.id);
  };

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    setFormValues();
  };

  const onCancel = () => {
    setIsEdit(false);
    setFormValues();
    setTimeout(() => {
      monacoRef.current
        .getAction("editor.action.formatDocument")
        .run()
        .then(() => monacoRef.current.updateOptions({ readOnly: true }));
    }, 200);
  };

  const onEdit = () => {
    setIsEdit(true);
    monacoRef.current.updateOptions({ readOnly: false });
  };

  const onFinish = async (values: any) => {
    try {
      await handleUpdate({
        id: formValue.id,
        subject: formValue.subject,
        body: formValue.body
          ?.replace(/(\r\n|\n|\r)/gm, "")
          ?.replace(/\s+/g, " ")
          .trim(),
      });
      setIsEdit(false);
    } catch (error) {
      setFormValues();
    }
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

  return (
    <StyledForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Wrapper>
        <TitleMail>
          {!open ? (
            <>
              <Form.Item hidden name="subject" />
              <Title level={4}>
                {details ? details.subject : mail.subject}
              </Title>
            </>
          ) : (
            <div className="input">
              <Form.Item name="id" hidden />
              <Form.Item
                name="subject"
                rules={[{ required: true, message: "Обязательное поле" }]}
              >
                <Input disabled={!isEdit} />
              </Form.Item>
            </div>
          )}
          <div onClick={!open ? onOpen : onClose} style={{ cursor: "pointer" }}>
            {open ? <UpIcon /> : <DownIcon />}
          </div>
        </TitleMail>
        {open && (
          <div>
            <Body>
              {loading.body ? (
                <Spin />
              ) : (
                <Form.Item
                  name="body"
                  rules={[{ required: true, message: "Обязательное поле" }]}
                >
                  <Editor
                    height="50vh"
                    language="html"
                    theme="light"
                    value={details?.body}
                    options={{
                      inlineSuggest: true,
                      fontSize: "16px",
                      formatOnType: true,
                      autoClosingBrackets: true,
                      minimap: {
                        enabled: false,
                      },
                      glyphMargin: false,
                      scrollbar: {
                        horizontal: "hidden",
                      },
                    }}
                    onMount={handleEditorDidMount}
                  />
                </Form.Item>
              )}
            </Body>
            <Divider />
            <Buttons>
              {!isEdit && (
                <Button onClick={onEdit} type="primary">
                  Редактировать
                </Button>
              )}
              {isEdit && (
                <>
                  <Button htmlType="submit" type="primary">
                    Сохранить
                  </Button>
                  <Button onClick={onCancel}>Отменить</Button>
                </>
              )}
            </Buttons>
          </div>
        )}
      </Wrapper>
    </StyledForm>
  );
};
