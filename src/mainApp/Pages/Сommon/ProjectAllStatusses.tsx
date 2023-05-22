import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";
import { DetailsCard } from "../../components/DetailsCard";
import { ArchiveProjectList } from "../../components/ArchiveProjectList";
import { getRangeDate, tokenService } from "../../../utils";
import { useGetReviews } from "../../hooks/useGetReviews";
import { TableProjectChangeable } from "../../Table/TableProjectChangeable";
import { useGetBrief } from "../../hooks/useGetBrief";
import { TableProjectNotChangeable } from "../../Table/TableProjectNotChangeable";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { ModalBrief } from "../../components/ModalBrief";
import { Notes } from "../../components/Notes";

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

const ProjectAllStatusses = () => {
  const params = useParams();
  const projectId = params.projectId || "";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    handleGetBrief();
  };

  const {
    reviews,
    isLoading,
    projectName,
    statusess,
    tariff,
    handleGetReviews,
  } = useGetReviews(projectId);

  const { brief, handleGetBrief } = useGetBrief(projectId);

  const start = tariff?.start;
  const end = tariff?.end;

  const role = tokenService.getRole();

  return (
    <Page>
      <HeaderFlex>
        <Header>{projectName || ""}</Header>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
      </HeaderFlex>
      <WrapperCard>
        <CardBlock>
          <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
            {getRangeDate({ start, end })}
          </TitleDate>
          <DetailsCard statuses={statusess} />
        </CardBlock>
        <Notes projectId={projectId} />
      </WrapperCard>
      {isModalOpen && (
        <ModalBrief onClose={handleClose} projectId={projectId} brief={brief} typeBrief={'project'}/>
      )}
      {role === "ADMIN" || role === "HOST" || role === "SUPERVISOR" ? (
        <TableProjectChangeable
          reviews={reviews}
          isLoading={isLoading}
          onUpdate={handleGetReviews}
          projectId={projectId}
        />
      ) : (
        <TableProjectNotChangeable reviews={reviews} isLoading={isLoading} />
      )}
      <ArchiveProjectList projectId={projectId} />
    </Page>
  );
};

export default ProjectAllStatusses;