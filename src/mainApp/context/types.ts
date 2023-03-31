import { Person, Project, Admin, ProjectForPayment } from "../../types";

export type LocalState = {
  personInfo: Person | undefined;
  clientProject: Project[] | undefined;
  role: 'CLIENT' | 'HOST' | 'SUPERVISOR' | 'SUPPORT' | 'ADMIN' | undefined;
  listOfAdmin: Admin[] | undefined;
  projectForPayment: ProjectForPayment | undefined;
};
