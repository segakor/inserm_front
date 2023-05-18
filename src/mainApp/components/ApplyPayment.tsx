import React, { useEffect } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../context/hooks";
import { goToAinoxPage } from "../../utils";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ApplyPayment = () => {

  const state = useLocalState();
  const { projectForPayment, personInfo } = state;

  const formIds = ["96267607a9857ae", "b93d944a83a9ac1", "f334a093ff4dbfa"];

  const formIdValue = projectForPayment?.tariffId
    ? formIds[projectForPayment?.tariffId - 1]
    : formIds[0];

  const navigation = useNavigate();

  useEffect(() => {
    if (!projectForPayment) navigation("/client/createproject");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectForPayment]);

  setTimeout(() => {
    goToAinoxPage({
      email: personInfo?.email || "",
      projectName: projectForPayment?.projectName || "",
      formId: formIdValue,
      price: projectForPayment?.price || 0,
      period: projectForPayment?.period || 0,
    });
  }, 1000);

  return (
    <Wrapper>
      <Spin
        size="large"
        tip="Подключаемся к платежной системе. Через несколько секунд вы будете переадресованы на страницу оплаты"
      />
    </Wrapper>
  );
};
