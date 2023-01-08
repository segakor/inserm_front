import React, { useEffect } from "react";
import styled from "styled-components";
import { Title } from "./Typography";
import { useGetAdmin } from "../hooks/useGetAdmin";
import { useLocalState } from "../context/hooks";

const HeaderTitle = styled(Title)`
  margin-bottom: 30px !important;
  font-size: 18px !important;
  font-weight: 800 !important;
`;
const AdminCard = styled.div`
  border-radius: 10px;
  background: #ffffff;
  padding: 15px 20px 15px 20px;
`;
const HeaderCard = styled(Title)`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 800 !important;
`;
const Item = styled(Title)`
  font-size: 14px;
  margin-bottom: 5px;
  color: #8e8e8e !important;
  font-weight: 500 !important;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  grid-gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
  }
`;

export const ListOfAdmin = () => {
  const { handleGetAdmin } = useGetAdmin();
  const state = useLocalState();
  const { listOfAdmin } = state;

  const host = listOfAdmin?.filter(
    (item) => item.role.toLowerCase() === "host"
  );
  const supervisor = listOfAdmin?.filter(
    (item) => item.role.toLowerCase() === "supervisor"
  );
  const support = listOfAdmin?.filter(
    (item) => item.role.toLowerCase() === "support"
  );

  useEffect(() => {
    handleGetAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderTitle level={5}>Список админов</HeaderTitle>
      <FlexBox>
        {host && (
          <AdminCard>
            <HeaderCard level={5}>Размещатель</HeaderCard>
            {host.map((item, index) => (
              <Item key={index} level={5}>
                {item.email}
              </Item>
            ))}
          </AdminCard>
        )}
        {supervisor && (
          <AdminCard>
            <HeaderCard level={5}>Руководитель проектов</HeaderCard>
            {supervisor.map((item, index) => (
              <Item key={index} level={5}>
                {item.email}
              </Item>
            ))}
          </AdminCard>
        )}
        {support && (
          <AdminCard>
            <HeaderCard level={5}>Техподдержка</HeaderCard>
            {support.map((item, index) => (
              <Item key={index} level={5}>
                {item.email}
              </Item>
            ))}
          </AdminCard>
        )}
      </FlexBox>
    </>
  );
};
