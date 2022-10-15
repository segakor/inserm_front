import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../Typography";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;


export const Project = () => {
  const params = useParams()

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${params.projectId}`)
      .then(response => response.json())
      .then(json => console.log(json))

    /*   return () => {
        console.log("unmounts");
      }; */
  }, [params])

  return (
    <Page>
      <Header>{`айди проекта ->>>${params.projectId}`}</Header>
    </Page>
  );
};
