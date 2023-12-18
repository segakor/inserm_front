import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../common/Typography";
import { demoBrief, demoReviewCampaign } from "../constants";
import { ButtonBrief } from "../../mainApp/Button/ButtonBrief";
import { DetailsCard } from "../../mainApp/components/Card";
import { CampaignReviews } from "../../mainApp/components/CampaignReviews";
import { ModalBriefDemo } from "../components/ModalBriefDemo";

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

export const CampaignDemo = () => {
  const params = useParams();
  const campaignId = params.campaignId || "";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const brief = demoBrief[Number(campaignId) - 1];

  const currentCampaign = demoReviewCampaign?.find(
    (item) => item.id === Number(campaignId)
  );

  return (
    <Page>
      <HeaderFlex>
        <Header>{currentCampaign?.name || ""}</Header>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
      </HeaderFlex>
      <CardBlock>
        <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
          ~ {currentCampaign?.period} мес.
        </TitleDate>
        <DetailsCard statuses={currentCampaign?.statuses} />
      </CardBlock>
      {isModalOpen && (
        <ModalBriefDemo
          onClose={handleClose}
          id={campaignId}
          brief={brief}
          typeBrief={"campaign"}
        />
      )}
      <CampaignReviews
        group={(currentCampaign?.groppedByType as any) || []}
        role={"CLIENT"}
        id={currentCampaign?.id.toString() || ""}
      />
    </Page>
  );
};
