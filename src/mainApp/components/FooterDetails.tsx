import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useLocalState } from "../context/hooks";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../../utils";

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

  const role = tokenService.getRole();

  const state = useLocalState();

  const { pages } = state;

  const nextIndexId = pages.findIndex((item) => item === Number(currentPageId)) + 1;

  const nextId = pages[nextIndexId];

  const nextPage = () => {
    navigation(`/app/${role?.toLowerCase()}/${type}/${nextId}`);
  };

  return (
    <Wrapper>
      <Button
        type="primary"
        icon={<DoubleRightOutlined />}
        disabled={!pages.length || !nextId}
        onClick={nextPage}
      />
    </Wrapper>
  );
};
