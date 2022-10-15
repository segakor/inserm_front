import React, { useEffect } from "react";
import styled from "styled-components";
import { Title, Header } from "../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Tariff = () => {
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${1}`)
      .then(response => response.json())
      .then(json => console.log(json))

    /*   return () => {
        console.log("unmounts");
      }; */
  }, [])
  return (
    <Page>
      <Header>Управление тарифами</Header>
    </Page>
  );
};
