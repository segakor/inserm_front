import React, { useState, useEffect } from "react";
import {
  Select,
  Divider,
  Radio,
  RadioChangeEvent,
  Input,
  Form,
  Button,
} from "antd";
import { useLocalState } from "../../context/hooks";
import { StyledTitle, Wrapper } from "./styles";
import { ListOfAreaCheckBox } from "./ListOfAreaCheckBox";
import { ListOfAreaItem } from "./ListOfAreaItem";
import { Price } from "./Price";
import { Footer } from "./Footer";
import { getCountReviews } from "../../../utils/getCountReviews";
import { goToAinoxPagePiece } from "../../../utils";

export const ReviewsPiece = () => {
  const [radioValue, setRadioValue] = useState(1);
  const [selectedArea, setSelectedArea] = useState<string[]>([]);

  const state = useLocalState();
  const { clientProject, personInfo } = state;

  const listOfProject = clientProject?.map((item) => ({
    value: item.name,
  }));

  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const handleClickArea = (area: string) => {
    selectedArea.find((item) => item === area)
      ? setSelectedArea((prev) => prev.filter((item) => item !== area))
      : setSelectedArea((prev) => [...prev, area]);
  };
  ///
  const [form] = Form.useForm();

  const formValue = Form.useWatch([], form); /* as {
    [key: string]: [] | string;
  }; */

  const { count, price, month } = getCountReviews(formValue);

  useEffect(() => {
    form.setFieldValue("projectName", "");
  }, [radioValue]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    /* goToAinoxPagePiece({
      email: personInfo?.email || "",
      projectName: formValue?.projectName || "",
      price: price,
      formId: "5eeffdfc498f606",
    }); */
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Wrapper>
      <Form
        name="reviewPiece"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Price />
        <StyledTitle level={5}>
          1. Выберите проект (если у вас уже существует проект) или создайте
          новый
        </StyledTitle>
        <Radio.Group
          onChange={onChangeRadio}
          value={radioValue}
          style={{ marginBottom: 16 }}
        >
          <Radio value={1}>Новый проект</Radio>
          <Radio value={2}>Добавить в имеющийся проект</Radio>
        </Radio.Group>
        {radioValue === 1 && (
          <Form.Item
            name="projectName"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input placeholder="Название проекта" style={{ width: "300px" }} />
          </Form.Item>
        )}
        {radioValue === 2 && (
          <Form.Item
            name="projectName"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Select style={{ width: "300px" }} options={listOfProject} />
          </Form.Item>
        )}
        <Divider />
        {formValue?.projectName && (
          <ListOfAreaCheckBox
            handleClickArea={handleClickArea}
            selectedArea={selectedArea}
          />
        )}
        {!!selectedArea.length && formValue?.projectName && (
          <ListOfAreaItem
            selectedArea={selectedArea}
            price={price}
            form={form}
          />
        )}
        <Form.Item>
          {count > 0 && <Footer count={count} price={price} month={month} />}
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
