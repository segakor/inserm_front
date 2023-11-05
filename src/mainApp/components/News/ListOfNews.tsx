import { Button } from "antd";
import { useGetNews } from "../../hooks/useGetNews";
import { NewsItem } from "./NewsItem";
import { useState } from "react";
import { ModalCreateNews } from "../Modal/ModalCreateNews";

type Props = {
  isAdmin: boolean;
};

export const ListOfNews = ({ isAdmin }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { news, handleDeleteNews, handleCreateNews } = useGetNews();
  return (
    <>
      {isAdmin && (
        <div>
          <Button
            onClick={() => setIsModalOpen((prev) => !prev)}
            type="primary"
            style={{ marginBottom: 16, background: "black" }}
          >
            Добавить новость
          </Button>
        </div>
      )}
      {news.map((item, index) => (
        <NewsItem key={index} news={item} isAdmin={isAdmin} onDelete={handleDeleteNews}/>
      ))}
      {isModalOpen && (
        <ModalCreateNews
          onClose={() => setIsModalOpen((prev) => !prev)}
          onCreate={handleCreateNews}
        />
      )}
    </>
  );
};
