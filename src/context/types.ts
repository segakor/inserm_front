import { Person, Project } from "../type";

export type LocalState = {
  personInfo: Person | undefined;
  clientProject: Project[] | undefined;
  role: 'CLIENT' | 'HOST' | 'SUPERVISOR' | 'SUPPORT' | 'ADMIN' | undefined;
};
