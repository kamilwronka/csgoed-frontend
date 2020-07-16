import { useContext } from "react";
import UserDataContext from "contexts/UserDataContext";

export default function useUserData() {
  return useContext(UserDataContext);
}
