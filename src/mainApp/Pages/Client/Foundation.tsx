import styled from "styled-components";
import { Header, Title } from "../../../common/Typography";
import { CollapseFoundation } from "../../components/CollapseFoundation";
import { textFoundation } from "../../../constants";
import { useNavigate } from "react-router-dom";

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

const Foundation = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Header>База знаний</Header>
      <Box>
        <StyledTitle level={5} style={{ fontWeight: "400" }}>
          Если вы не нашли ответ на свой вопрос, перейдите в блок{" "}
          <b
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/app/client/help")}
          >
            Техподдержка
          </b>{" "}
          и уточните его.
        </StyledTitle>
        {textFoundation.map((item, index) => (
          <CollapseFoundation {...item} key={index} />
        ))}
      </Box>
    </Page>
  );
};

export default Foundation;
