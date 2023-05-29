import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Header } from "../../../common/Typography";
import { DetailsCard } from "../../components/Card";
import { TableProject } from "../../Table/TableProject";
import { ArchiveProjectList } from "../../components/ArchiveProjectList";
import { getRangeDate } from "../../../utils";
import { useGetReviewsProject } from "../../hooks/useGetReviewsProject";
import { useGetBrief } from "../../hooks/useGetBrief";
import { ButtonBrief } from "../../Button/ButtonBrief";
import { ModalBrief } from "../../components/ModalBrief";

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

const Project = () => {
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

  const { reviews, isLoading, projectName, tariff, statusess } = useGetReviewsProject(projectId);

  const { brief, handleGetBrief } = useGetBrief(projectId);

  const start = tariff?.start;
  const end = tariff?.end;

  return (
    <Page>
      <HeaderFlex>
        <Header>{projectName}</Header>
        <ButtonBrief brief={brief ? true : false} onClick={handleOpen} />
      </HeaderFlex>
      <CardBlock>
        <TitleDate level={5} style={{ fontSize: "14px", fontWeight: "400" }}>
          {getRangeDate({ start, end })}
        </TitleDate>
        <DetailsCard statuses={statusess} />
      </CardBlock>
      {isModalOpen && (
        <ModalBrief
          onClose={handleClose}
          id={projectId}
          brief={brief}
          typeBrief={"project"}
        />
      )}
      <TableProject reviews={reviews} isLoading={isLoading} />
      <ArchiveProjectList projectId={projectId} />
    </Page>
  );
};

export default Project;