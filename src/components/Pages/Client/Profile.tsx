import React, { useState } from "react";
import styled from "styled-components";
import { Title, Header } from "../../Typography";
import { FormChangePassword } from "../../FormChangePassword";
import { FormChangeClientInfo } from "../../FormChangeClientInfo";
import { usePerson } from "../../../hooks/usePerson";
import { useLocalState } from "../../../context/hooks";
import { Skeleton } from "antd";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 860px;
  margin-top: 20px;
  grid-gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;

export const Profile = () => {
  /*   const [toggle, setToggle] = useState(false); */
  usePerson();
  const state = useLocalState();
  const { personInfo } = state;

  return (
    <Page>
      {/* <button onClick={() => setToggle(!toggle)}>toggle</button> */}
      <Header>Профиль</Header>
      <Title level={4} style={{ fontWeight: "700" }}>
        {personInfo?.first_name} {personInfo?.last_name}
      </Title>
      {/*  {toggle ? (
        <Title level={4} style={{ fontWeight: "700" }}>
          {personInfo?.first_name} {personInfo?.last_name}
        </Title>
      ) : (
        <Skeleton.Input active={true} style={{ height: 26, marginBottom: 2 }} />
      )} */}
      <Title level={5} style={{ fontWeight: "400" }}>
        пока_нет_от_бэка@yandex.ru
      </Title>
      <FlexBox>
        <FormChangeClientInfo /* personInfo={personInfo} */ />
        <FormChangePassword />
      </FlexBox>
    </Page>
  );
};
