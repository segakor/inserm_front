import React from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../common/Typography";
import { Campaign } from "../../../types";
import { tokenService } from "../../../utils";
import { Box, Panel } from "./styles";
import { StatusesFlat } from "./StatusesFlat";

type Props = {
  campaign: Campaign;
};

export const FlatCardCampaign = ({ campaign }: Props) => {
  const { period, statuses, name, id } = campaign;

  const navigation = useNavigate();
  const role = tokenService.getRole();

  return (
    <>
      <Panel
        isCompleted={false}
        onClick={() => navigation(`/app/${role?.toLowerCase()}/campaign/${id}`)}
      >
        <Box style={{ marginBottom: "15px" }}>
          <Title level={5} style={{ fontWeight: "800" }}>
            {`[${id}] `}
            {name}
          </Title>
          <>~ {period} мес.</>
        </Box>
        <Box>
          <StatusesFlat statuses={statuses} />
        </Box>
      </Panel>
    </>
  );
};
