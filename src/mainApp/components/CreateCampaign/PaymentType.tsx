import { Form, Radio } from "antd";
import { Label } from "./styles";

export const PaymentType = () => {
  return (
    <>
      <Form.Item name={"paymentType"}>
        <Radio.Group>
          <Radio value="card" style={{ marginBottom: "10px" }}>
            <Label level={5}>Оплата картой</Label>
          </Radio>
          <Radio value="cashless">
            <Label level={5}>Безналичная оплата по счету</Label>
          </Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
};
