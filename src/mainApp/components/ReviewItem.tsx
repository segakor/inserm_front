import styled from "styled-components";
import { Reviews } from "../../types";
import { ButtonChangeRow } from "../Button/ButtonChangeRow";
import { useState } from "react";
import { StatusComponent } from "./StatusComponent";
import { getDate } from "../../utils";
import { Form, Input } from "antd";
import { useUpdateReview } from "../hooks/useUpdateReview";

const { TextArea } = Input;

type Props = {
  item: Reviews;
};

const Wrapper = styled.div`
  padding: 10px;
  background-color: #daedff;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  a {
    text-decoration: underline;
    font-weight: bold;
    font-size: 12px;
  }
  font-size: 12px;
  white-space: pre-line;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Cercle = styled.b`
  min-width: 25px;
  min-height: 25px;
  background: #313131;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const ListWrapper = styled.div`
  background: #fff;
  padding: 10px 5px 10px 5px;
  border-radius: 10px;
  div {
    :last-child {
      margin-bottom: 0px;
    }
  }
`;

export const ReviewItem = ({ item }: Props) => {
  const [isFullText, setIsFullText] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const textLength = item.text.length > 100;

  const [form] = Form.useForm();

  const formText = form.getFieldValue('text')

  const text =
  textLength && !isFullText ? formText?.slice(0, 100) + " ..." : formText;

  const { handleUpdateReviewByClient } = useUpdateReview();

  const onEdit = () => {
    setIsEdit(true);
  };
  const onCancel = () => {
    setIsEdit(false);
  };

  const onSave = () => {
    handleUpdateReviewByClient({
      id: Number(item.id),
      text: form.getFieldValue("text"),
    });
    setIsEdit(false);
  };

  return (
    <Wrapper>
      <Row>
        <Cercle>{Number(item.key) + 1}</Cercle>
        {item.status === "wait" && (
          <ButtonChangeRow
            isEdit={isEdit}
            onClick={onEdit}
            onClickCancel={onCancel}
            onClickSave={onSave}
          />
        )}
      </Row>
      <Form form={form} initialValues={{ text: item.text }}>
        {!isEdit ? (
          <div>
            <div>{text}</div>
            {textLength && !isFullText && (
              <a onClick={() => setIsFullText(true)}>Показать полностью</a>
            )}
          </div>
        ) : (
          <Form.Item
            name={"text"}
            style={{ width: "100%" }}
          >
            <TextArea maxLength={1000} autoSize showCount />
          </Form.Item>
        )}
      </Form>
      <Row>
        <StatusComponent status={item.status} withOutBorder/>
        <b>
          {typeof item.date === "number"
            ? getDate({ date: item.date })
            : item.date}
        </b>
      </Row>
    </Wrapper>
  );
};

export const ListOfReviews = ({ data }: { data: Reviews[] }) => {
  return (
    <ListWrapper>
      {data?.map((item, index) => (
        <ReviewItem item={item} key={index} />
      ))}
    </ListWrapper>
  );
};
