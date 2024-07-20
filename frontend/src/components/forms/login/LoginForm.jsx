import { useEffect, useState } from "react";
import "./LoginForm.scss";
import { validEmail, validPassword } from "../../../utils/validation/validate";
import { toast } from "react-toastify";
import { API } from "../../../utils/security/secreteKey";
import axios from "axios";
import ReactIcons from "../../reactIcons/ReactIcons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as LoginAction from "../../../redux/reducers/user/userReducer";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";

const initialState = {
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};
const LoginForm = () => {
  const navigate = useNavigate();
  // Global icons
  const { emailIcon, passwordIcon } = ReactIcons();

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
      return toast.error("Please enter a valid email");
    }

    if (!validPassword(password)) {
      return toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    try {
      dispatch(LoginAction.loginStart());

      // The body
      const loginUser = {
        email: email,
        password: password,
        rememberMe: rememberMe,
      };
      const { data } = await axios.post(`${API}/auth/login`, loginUser);

      dispatch(LoginAction.loginSuccess(data.result));
      toast.success(data.message);

      // Cookies.set("token", data.token, {
      //   expires: rememberMe ? 30 : 1,
      //   secure: true,
      //   sameSite: "strict",
      // });

      resetHandler();
      // navigate("/");

      const tokenExpiry = rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

      // Save user data and expiration time to local storage
      localStorage.setItem("user", JSON.stringify(data.result));
      localStorage.setItem("token", tokenExpiry);
    } catch (err) {
      console.log(err);
      dispatch(LoginAction.loginFailure(err.response.data.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Email input container */}
      <div className="input-container">
        <span className="icon"> {emailIcon} </span>
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
        <span className="icon"> {passwordIcon} </span>
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
