import { UserData } from "../../../common/types/types";

export const getUserData = (): UserData => {
  return JSON.parse(
    localStorage.getItem("bildetema-userdata") ?? "{}",
  ) as UserData;
};

export const setUserData = (updatedUserData: UserData): void => {
  localStorage.setItem("bildetema-userdata", JSON.stringify(updatedUserData));
};

export const useUserData = (): [
  userData: UserData,
  setUserData: (updatedUserData: UserData) => void,
] => {
  const userData = getUserData();
  return [userData, setUserData];
};
