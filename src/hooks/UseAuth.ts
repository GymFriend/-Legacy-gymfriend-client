import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/RootReducer";
import { useNavigate } from "react-router-dom";

export const useAuth = (): void => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.account.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
};
