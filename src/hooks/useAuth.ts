import { useContext } from "react";
import { AuthContext } from "../components/contexts/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;