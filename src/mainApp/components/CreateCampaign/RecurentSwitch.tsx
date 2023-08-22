import { Form, Switch, Tooltip } from "antd";
import { StyledTitle } from "./styles";
import { QuestionCircleFilled } from "@ant-design/icons";

export const RecurentSwitch = () => {
  return (
    <>
     <StyledTitle level={5}>
        Автопродление тарифа{" "}
        <Tooltip
          title={
            "Можно включить автопродление тарифа. Например, если вы заказали 10 отзывов за 6 500 р, после их полной публикации произойдет списание 6 500 р, и тариф автоматически продлится еще на 10 отзывов."
          }
        >
          <QuestionCircleFilled
            style={{ color: "#1579E9", cursor: "pointer" }}
          />
        </Tooltip>
      </StyledTitle>
    <Form.Item name="isRecurent" valuePropName="checked">
      <Switch checkedChildren="Да" unCheckedChildren="Нет" />
    </Form.Item>
    </>
  );
};
