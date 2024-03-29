import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAllProject } from "../../request";
import { Project } from "../../types";
import { openNotificationWithIcon } from "../../utils";
import { useDispatch } from "../context/hooks";
import { setPages } from "../context/action";

export const useGetAllProject = (
  isActive: boolean,
  sortOrder: string,
  sortKey: string
) => {
  const [allProject, setAllProject] = useState<Project[] | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleGetAllProject = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProject(isActive, sortOrder, sortKey);
      setAllProject(response.data.projectsArray);
      dispatch(
        setPages({
          pages: response.data.projectsArray.map((item) => item.id),
          type: "project",
        })
      );
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить проекты",
        status: typedError.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    allProject,
    isLoading,
    handleGetAllProject,
  };
};
