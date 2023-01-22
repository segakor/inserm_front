import React from "react";
import styled from "styled-components";
import { FormLogin } from "../../Form/FormLogin";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


export const Login = () => {
  return (
    <Page>
      <FormLogin />
    </Page>
  );
};
