import { useEffect } from "react";
import { useGetAllProject } from "../hooks/useGetAllProject";
import { Spin } from "antd";
import { FlatCardProject } from "./Card";
import { useLocalState } from "../context/hooks";

export const ListOfProject = ({ inputSearch }: { inputSearch?: string }) => {
  const {
    filterProject: { isActive, sortKey, sortOrder },
  } = useLocalState();

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

  useEffect(() => {
    handleGetAllProject();
  }, [sortOrder, sortKey, isActive]);

  return (
    <>
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
    </>
  );
};
