import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";
import { DetailsCard } from "../../components/Card";
import { getRangeDate, tokenService } from "../../../utils";
import { TableProjectChangeable } from "../../Table/TableProjectChangeable";
import { useGetBrief } from "../../hooks/useGetBrief";
import { TableProjectNotChangeable } from "../../Table/TableProjectNotChangeable";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { ModalBrief } from "../../components/ModalBrief";
import { Notes } from "../../components/Notes";
import { useGetReviewsCampaign } from "../../hooks/useGetReviewsCampaign";

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

  const {
    handleGetReviews,
    data
  } = useGetReviewsCampaign(campaignId);

  const { brief, handleGetBrief } = useGetBrief(campaignId, 'campaign');


  const role = tokenService.getRole();

  return (
    <Page>
      <HeaderFlex>
        <Header>{data?.name || ""}</Header>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
      </HeaderFlex>
      <WrapperCard>
        <CardBlock>
          <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
            ~ {data?.period} мес.
          </TitleDate>
          <DetailsCard statuses={data?.statuses} />
        </CardBlock>
        <Notes id={campaignId} type={'campaign'}/>
      </WrapperCard>
      {isModalOpen && (
        <ModalBrief onClose={handleClose} id={campaignId} brief={brief} typeBrief={'campaign'}/>
      )}
      {/* {role === "ADMIN" || role === "HOST" || role === "SUPERVISOR" ? (
        <TableProjectChangeable
          reviews={reviews}
          isLoading={isLoading}
          onUpdate={handleGetReviews}
          projectId={campaignId}
        />
      ) : (
        <TableProjectNotChangeable reviews={reviews} isLoading={isLoading} />
      )} */}
    </Page>
  );
};

export default CampaignDetails;