import { useEffect, useState } from "react";
import { getArchiveProject } from "../request";
import { ArchiveProject } from "../type";
import { openNotificationWithIcon } from "../utils/notification";


export const useGetArchiveProject = (id: string) => {

  const [archiveProject, setArchiveProject] = useState<ArchiveProject[] | undefined>(undefined)

  const handleGetClientProject = async () => {
    try {
      const response = await getArchiveProject(id);
      setArchiveProject(response.data.result)
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "Ошибка",
        description: "Не удалось загрузить архивные проекты клиента",
      });
    }
  };
  useEffect(() => {
    handleGetClientProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { archiveProject };
};
