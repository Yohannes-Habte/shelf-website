import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import { validEmail, validPassword } from "../../../utils/validation/validate";
import { toast } from "react-toastify";
import * as Action from "../../../redux/reducers/user/userReducer";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import Cookies from "js-cookie";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  agree: false,
  showPassword: false,
};
const RegisterForm = () => {
  const navigate = useNavigate();

  // Global state variables
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialState);
  const { firstName, lastName, email, password, agree, showPassword } =
    formData;

  // If a user is logged in, they cannot access the login page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  // Handle change
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validEmail(email)) {
      return toast.error("Invalid email");
    }

    if (!validPassword(password)) {
      return toast.error("Invalid password");
    }

    try {
      dispatch(Action.registerStart());

      const { data } = await axios.post(`${API}/auth/register`, formData, {
        withCredentials: true,
      });

      if (data.token) {
        dispatch(Action.registerSuccess(data.result));
        toast.success(data.message);

        // Set token in cookies
        const token = data.token;
        console.log("register from Register= ", token);
        Cookies.set("token", token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });

        event.target.reset();
        navigate("/login");
      } else {
        throw new Error("Token is missing in the response");
      }
    } catch (err) {
      console.log("err=", err);
      dispatch(Action.registerFailure(toast.error(err.message)));
    }
  };

  return (
    <form action="" onSubmit={submitHandler} className="register-form">
      {/* User first name */}
      <div className="input-container">
        <FaUser className="input-icon" />
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={changeHandler}
          placeholder="First Name"
          className="input-field"
        />

        <label htmlFor="firstName" className="input-label">
          First Name
        </label>
        <span className="input-highlight"></span>
      </div>

      {/* User last name */}
      <div className="input-container">
        <FaUser className="input-icon" />

        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={changeHandler}
          placeholder="Last Name"
          className="input-field"
        />

        <label htmlFor="lastName" className="input-label">
          Last Name
        </label>
        <span className="input-highlight"></span>
      </div>

      {/* User email address */}
      <div className="input-container">
        <MdEmail className="input-icon" />
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={changeHandler}
          placeholder="Email"
          className="input-field"
        />
        <label htmlFor="email" className="input-label">
          Email Address
        </label>
        <span className="input-highlight"></span>
      </div>

      {/* User password */}
      <div className="input-container">
        <RiLockPasswordFill className="input-icon" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={password}
          onChange={changeHandler}
          placeholder="Password"
          className="input-field"
        />
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <span className="input-highlight"></span>
      </div>

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

      <div className="consent-and-others-container">
        <div className="consent-terms-button-login-container">
          <div className="register-consent">
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={changeHandler}
              className="register-consent-input"
            />
            <span className="accept">I accept</span>
            <Link className={"terms-of-user"}> Terms of Use</Link>
          </div>

          <button className="register-button" disabled={loading}>
            {loading ? (
              <span className="loading">
                <ButtonLoader /> Loading...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          {error ? <p className="error-message"> {error} </p> : null}
          <p className="haveAccount">
            Already have an account?
            <Link className="login-link" to="/login">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
