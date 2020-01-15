import { useSelector } from "react-redux";

const useAuthData = () => {
  return useSelector(state => state.auth);
};

export default useAuthData;
