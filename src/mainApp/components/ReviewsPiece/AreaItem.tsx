import { useEffect } from "react";
import {
  AddItemButton,
  AreaItemInputWrapper,
  AreaItemName,
  DeleteIcon,
  AreaItemWrapper,
} from "./styles";
import { Divider, Form, Input, InputNumber, FormInstance } from "antd";
import { areas } from "../../../constants";

type Props = {
  areaValue: string;
  price: number;
  form: FormInstance;
};

export const AreaItem = ({ areaValue, price, form }: Props) => {
  const amount = 1;

  const items = [
    {
      price: price,
      type: areaValue,
      link: "",
      amount: amount,
    },
  ];

  useEffect(() => {
    const formItems = form.getFieldsValue();
    for (let key in formItems) {
      if (key === areaValue) {
        const newArr = formItems[key].map((item: any) => (item.price = price));
        form.setFieldsValue({ newArr });
      }
    }
  }, [price]);

  return (
    <>
      <AreaItemName level={5}>
        {areas.find((item) => item.value === areaValue)?.label}
      </AreaItemName>
      <Form.List name={areaValue} initialValue={items}>
        {(fields, { add, remove }) => (
          <AreaItemWrapper>
            {fields.map((field, index) => (
              <AreaItemInputWrapper key={index}>
                <Form.Item
                  {...field}
                  name={[field.name, "link"]}
                  key={index + 1}
                  rules={[
                    { required: true, message: "Обязательное поле" },
                    {
                      type: "url",
                      message: "Невалидная ссылка",
                    },
                    {
                      message: 'this is custom',
                      validator: (_, value) => {
                        if (/^[a-zA-Z0-9]+$/.test(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject();
                        }
                       }
                     }
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input placeholder="Ссылка на карточку" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "amount"]}
                  key={index + 3}
                  rules={[{ required: true, message: "Обязательное поле" }]}
                  initialValue={amount}
                >
                  <InputNumber
                    min={1}
                    placeholder="Колличество"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "price"]}
                  key={index + 4}
                  initialValue={price}
                  hidden={true}
                >
                  <Input type="number" placeholder="Цена" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "type"]}
                  key={index + 5}
                  initialValue={areaValue}
                  hidden={true}
                >
                  <Input placeholder="Тип" />
                </Form.Item>
                {fields.length > 1 && (
                  <DeleteIcon onClick={() => remove(field.name)} />
                )}
              </AreaItemInputWrapper>
            ))}
            <div>
              <AddItemButton onClick={() => add()}>
                Добавить карточку
              </AddItemButton>
            </div>
            <Divider />
          </AreaItemWrapper>
        )}
      </Form.List>
    </>
  );
};
