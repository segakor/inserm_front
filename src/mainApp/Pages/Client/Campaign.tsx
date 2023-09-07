import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";
import { DetailsCard } from "../../components/Card";
import { useGetBrief } from "../../hooks/useGetBrief";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { ModalBrief } from "../../components/Modal";
import { useGetReviewsCampaign } from "../../hooks/useGetReviewsCampaign";
import { CampaignReviews } from "../../components/CampaignReviews";
import { Spin, Typography } from "antd";
import { ArchiveCampaign } from "../../components/ArchiveCampaign";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const CardBlock = styled.div`
  width: 600px;
  @media (max-width: 768px) {
    width: auto;
  }
`;
const TitleDate = styled(Title)`
  margin-bottom: 20px !important;
`;

const Campaign = () => {
  const params = useParams();
  const campaignId = params.campaignId || "";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleGetBrief();
  };

  const { data, isLoading } = useGetReviewsCampaign(campaignId);

  const { brief, handleGetBrief } = useGetBrief(campaignId, "campaign");

  return (
    <Page>
      <HeaderFlex>
        <Header>{data?.name || ""}</Header>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
      </HeaderFlex>
      <CardBlock>
        <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
          ~ {data?.period} мес.
        </TitleDate>
        <DetailsCard statuses={data?.statuses} />
      </CardBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          id={campaignId}
          brief={brief}
          typeBrief={"campaign"}
        />
      )}
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <CampaignReviews
            group={data?.groppedByType || []}
            role={"CLIENT"}
            id={data?.id.toString() || ""}
          />
          {!!data?.archive.length && <Title level={5}>Архив</Title>}
          {data?.archive.map((item, index) => (
            <ArchiveCampaign
              date={item.date}
              statuses={item.statuses}
              reviews={item.reviews}
              link={item.link}
              key={index}
            />
          ))}
        </>
      )}
    </Page>
  );
};

export default Campaign;
