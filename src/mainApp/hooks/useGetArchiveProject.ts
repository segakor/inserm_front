import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getArchiveProject } from "../../request";
import { ArchiveProject } from "../../types";
import { openNotificationWithIcon } from "../../utils";


export const useGetArchiveProject = (id: string) => {

  const [archiveProject, setArchiveProject] = useState<ArchiveProject[] | undefined>(undefined)

  const handleGetClientProject = async () => {
    try {
      const response = await getArchiveProject(id);
      setArchiveProject(response.data.result)
    } catch (err) {
      const typedError = err as AxiosError;
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось загрузить архивные проекты клиента",
        status: typedError.status
      });
    }
  };
  useEffect(() => {
    handleGetClientProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { archiveProject };
};
