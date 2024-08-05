import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as ACTION from "../../redux/reducers/user/userReducer";
import { API } from "../security/secreteKey";

const Logout = () => {
  const navigate = useNavigate();
  const { error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(ACTION.logoutUserStart());

      const { data } = await axios.get(`${API}/auth/logout`);

      if (data.success) {
        dispatch(ACTION.logoutUserSuccess(data.message));
        toast.success(data.message);

        // Remove token from cookies
        Cookies.remove("token");
        navigate("/");
      } else {
        dispatch(ACTION.logoutUserFailure("Logout failed"));
        toast.error("User could not logout");
      }
    } catch (error) {
      dispatch(
        ACTION.logoutUserFailure(
          error.response ? error.response.data.message : "Network error"
        )
      );
      toast.error("Failed to logout. Please try again.");
    }
  };

  return { error, currentUser, signOut };
};

export default Logout;
