import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useLocalState } from "../context/hooks";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type Props = {
  type: "project" | "campaign";
  currentPageId: string;
};

export const FooterDetails = ({ type, currentPageId }: Props) => {
  const navigation = useNavigate();

  const state = useLocalState();

  const { pagesProject, pagesCampaign } = state;

  const nextIndexId =
    type === "campaign"
      ? pagesCampaign.findIndex((item) => item === Number(currentPageId)) + 1
      : pagesProject.findIndex((item) => item === Number(currentPageId)) + 1;

  const nextId =
    type === "campaign"
      ? pagesCampaign[nextIndexId]
      : pagesProject[nextIndexId];

  const nextPage = () => {
    navigation(`/app/admin/${type}/${nextId}`);
  };

  return (
    <Wrapper>
      <Button
        type="primary"
        icon={<DoubleRightOutlined />}
        disabled={!nextId}
        onClick={nextPage}
      />
    </Wrapper>
  );
};
