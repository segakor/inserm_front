import { Title } from "../../common/Typography";
import { areas, noop } from "../../constants";
import { CampaignCard, GrouppedCampaign, Role } from "../../types";
import { StatusesFlat } from "./Card/StatusesFlat";
import styled from "styled-components";
import { useState } from "react";
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import { TableProject } from "../Table/TableProject";
import { TableProjectNotChangeable } from "../Table/TableProjectNotChangeable";
import { TableCampaignChangeable } from "../Table/TableCampaignChangeable";
import { getNumWord } from "../../utils/getCountReviews";
/* import Link from "antd/es/typography/Link"; */

type Props = {
  group: GrouppedCampaign[];
  role: Role;
  id: string;
  onUpdate?: (campaignId: string) => void;
};

const WrapperStatuses = styled.div`
  border-radius: 10px;
  background: #ffffff;
  width: 100%;
  padding: 12px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Card = styled.div`
  padding: 12px 20px;
  background: #1579e9;
  border-radius: 10px;
  color: white;
  margin-bottom: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
const Cercle = styled.div`
  min-width: 25px;
  min-height: 25px;
  background: #ffffff;
  border-radius: 50%;
  color: black;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;
const Link = styled.a`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
`;
const Toggle = styled.div`
  display: flex;
  grid-gap: 16px;
  align-items: center;
  align-content: center;
  cursor: pointer;
`;
const Count = styled.div`
  min-width: 70px;
`;
const Box = styled.div`
  display: flex;
  grid-gap: 16px;
  align-items: center;
  align-content: center;
  width: 85%;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const CardComponent = ({
  card,
  keyItem,
  role,
  id,
  onUpdate,
}: {
  card: CampaignCard;
  keyItem: number;
  role: Role;
  id: string;
  onUpdate: (campaignId: string) => void;
}) => {
  const [chevron, setChevron] = useState(false);
  const onClickChevron = () => {
    setChevron(!chevron);
  };
  const reviews = card.reviews.map((item, index) => ({
    ...item,
    key: index.toString(),
  }));

  return (
    <>
      <Card>
        <Header>
          <Box>
            <Cercle>{keyItem}</Cercle>
            <Link href={card.link} target="_blank">
              {card.link}
            </Link>
          </Box>
          <Toggle onClick={onClickChevron}>
            <Count>
              {card.amount} {getNumWord(card.amount, "review")}
            </Count>
            <div>
              {chevron ? (
                <UpCircleFilled style={{ fontSize: "24px" }} />
              ) : (
                <DownCircleFilled style={{ fontSize: "24px" }} />
              )}
            </div>
          </Toggle>
        </Header>
      </Card>
      {chevron && (
        <>
          {role === "CLIENT" && (
            <TableProject reviews={reviews} isLoading={false} withoutLink />
          )}
          {(role === "ADMIN" || role === "HOST" || role === "SUPERVISOR") && (
            <TableCampaignChangeable
              reviews={reviews}
              isLoading={false}
              onUpdate={onUpdate}
              campaingId={id}
              cardId={card.id.toString()}
              link={card.link}
            />
          )}
          {role === "SUPPORT" && (
            <TableProjectNotChangeable reviews={reviews} isLoading={false} />
          )}
        </>
      )}
    </>
  );
};

export const CampaignReviews = ({ group, role, id, onUpdate }: Props) => {
  return (
    <>
      {group.map((item, index) => (
        <div key={index}>
          <Title level={5} style={{ fontSize: "18px" }}>
            {areas.find((area) => area.value === item.type)?.label}
          </Title>
          <WrapperStatuses>
            <StatusesFlat statuses={item.statuses} />
          </WrapperStatuses>
          {item.cards.map((card, index) => (
            <CardComponent
              card={card}
              key={index}
              keyItem={index + 1}
              role={role}
              id={id}
              onUpdate={onUpdate ? onUpdate : noop}
            />
          ))}
        </div>
      ))}
    </>
  );
};
