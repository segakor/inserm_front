import { ReactNode } from "react";
import { usePerson } from "../../hooks/usePerson";

export const PartnerRouteWrapper = ({
  children,
}: {
  children: ReactNode | JSX.Element;
}) => {
  usePerson();

  return <>{children}</>;
};
