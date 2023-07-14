import { Input, Form } from "antd";
import { Label, CashlessWrapper } from "./styles";

export const CashlessBlock = () => {
  return (
    <>
      <CashlessWrapper>
        <Form.Item
          name="company"
          label={<Label level={5}>Наименование юр. лица</Label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input
            placeholder="Наименование юр. Лица"
            style={{ width: "300px" }}
          />
        </Form.Item>
        <Form.Item
          name="inn"
          label={<Label level={5}>ИНН</Label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input placeholder="ИНН" style={{ width: "300px" }} />
        </Form.Item>
        <Form.Item
          name="ogrn"
          label={<Label level={5}>ОГРН</Label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input placeholder="ОГРН" style={{ width: "300px" }} />
        </Form.Item>
        <Form.Item
          name="address"
          label={<Label level={5}>Адрес юр. лица</Label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input placeholder="Адрес юр. лица" style={{ width: "300px" }} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={<Label level={5}>Телефон</Label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input placeholder="Телефон" style={{ width: "300px" }} />
        </Form.Item>
        <Form.Item
          name="email"
          label={<Label level={5}>Email</Label>}
          rules={[{ required: true, message: "Обязательное поле" }]}
        >
          <Input placeholder="Email" style={{ width: "300px" }} />
        </Form.Item>
      </CashlessWrapper>
    </>
  );
};
