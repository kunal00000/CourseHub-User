import { atom } from "recoil";

export const userAtom = atom({
  key: "username",
  default: "",
});
