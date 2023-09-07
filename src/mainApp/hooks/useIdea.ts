import { useState } from "react";
import { createIdea, getIdea } from "../../request";
import { Idea } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useIdea = () => {
  const [data, setDate] = useState<Idea[] | null>(null);

  const handleCreate = async (text: string) => {
    try {
      await createIdea(text);
      openNotificationWithIcon({
        type: "success",
        message: "",
        description: "Идея отправлена. Спасибо!",
      });
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось отправить данные",
      });
    }
  };

  const handleGetIdea = async () => {
    try {
      const res = await getIdea();
      setDate(res.data.result);
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить идеи",
      });
    }
  };

  return {
    handleCreate,
    handleGetIdea,
    data: data?.map((item, index) => ({
      ...item,
      key: index.toString(),
    })),
  };
};
