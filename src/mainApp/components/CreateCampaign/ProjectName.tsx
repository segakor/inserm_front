import React from "react";
import { Select, Divider, Input, Form, FormInstance, Switch } from "antd";
import { useLocalState } from "../../context/hooks";
import { StyledTitle } from "./styles";

type Props = {
  form: FormInstance;
};

export const ProjectName = ({ form }: Props) => {
  const state = useLocalState();
  const { clientCampaign, clientProject } = state;

  const allProject = [clientCampaign, clientProject].flat();

  const listOfProject = allProject?.map((item) => ({
    label: item?.name,
    value: JSON.stringify({
      id: item?.id,
      type: item?.type,
    }),
  }));

  const formValue = Form.useWatch([], form);

  return (
    <>
      <StyledTitle level={5}>1. Введите название проекта</StyledTitle>
      <Form.Item
        name="projectName"
        rules={[
          { required: true, message: "Обязательное поле" },
          {
            message: "Проект с таким названием уже существует",
            validator: (_, value) => {
              if (listOfProject?.find((item) => item.label === value)) {
                return Promise.reject("");
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
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
            />
          </Form.Item>
        </>
      )}
      {formValue?.switchBrief && (
        <>
          <StyledTitle level={5}>Выберите бриф проекта для импорта</StyledTitle>
          <Form.Item name="importBrief">
            <Select options={listOfProject} style={{ width: "300px" }}/>
          </Form.Item>
        </>
      )}
      <Divider />
    </>
  );
};
