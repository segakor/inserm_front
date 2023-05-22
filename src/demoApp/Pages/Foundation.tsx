import styled from "styled-components";
import { Header, Title } from "../../common/Typography";
import { textFoundation } from "../../constants";
import { CollapseFoundation } from "../../mainApp/components/CollapseFoundation";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledTitle = styled(Title)`
  margin-bottom: 40px !important;
`;

const Box = styled.div`
  padding-right: 40px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const Foundation = () => {
  return (
    <Page>
      <Header>База знаний</Header>
      <Box>
        <StyledTitle level={5} style={{ fontWeight: "400" }}>
          Если вы не нашли ответ на свой вопрос, перейдите в блок{" "}
          <b>Нужна помощь</b> и уточните у техподдержки.
        </StyledTitle>
        {textFoundation.map((item, index) => (
          <CollapseFoundation {...item} key={index} />
        ))}
      </Box>
    </Page>
  );
};