import { Title } from "../../common/Typography";
import { areas, noop } from "../../constants";
import { CampaignCard, GrouppedCampaign, Role } from "../../types";
import { StatusesFlat } from "./Card/StatusesFlat";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import { TableProject } from "../Table/TableProject";
import { TableProjectNotChangeable } from "../Table/TableProjectNotChangeable";
import { TableCampaignChangeable } from "../Table/TableCampaignChangeable";
import { getNumWord } from "../../utils";
import { ButtonCopy } from "../Button/ButtonCopy";
import { cliapbord } from "../../utils";
import { ButtonChangeLink } from "../Button/ButtonChangeLink";
import { Form, Grid, Input } from "antd";
import { useChangeLink } from "../hooks/useChangeLink";
import { DetailsCard } from "./Card";

const { useBreakpoint } = Grid;

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
  @media (max-width: 768px) {
    padding: 15px;
  }
`;
const Card = styled.div<{ isPromo?: boolean }>`
  padding: 12px 20px;
  background: ${(props) => (props.isPromo ? "#22cc77" : "#1579e9")};
  border-radius: 10px;
  color: white;
  margin-bottom: 20px;
  cursor: pointer;
  position: -webkit-sticky; /* Safari & IE */
  position: sticky;
  top: 0;
  z-index: 1;
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

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
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
  const [isEdit, setIsEdit] = useState(false);

  const [form] = Form.useForm();

  const { handleChangeLink } = useChangeLink();

  const onClickChevron = () => {
    setChevron(!chevron);
  };

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const onReset = () => {
    form.resetFields();
    setIsEdit(false);
  };

  const linkField = Form.useWatch("link", form);

  const onSave = () => {
    handleChangeLink({ cardId: card.id, link: linkField });
    setIsEdit(false);
    onUpdate(id);
  };

  const reviews = card.reviews.map((item, index) => ({
    ...item,
    key: index.toString(),
  }));

  const onCopyLink = () => {
    cliapbord(card.link);
  };

  useEffect(() => {
    setChevron(false);
  }, [id]);

  return (
    <StyledForm form={form}>
      <Card onClick={onClickChevron} isPromo={card.isPromo}>
        <Header>
          <Box>
            <Cercle>{keyItem}</Cercle>
            {role !== "CLIENT" && <ButtonCopy onClick={onCopyLink} />}
            {role !== "CLIENT" && !isEdit && (
              <ButtonChangeLink onClick={onClickEdit} type="edit" />
            )}
            {role !== "CLIENT" && isEdit && (
              <ButtonChangeLink
                onClick={onSave}
                type="save"
                style={{ color: "green" }}
              />
            )}
            {role !== "CLIENT" && isEdit && (
              <ButtonChangeLink
                onClick={onReset}
                type="cancel"
                style={{ color: "red" }}
              />
            )}
            {!isEdit && (
              <Link
                href={card.link}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                {card.link}
              </Link>
            )}
            <Form.Item name={"link"} initialValue={card.link} hidden={!isEdit}>
              <Input onClick={(e) => e.stopPropagation()} />
            </Form.Item>
          </Box>
          <Toggle>
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
    </StyledForm>
  );
};

export const CampaignReviews = ({ group, role, id, onUpdate }: Props) => {
  const screens = useBreakpoint();
  const isMobile = !!screens.xs || !screens.lg;
  return (
    <>
      {group.map((item, index) => (
        <div key={index}>
          <Title level={5} style={{ fontSize: "18px" }}>
            {areas.find((area) => area.value === item.type)?.label}
          </Title>
          {item.cards.map((card, index) => (
            <div key={index}>
              <WrapperStatuses>
                {!isMobile ? (
                  <StatusesFlat statuses={card.statuses} />
                ) : (
                  <DetailsCard statuses={card.statuses} withBorder/>
                )}
              </WrapperStatuses>
              <CardComponent
                card={card}
                keyItem={index + 1}
                role={role}
                id={id}
                onUpdate={onUpdate ? onUpdate : noop}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
