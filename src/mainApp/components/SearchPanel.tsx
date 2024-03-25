import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ChangeEvent } from "react";
import styled from "styled-components";

const StyledInput = styled(Input)`
  background: #ffffff;
  border-radius: 10px;
  height: 40px;
  padding: 12px 20px 12px 20px;
  display: flex;
  margin-bottom: 24px;
`;

export const SearchPanel = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <StyledInput
        suffix={<SearchOutlined />}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};
