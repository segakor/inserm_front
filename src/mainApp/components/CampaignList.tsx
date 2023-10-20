import styled from "styled-components";
import { useScroll } from "../hooks/useScroll";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: white;
  padding: 16px;
  width: 400px;
  @media (max-width: 768px) {
    width: auto;
    margin-bottom: 20px;
  }
  border-radius: 10px;
  max-height: 280px;
  border: 1px solid #1579e9;
`;
const MessageBox = styled.div`
  height: 250px;
  overflow: auto;
  padding: 5px;
  word-wrap: break-word;
  margin-bottom: 8px;
`;
const Campaign = styled.div`
  margin-bottom: 4px;
  padding: 2px;
`;

type Props = {
  campaigns: { id: number; name: string }[];
  projects: { id: number; name: string }[];
};

export const CampaignList = ({ campaigns, projects }: Props) => {
  const { element } = useScroll();

  const navigation = useNavigate();

  const onNavigate = (
    e: React.MouseEvent<HTMLElement>,
    type: string,
    id: number
  ) => {
    if (e.ctrlKey) {
      window.open(
        `/app/admin/${type}/${id}`,
        "_blank",
        "rel=noopener noreferrer"
      );
      return;
    }
    navigation(`/app/admin/${type}/${id}`);
  };

  return (
    <Wrapper>
      <MessageBox ref={element}>
        {campaigns.map((item, index) => (
          <Campaign key={index}>
            <a onClick={(e) => onNavigate(e, "campaign", item.id)}>
              {item.name}
            </a>
          </Campaign>
        ))}
        {projects.map((item, index) => (
          <Campaign key={index}>
            <a onClick={(e) => onNavigate(e, "project", item.id)}>
              {item.name}
            </a>
          </Campaign>
        ))}
      </MessageBox>
    </Wrapper>
  );
};
