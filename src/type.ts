import { BREAKPOINT_NAMES } from "./constnants";

export type KeysFromConst<T extends {}> = T[keyof T];

export type Breakpoints = KeysFromConst<typeof BREAKPOINT_NAMES>;