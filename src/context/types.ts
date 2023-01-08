import { Person, Project, ListOfAdmin } from "../type";

export type LocalState = {
  personInfo: Person | undefined;
  clientProject: Project[] | undefined;
  role: 'CLIENT' | 'HOST' | 'SUPERVISOR' | 'SUPPORT' | 'ADMIN' | undefined;
  listOfAdmin: ListOfAdmin[] | undefined
};
