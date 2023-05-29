import {
  Person,
  Project,
  Admin,
  ProjectForPayment,
  Notify,
  Campaign,
} from "../../types";

export type LocalState = {
  personInfo: Person | undefined;
  clientProject: Project[] | undefined;
  clientCampaign: Campaign[] | undefined;
  role: "CLIENT" | "HOST" | "SUPERVISOR" | "SUPPORT" | "ADMIN" | undefined;
  listOfAdmin: Admin[] | undefined;
  projectForPayment: ProjectForPayment | undefined;
  socketNotify: any | null;
  listOfNotify: Notify[];
};
