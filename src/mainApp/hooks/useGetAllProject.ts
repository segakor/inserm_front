import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAllProject } from "../../request";
import { Project } from "../../types";
import { openNotificationWithIcon } from "../../utils";
import { useDispatch } from "../context/hooks";
import { setPages } from "../context/action";

export const useGetAllProject = (isActive: boolean) => {
  const [allProject, setAllProject] = useState<Project[] | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleGetAllProject = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProject(isActive);
      setAllProject(response.data.projectsArray);
      dispatch(setPages(response.data.projectsArray.map((item) => item.id)));
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
  useEffect(() => {
    handleGetAllProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const handleUpdate = () => {
    handleGetAllProject();
  };

  return {
    allProject,
    isLoading,
    handleUpdate,
  };
};
