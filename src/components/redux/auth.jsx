import { Notify } from "notiflix";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authOperations } from './authOperations';

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (credentials) => {
    try {
      await dispatch(authOperations.register(credentials));
      navigate("/signin");
    } catch (error) {
      Notify.failure("Something went wrong on register");
      console.log(error);
      navigate("/signup");
    }
  };

  const login = async (credentials) => {
    try {
      await dispatch(authOperations.logIn(credentials));
      navigate("/contacts");
    } catch (error) {
      Notify.failure("Something went wrong on login");
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await dispatch(authOperations.logOut());
      navigate("/");
    } catch (error) {
      Notify.failure("Something went wrong on logout");
      console.log(error);
    }
  };

  return {
    register,
    login,
    logout,
  };
};

export default useAuth;
export { authOperations };
