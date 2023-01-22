import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as UpIcon } from "../../assets/up.svg";
import { ReactComponent as DownIcon } from "../../assets/down.svg";
import { Title } from "../../common/Typography";

type Props = {
  title: string;
  desc: string;
}

const Panel = styled.div`
  background: #ffffff;
  border-radius: 10px;
  min-height: 60px;
  padding: 20px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  cursor:pointer;
  /* :hover {
    background-color: whitesmoke;
  } */
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Description = styled.div`
  max-width: 358px;
  margin-top: 15px;
`;
const StyledTitle = styled(Title)`
  font-size: 14px !important;
`;
const Icon = styled.div`
  cursor: pointer;
`;

export const CollapseFoundation = ({ title, desc }: Props) => {
  const [chevron, setChevron] = useState(false);

  const onClickChevron = () => {
    setChevron(!chevron);
  };

  return (
    <>
      <Panel onClick={onClickChevron}>
        <PanelHeader>
          <Title level={5} style={{ fontWeight: "700" }}>
            {title}
          </Title>
          <Icon>
            {chevron ? <UpIcon /> : <DownIcon />}
          </Icon>
        </PanelHeader>
        {chevron && (
          <Description>
            <StyledTitle level={5} style={{ fontWeight: "400" }}>
              {desc}
            </StyledTitle>
          </Description>
        )}
      </Panel>
    </>
  );
};
