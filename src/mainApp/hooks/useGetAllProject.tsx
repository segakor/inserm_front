import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getAllProject } from "../../request";
import { Project } from "../../type";
import { openNotificationWithIcon } from "../../utils/notification";

export const useGetAllProject = () => {
  const [allProject, setAllProject] = useState<Project[] | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllProject = async () => {
    try {
      setIsLoading(true)
      const response = await getAllProject();
      setAllProject(response.data.projectsArray);
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить проекты",
        status: typedError.status
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    allProject,
    isLoading
  };
};
