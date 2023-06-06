import { Person, Project, Admin, Notify, Campaign } from "../../types";

export type LocalState = {
  personInfo: Person | undefined;
  clientProject: Project[] | undefined;
  clientCampaign: Campaign[] | undefined;
  role: "CLIENT" | "HOST" | "SUPERVISOR" | "SUPPORT" | "ADMIN" | undefined;
  listOfAdmin: Admin[] | undefined;
  socketNotify: any | null;
  listOfNotify: Notify[];
  pagesProject: number[];
  pagesCampaign: number[];
};
