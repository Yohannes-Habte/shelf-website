import { useEffect, useState } from "react";
import "./LoginForm.scss";
import { validEmail, validPassword } from "../../../utils/validation/validate";
import { toast } from "react-toastify";
import { API } from "../../../utils/security/secreteKey";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as LoginAction from "../../../redux/reducers/user/userReducer";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import Cookies from "js-cookie";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const initialState = {
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};
const LoginForm = () => {
  const navigate = useNavigate();

  // Global state variables
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialState);
  const { email, password, showPassword, rememberMe } = formData;

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  // Clear errors when the component mounts
  useEffect(() => {
    dispatch(LoginAction.clearErrors());
  }, [dispatch]);

  // change handler
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetHandler = () => {
    setFormData({
      email: "",
      password: "",
      showPassword: false,
      rememberMe: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validEmail(email)) {
      return toast.error("Invalid email");
    }

    if (!validPassword(password)) {
      return toast.error("Invalid password");
    }

    try {
      dispatch(LoginAction.loginStart());

      // The body
      const loginUser = {
        email: email,
        password: password,
        rememberMe: rememberMe,
      };
      const { data } = await axios.post(`${API}/auth/login`, loginUser, {
        withCredentials: true,
      });

      dispatch(LoginAction.loginSuccess(data.result));
      toast.success(data?.message);

      // Set token in cookies
      const token = data?.token;
      console.log("login token=", token);

      Cookies.set("token", token, {
        expires: rememberMe ? 30 : 1,
        secure: true,
        sameSite: "strict",
      });

      resetHandler();
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch(LoginAction.loginFailure(err.response.data.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Email input container */}
      <div className="input-container">
        <MdEmail className="icon" />
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
          placeholder="Enter Email"
          className="input-field"
        />
        <label htmlFor="" className="input-label">
          Email Address
        </label>
        <span className="input-highlight"></span>
      </div>

      {/* Password input container */}
      <div className="input-container">
        <RiLockPasswordFill className="icon" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={changeHandler}
          //onBlur={checkPasswordFormat}
          placeholder="Enter Password"
          className="input-field"
        />
        <label htmlFor="" className="input-label">
          Password
        </label>
      </div>

      {/* Show or hide Password input container */}

      <div className="show-password-container">
        <input
          type="checkbox"
          id="showPassword"
          name="showPassword"
          checked={showPassword}
          onChange={changeHandler}
          className="show-password-checkbox"
        />
        <label htmlFor="showPassword">Show Password</label>
      </div>

      {/* Log in remember me and forgot password */}
      <div className="login-checkbox-forgot-password">
        <div className="login-checkbox-keep-signed-in">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={changeHandler}
            className="login-checkbox"
          />
          <span>Keep me signed in</span>
        </div>

        <Link className="forgot-password" to={"/forgot-password"}>
          Forgot your password?{" "}
        </Link>
      </div>

      {/* Button for log in form */}
      <button className="login-button" disabled={loading}>
        {loading ? (
          <span className="loading">
            <ButtonLoader /> Loading...
          </span>
        ) : (
          "Log In"
        )}
      </button>

      {/* Do not have an account, Sign Up */}
      <p className="have-no-account">
        {"Don't have an account?"}
        <Link className="sign-up" to="/register">
          Sign Up
        </Link>
      </p>
      {error ? <p className="error-message"> {error} </p> : null}
    </form>
  );
};

export default LoginForm;
