import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";
import { DetailsCard } from "../../components/Card";
import { tokenService } from "../../../utils";
import { useGetBrief } from "../../hooks/useGetBrief";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { ModalBrief } from "../../components/Modal";
import { Notes } from "../../components/Notes";
import { useGetReviewsCampaign } from "../../hooks/useGetReviewsCampaign";
import { CampaignReviews } from "../../components/CampaignReviews";
import { FooterDetails } from "../../components/FooterDetails";
import { Divider } from "antd";
import { ArchiveCampaign } from "../../components/ArchiveCampaign";
import { CampaignList } from "../../components/CampaignList";
import { ButtonRemovedArchived } from "../../Button/ButtonRemovedArchived";
import { ButtonDeleteCampaign } from "../../Button/ButtonDeleteCampaign";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
const WrapperCard = styled.div`
  display: flex;
  grid-gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  margin-bottom: 10px;
`;

const CampaignDetails = () => {
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

  const { handleGetReviews, data, campaignList } = useGetReviewsCampaign(
    campaignId,
    true
  );

  const { brief, handleGetBrief } = useGetBrief(campaignId, "campaign");

  const role = tokenService.getRole();

  return (
    <Page>
      <Header>{data?.name || ""}</Header>
      <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
        ~ {data?.period} мес.
      </TitleDate>
      <WrapperCard>
        <CardBlock>
          <DetailsCard statuses={data?.statuses} />
        </CardBlock>
        <Notes id={campaignId} type={"campaign"} />
        <CampaignList
          campaigns={campaignList?.campaigns || []}
          projects={campaignList?.projects || []}
        />
        <div>
          <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
          <ButtonRemovedArchived
            campaignId={Number(campaignId)}
            onUpdate={handleGetReviews}
          />
          <ButtonDeleteCampaign campaignId={Number(campaignId)} />
        </div>
      </WrapperCard>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          id={campaignId}
          brief={brief}
          typeBrief={"campaign"}
        />
      )}
      <CampaignReviews
        group={data?.groppedByType || []}
        role={role}
        id={data?.id.toString() || ""}
        onUpdate={handleGetReviews}
      />
      {data?.archive.map((item, index) => (
        <ArchiveCampaign
          date={item.date}
          statuses={item.statuses}
          reviews={item.reviews}
          link={item.link}
          key={index}
        />
      ))}
      <Divider />
      <FooterDetails type={"campaign"} currentPageId={campaignId} />
    </Page>
  );
};

export default CampaignDetails;
