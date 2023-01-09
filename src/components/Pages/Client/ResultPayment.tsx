import React, { useEffect } from "react";
import { Button, Result } from "antd";
import styled from "styled-components";
import { useCreateProject } from "../../../hooks/useCreateProject";
import { useCreateFromSite } from "../../../hooks/useCreateFromSite";
import { useLocation, useNavigate } from "react-router-dom";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
`;

export const ResultPayment = () => {
  const { handleCreateProject } = useCreateProject();
  const { handleCreateFromSite } = useCreateFromSite();

  const location = useLocation();
  const navigation = useNavigate();

  let insermData = {
    name: "",
    tariffId: 0,
    period: 0,
    price: 0,
    email: "",
    isPlatform: false,
  };

  const _insermData = localStorage.getItem("inserm");

  if (_insermData) {
    insermData = JSON.parse(_insermData);
  }

  useEffect(() => {
    if (location.pathname === "/paymentsuccess") {
      if (insermData.isPlatform)
        handleCreateProject({
          name: insermData.name,
          tariffId: insermData.tariffId,
          period: insermData.period,
          price: insermData.price,
        });
      if (!insermData.isPlatform) {
        handleCreateFromSite({
          name: insermData.name,
          tariffId: insermData.tariffId,
          period: insermData.period,
          price: insermData.price,
          email: insermData.email,
        });
      }
    } else {
      goToMain();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insermData]);

  const goToMain = () => {
    navigation("/login");
    localStorage.removeItem("inserm");
  };

  return (
    <Page>
      {location.pathname === "/paymentsuccess" && (
        <Result
          status="success"
          title="Успех"
          subTitle="Order number: 2017182818828182881"
          extra={[
            <Button type="primary" onClick={goToMain}>
              На главную
            </Button>,
          ]}
        />
      )}
      {location.pathname === "/paymenterror" && (
        <Result
          status="error"
          title="Ошибка"
          subTitle="Order number: 2017182818828182881"
          extra={[
            <Button type="primary" onClick={goToMain}>
              На главную
            </Button>,
          ]}
        />
      )}
    </Page>
  );
};
