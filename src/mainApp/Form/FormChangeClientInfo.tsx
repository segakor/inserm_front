import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { Button, Input, Form } from "antd";
import { useLocalState } from "../context/hooks";
import { usePerson } from "../hooks/usePerson";

const Wrapper = styled.div`
  padding: 20px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  h5 {
    margin-bottom: 20px !important;
  }
`;
const StyledInput = styled(Input)`
  border-radius: 10px;
  height: 50px;
`;
const StyledButton = styled(Button)`
  border-radius: 10px;
  height: 50px;
  background: transparent;
  border: 2px solid #1579e9;
  color: #1579e9;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 20px;
`;

export const FormChangeClientInfo = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { handleChangePerson } = usePerson(true);

  const [form] = Form.useForm();
  const first_name = Form.useWatch("name", form);
  const last_name = Form.useWatch("secondName", form);
  const email = Form.useWatch("email", form);
  const tg = Form.useWatch("tg", form);
  const phone = Form.useWatch("phone", form);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSumbit = () => {
    handleChangePerson({
      first_name,
      last_name,
      email,
      tg,
      phone,
    });
    handleEdit();
  };

  const onResetSubmitEdit = () => {
    setIsEdit(!isEdit);
    form.resetFields();
  };

  const state = useLocalState();
  const { personInfo } = state;

  useEffect(() => {
    form.setFieldsValue({
      name: personInfo?.first_name,
      secondName: personInfo?.last_name,
      phone: personInfo?.phone,
      email: personInfo?.email,
      tg: personInfo?.tg,
    });
  }, [form, personInfo]);

  return (
    <Wrapper>
      <Form disabled={!isEdit} form={form}>
        <Title level={5} style={{ fontWeight: "800" }}>
          О себе
        </Title>
        <Form.Item name="name">
          <StyledInput
            placeholder="Имя"
            defaultValue={personInfo?.first_name}
            title="Имя"
          />
        </Form.Item>
        <Form.Item name="secondName">
          <StyledInput
            placeholder="Фамилия"
            defaultValue={personInfo?.last_name}
            title="Фамилия"
          />
        </Form.Item>
        <Form.Item name="email">
          <StyledInput placeholder="Электронная почта" disabled title="email" />
        </Form.Item>
        <Form.Item name="phone">
          <StyledInput
            placeholder="Номер телефона"
            defaultValue={personInfo?.phone}
            title="phone"
          />
        </Form.Item>
        <Form.Item name="tg">
          <StyledInput
            placeholder="Логин телеграм"
            defaultValue={personInfo?.tg}
            title="telegram"
          />
        </Form.Item>
      </Form>
      {isEdit && (
        <ButtonWrapper>
          <StyledButton type="primary" block onClick={onSumbit}>
            Сохранить
          </StyledButton>
          <StyledButton type="primary" block onClick={onResetSubmitEdit}>
            Отменить
          </StyledButton>
        </ButtonWrapper>
      )}
      {!isEdit && (
        <StyledButton type="primary" block onClick={handleEdit}>
          Изменить
        </StyledButton>
      )}
    </Wrapper>
  );
};
