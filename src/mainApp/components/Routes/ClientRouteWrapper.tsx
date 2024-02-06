import { ReactNode, useEffect } from "react";
import { useGetProject } from "../../hooks/useGetProject";
import { useGetCampaign } from "../../hooks/useGetCampaign";
import { usePerson } from "../../hooks/usePerson";
import { useLocalState } from "../../context/hooks";

export const ClientRouteWrapper = ({
  children,
}: {
  children: ReactNode | JSX.Element;
}) => {
  const { handleGetClientProject } = useGetProject();
  const { handleGetCampaign } = useGetCampaign();
  usePerson();

  const state = useLocalState();

  const {
    filterProject: { isActive },
  } = state;

  useEffect(() => {
    handleGetClientProject();
    handleGetCampaign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);
  return <>{children}</>;
};
