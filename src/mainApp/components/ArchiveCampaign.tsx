import { useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { ArchiveCampaignCard, ArchiveCard } from "../../types";
import { getDate } from "../../utils";
import { TableProject } from "../Table/TableProject";

const ArchiveCampaignWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #ffff;
  margin-top: 20px;
`;

const ItemWrapper = styled.div`
  border-radius: 10px;
  background-color: #ffff;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid rgb(21, 121, 233);
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  div {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;
const DetailCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 17px;
`;

const Card = styled.div`
  border: 1px solid #8e8e8e;
  border-radius: 10px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  padding: 12px 20px 12px 20px;
  align-items: center;
`;
const Link = styled.div`
  padding: 12px 20px;
  background: #1579e9;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  a {
    color: white;
  }
`;

type Props = {
  archives: ArchiveCampaignCard;
};

const Item = ({ item }: { item: ArchiveCard }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ItemWrapper>
      <Header>
        <HeaderAction onClick={() => setIsOpen(!isOpen)}>
          <div>
            {!isOpen ? (
              <PlusCircleOutlined style={{ color: "#1579E9" }} />
            ) : (
              <MinusCircleOutlined style={{ color: "#1579E9" }} />
            )}
          </div>
          <div>
            <Title style={{ fontSize: "14px", fontWeight: "700" }}>
              {!isOpen ? "Смотреть отчет" : "Закрыть отчет"}
            </Title>
          </div>
        </HeaderAction>
      </Header>
      <DetailCard>
        <Card>
          <Title
            style={{
              fontSize: "14px",
              color: "#8E8E8E",
              fontWeight: "500",
            }}
          >
            Всего
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>
            {item.statuses?.all}
          </Title>
        </Card>
        <Card>
          <Title
            style={{
              fontSize: "14px",
              color: "#8E8E8E",
              fontWeight: "500",
            }}
          >
            Опубликовано
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "rgb(27, 189, 63)",
            }}
          >
            {item.statuses?.success}
          </Title>
        </Card>
        <Card>
          <Title
            style={{
              fontSize: "14px",
              color: "#8E8E8E",
              fontWeight: "500",
            }}
          >
            Не прошло
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "rgb(250, 114, 17)",
            }}
          >
            {item.statuses?.reject}
          </Title>
        </Card>
        <Card>
          <Title
            style={{
              fontSize: "14px",
              color: "#8E8E8E",
              fontWeight: "500",
            }}
          >
            Удалено
          </Title>
          <Title
            style={{
              fontSize: "14px",
              fontWeight: "800",
              color: "rgb(255, 30, 30)",
            }}
          >
            {item.statuses?.delete}
          </Title>
        </Card>
      </DetailCard>
      {isOpen && (
        <>
          <Link>
            <a target="_blank" href={item.link}>
              {item.link}
            </a>
          </Link>
          <TableProject reviews={item.reviews} isLoading={false} withoutLink />
        </>
      )}
    </ItemWrapper>
  );
};

export const ArchiveCampaign = ({ archives }: Props) => {
  return (
    <ArchiveCampaignWrapper>
      <Title style={{ fontSize: "14px", color: "#1579E9", fontWeight: "700" }}>
        {getDate({ date: archives.date })}
      </Title>
      {archives.archive.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </ArchiveCampaignWrapper>
  );
};
