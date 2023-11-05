import { useEffect, useState } from "react";
import { createNews, deleteNews, getNews } from "../../request";
import { CreateNews, News } from "../../types";
import { openNotificationWithIcon } from "../../utils";

export const useGetNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNews = async (value: CreateNews) => {
    try {
      await createNews(value);
      handleGetNews();
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось создать новость",
      });
    }
  };

  const handleGetNews = async () => {
    setIsLoading(true);
    try {
      const response = await getNews();
      setNews(response.data.result);
    } catch {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось получить новости",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await deleteNews({ id });
      await handleGetNews();
    } catch (error) {
      openNotificationWithIcon({
        type: "error",
        message: "",
        description: "Не удалось удалить новость",
      });
    }
  };

  useEffect(() => {
    handleGetNews();
  }, []);

  return {
    news,
    handleCreateNews,
    handleGetNews,
    handleDeleteNews,
    isLoading,
  };
};
