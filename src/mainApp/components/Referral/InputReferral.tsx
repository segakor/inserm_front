import styled from "styled-components";
import { Title } from "../../../common/Typography";
import { Button, Input, Space } from "antd";
import { cliapbord } from "../../../utils";
import { useReferral } from "../../hooks/useReferral";
import { useEffect } from "react";

const StyledTitle = styled(Title)`
  margin-bottom: 30px !important;
`;

const Wrapper = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const InputReferral = () => {
  const { referralLink, handleGetLink } = useReferral();

  useEffect(() => {
    handleGetLink();
  }, []);
  return (
    <Wrapper>
      <StyledTitle level={5} style={{ fontWeight: "400" }}>
        Скопируйте готовую ссылку и отправляйте будущему клиенту.
      </StyledTitle>
      <>
        <Space.Compact style={{ width: "100%" }}>
          <Input value={referralLink} size="large" />
          <Button
            type="primary"
            size="large"
            onClick={() => cliapbord(referralLink)}
            disabled={!referralLink}
            style={{ background: "#313131" }}
          >
            Копировать
          </Button>
        </Space.Compact>
      </>
    </Wrapper>
  );
};
