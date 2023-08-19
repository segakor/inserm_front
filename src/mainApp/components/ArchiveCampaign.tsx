import { useState } from "react";
import styled from "styled-components";
import { Title } from "../../common/Typography";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Reviews, Statuses } from "../../types";
import { getDate } from "../../utils";
import { TableProject } from "../Table/TableProject";

const Wrapper = styled.div`
  border-radius: 10px;
  background-color: #ffff;
  padding: 20px;
  margin-top: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
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
  margin-bottom: 20px;
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
  color: white;
  margin-bottom: 20px;
  cursor: pointer;
`;

type ReviewsTableItem = Reviews & {
  key: string;
};

type Props = {
  date: number;
  statuses: Statuses;
  reviews: ReviewsTableItem[];
  link: string;
};

export const ArchiveCampaign = ({ date, statuses, reviews, link }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Header>
        <Title
          style={{ fontSize: "14px", color: "#1579E9", fontWeight: "700" }}
        >
          {getDate({ date })}
        </Title>
        <HeaderAction>
          <div>
            {!isOpen ? (
              <PlusCircleOutlined style={{ color: "#1579E9" }} />
            ) : (
              <MinusCircleOutlined style={{ color: "#1579E9" }} />
            )}
          </div>
          <div>
            <Title
              style={{ fontSize: "14px", fontWeight: "700" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? "Смотреть отчет" : "Закрыть отчет"}
            </Title>
          </div>
        </HeaderAction>
      </Header>
      <DetailCard>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Всего
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>
            {statuses?.all}
          </Title>
        </Card>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Опубликовано
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>
            {statuses?.success}
          </Title>
        </Card>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Не прошло
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>
            {statuses?.reject}
          </Title>
        </Card>
        <Card>
          <Title
            style={{ fontSize: "14px", color: "#8E8E8E", fontWeight: "400" }}
          >
            Удалено
          </Title>
          <Title style={{ fontSize: "14px", fontWeight: "800" }}>
            {statuses?.delete}
          </Title>
        </Card>
      </DetailCard>
      {isOpen && (
        <>
          <Link>{link}</Link>
          <TableProject reviews={reviews} isLoading={false} withoutLink />
        </>
      )}
    </Wrapper>
  );
};
