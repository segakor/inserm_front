import { useState } from "react";
import { useGetAllProject } from "../hooks/useGetAllProject";
import { Button, Radio, RadioChangeEvent, Spin } from "antd";
import { ModalCreateProjectByAdmin } from "./ModalCreateProjectByAdmin";
import { FlatCardProject } from "./Card";
import { optionsWithDisabled } from "../../constants";

export const ListOfProject = ({ inputSearch }: { inputSearch?: string }) => {
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { allProject, isLoading, handleUpdate } = useGetAllProject(isActive);

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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Radio.Group
          style={{ marginBottom: 16 }}
          options={optionsWithDisabled}
          onChange={onChange}
          value={isActive}
          optionType="button"
          buttonStyle="solid"
        />
        <Button onClick={handleOpen}>Добавить проект</Button>
      </div>
      {
        <>
          {filteredData?.map((item, index) => (
            <FlatCardProject
              key={index}
              project={item}
              isActive={isActive}
              onUpdate={handleUpdate}
            />
          ))}
        </>
      }
      {isLoading && <Spin />}
      {isModalOpen && (
        <ModalCreateProjectByAdmin
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};
