import { useEffect, useState } from "react";
import { useGetAllProject } from "../hooks/useGetAllProject";
import { Button, Radio, RadioChangeEvent, Select, Spin } from "antd";
import { FlatCardProject } from "./Card";
import { optionsKey, optionsSort, optionsWithDisabled } from "../../constants";
import styled from "styled-components";
import { ModalCreateProjectByAdmin } from "./Modal";

const WrapperPanel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  grid-gap: 16px;
  flex-wrap: wrap;
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;

export const ListOfProject = ({ inputSearch }: { inputSearch?: string }) => {
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState("success");

  //TODO:зарефакторить!!!

  const { allProject, isLoading, handleGetAllProject } = useGetAllProject(
    isActive,
    sortOrder,
    sortKey
  );

  const filteredData = allProject?.filter((item) => {
    if (inputSearch) {
      return item.name.toLowerCase().includes(inputSearch);
    }
    return item;
  });

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setIsActive(value);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const hendleChagneSortKey = (e: string) => {
    setSortKey(e);
  };
  const hendleChagneSortOrder = (e: string) => {
    setSortOrder(e);
  };

  useEffect(() => {
    handleGetAllProject();
  }, [sortOrder, sortKey, isActive]);

  return (
    <>
      <WrapperPanel>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange}
          value={isActive}
          optionType="button"
          buttonStyle="solid"
        />
        <div>
          <Select
            style={{ width: 140 }}
            defaultValue={"success"}
            options={optionsKey}
            onChange={hendleChagneSortKey}
          />
        </div>
        <div>
          <Select
            style={{ width: 150 }}
            defaultValue="asc"
            options={optionsSort}
            onChange={hendleChagneSortOrder}
          />
        </div>
        <Spacer />
        <Button onClick={handleOpen}>Добавить проект</Button>
      </WrapperPanel>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          {filteredData?.map((item, index) => (
            <FlatCardProject
              key={index}
              project={item}
              isActive={isActive}
              onUpdate={handleGetAllProject}
            />
          ))}
        </>
      )}
      {isModalOpen && (
        <ModalCreateProjectByAdmin
          onClose={handleClose}
          onUpdate={handleGetAllProject}
        />
      )}
    </>
  );
};
