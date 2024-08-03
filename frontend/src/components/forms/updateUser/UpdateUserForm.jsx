import "./UpdateUserForm.scss";
import { useEffect, useState } from "react";
import "./UpdateUserForm.scss";
import {
  FaCity,
  FaEnvelope,
  FaFlag,
  FaImage,
  FaLocationArrow,
  FaLock,
  FaMapMarkedAlt,
  FaMapPin,
  FaUser,
} from "react-icons/fa";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utils/security/secreteKey";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateUserForm = () => {
  const navigate = useNavigate();
  // Global state variables
  const { currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const initialState = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "",
    image: null,
    banner: null,
    street: currentUser?.street || "",
    zipCode: currentUser?.zipCode || "",
    city: currentUser?.city || "",
    state: currentUser?.state || "",
    country: currentUser?.country || "",
    agree: false,
  };
  const [formData, setFormData] = useState(initialState);

  const {
    firstName,
    lastName,
    email,
    password,
    image,
    banner,
    street,
    zipCode,
    city,
    state,
    country,
    agree,
  } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Store the first file selected
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("cloud_name", cloud_name);
    formData.append("upload_preset", upload_preset);

    const response = await axios.post(cloud_URL, formData);
    return response.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image if provided
      let imageUrl = image ? await uploadImageToCloudinary(image) : null;
      let bannerUrl = banner ? await uploadImageToCloudinary(banner) : null;

      // Update the form data with the URLs
      const updatedFormData = {
        ...formData,
        image: imageUrl,
        banner: bannerUrl,
      };
      const { data } = await axios.put(
        `${API}/auth/update/${currentUser._id}`,
        updatedFormData
      );
      toast.success(data.message);
      handleReset();

      const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

      // Save user data and expiration time to local storage
      localStorage.setItem("user", JSON.stringify(data.result));
      localStorage.setItem("token", tokenExpiry);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="user-profile-update-form">
      <div className="input-containers-wrapper">
        {/* First Name */}
        <div className="input-container">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input-field"
            required
          />
          <label htmlFor="firstName" className="input-label">
            First Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Last Name */}
        <div className="input-container">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input-field"
            required
          />
          <label htmlFor="lastName" className="input-label">
            Last Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Email */}
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field"
            required
          />
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Password */}
        <div className="input-container">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="input-field"
            required
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Image Upload */}
        <div className="input-container">
          <FaImage className="input-icon" />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="input-field"
            accept="image/*"
          />
          <label htmlFor="image" className="input-label">
            Image Upload
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Banner Upload */}
        <div className="input-container">
          <FaImage className="input-icon" />
          <input
            type="file"
            name="banner"
            onChange={handleChange}
            className="input-field"
            accept="image/*"
          />
          <label htmlFor="banner" className="input-label">
            Banner Upload
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Street */}
        <div className="input-container">
          <FaMapMarkedAlt className="input-icon" />
          <input
            type="text"
            name="street"
            value={street}
            onChange={handleChange}
            placeholder="Street"
            className="input-field"
          />
          <label htmlFor="street" className="input-label">
            Street
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Zip Code */}
        <div className="input-container">
          <FaMapPin className="input-icon" />
          <input
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="input-field"
          />
          <label htmlFor="zipCode" className="input-label">
            Zip Code
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* City */}
        <div className="input-container">
          <FaCity className="input-icon" />
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
            placeholder="City"
            className="input-field"
          />
          <label htmlFor="city" className="input-label">
            City
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* State */}
        <div className="input-container">
          <FaLocationArrow className="input-icon" />
          <input
            type="text"
            name="state"
            value={state}
            onChange={handleChange}
            placeholder="State"
            className="input-field"
          />
          <label htmlFor="state" className="input-label">
            State
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Country */}
        <div className="input-container">
          <FaFlag className="input-icon" />
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
            placeholder="Country"
            className="input-field"
          />
          <label htmlFor="country" className="input-label">
            Country
          </label>
          <span className="input-highlight"></span>
        </div>
      </div>

      {/* Agree to terms */}
      <div className="consent-container">
        <input
          type="checkbox"
          name="agree"
          checked={agree}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label htmlFor="agree" className="input-label">
          Agree to terms
        </label>
        <span className="input-highlight"></span>
      </div>

      <button type="submit" className="update-user-profile-btn">
        Submit
      </button>
    </form>
  );
};

export default UpdateUserForm;
