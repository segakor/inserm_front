import { useEffect, useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { Admin } from "../../types";
import { useLocalState } from "../context/hooks";
import { useGetAdmin } from "../hooks/useGetAdmin";
import { ModalChangeAdmin } from "./Modal";

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
  cursor: pointer;
  border-radius: 10px;
  :hover {
    background-color: whitesmoke;
  }
`;
const FlexBox = styled.div`
  display: flex;
  height: auto;
  grid-gap: 20px;
  width: 745px;
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
    (item) => item.role === "HOST"
  );
  const supervisor = listOfAdmin?.filter(
    (item) => item.role === "SUPERVISOR"
  );
  const support = listOfAdmin?.filter(
    (item) => item.role === "SUPPORT"
  );

  useEffect(() => {
    handleGetAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<undefined | Admin>(
    undefined
  );

  const handleOpen = (e: any) => {
    setSelectedItem(e);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(undefined);
    setIsModalOpen(false);
  };

  return (
    <>
      <HeaderTitle level={5}>Список админов</HeaderTitle>
      <FlexBox>
        {host && (
          <AdminCard>
            <HeaderCard level={5}>Размещатель</HeaderCard>
            {host.map((item, index) => (
              <Item key={index} level={5} onClick={() => handleOpen(item)}>
                {item.email}
              </Item>
            ))}
          </AdminCard>
        )}
        {supervisor && (
          <AdminCard>
            <HeaderCard level={5}>Руководитель проектов</HeaderCard>
            {supervisor.map((item, index) => (
              <Item key={index} level={5} onClick={() => handleOpen(item)}>
                {item.email}
              </Item>
            ))}
          </AdminCard>
        )}
        {support && (
          <AdminCard>
            <HeaderCard level={5}>Техподдержка</HeaderCard>
            {support.map((item, index) => (
              <Item key={index} level={5} onClick={() => handleOpen(item)}>
                {item.email}
              </Item>
            ))}
          </AdminCard>
        )}
      </FlexBox>
      {isModalOpen && (
        <ModalChangeAdmin
          onClose={handleClose}
          id={selectedItem?.id || 0}
          email={selectedItem?.email || ""}
          role={selectedItem?.role || ""}
          firstName={selectedItem?.firstName || ""}
          lastName={selectedItem?.lastName || ""}
        />
      )}
    </>
  );
};
