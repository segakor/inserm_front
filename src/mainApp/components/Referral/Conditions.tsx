import styled from "styled-components";
import { Title } from "../../../common/Typography";

const StyledTitle = styled(Title)`
  margin-bottom: 30px !important;
`;

const Wrapper = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const Conditions = () => {
  return (
    <Wrapper>
      <StyledTitle level={5} style={{ fontWeight: "400" }}>
       Условия
      </StyledTitle>
    </Wrapper>
  );
};
