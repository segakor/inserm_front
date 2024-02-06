import { Person, Project, Admin, Notify, Campaign } from "../../types";

export type LocalState = {
  personInfo: Person | undefined;
  clientProject: Project[] | undefined;
  clientCampaign: Campaign[] | undefined;
  isLoadingProject: boolean;
  role: "CLIENT" | "HOST" | "SUPERVISOR" | "SUPPORT" | "ADMIN" | undefined;
  listOfAdmin: Admin[] | undefined;
  socketNotify: any | null;
  listOfNotify: Notify[];
  pagesProject: number[];
  pagesCampaign: number[];
  filterProject: {
    activeTab: "project" | "campaign";
    isActive: boolean;
    sortKey: string;
    sortOrder: string;
  };
};
