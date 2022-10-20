import React from "react";
import styled from "styled-components";
import { LoginForm } from "../LoginForm";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;


export const Login = () => {
  return (
    <Page>
      <LoginForm />
    </Page>
  );
};
