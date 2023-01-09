import { Person, Project, ListOfAdmin, ProjectForPayment } from "../type";

export type LocalState = {
  personInfo: Person | undefined;
  clientProject: Project[] | undefined;
  role: 'CLIENT' | 'HOST' | 'SUPERVISOR' | 'SUPPORT' | 'ADMIN' | undefined;
  listOfAdmin: ListOfAdmin[] | undefined;
  projectForPayment: ProjectForPayment | undefined;
};
