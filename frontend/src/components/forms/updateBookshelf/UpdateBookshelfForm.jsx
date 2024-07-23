import "./UpdateBookshelfForm.scss";
import { useEffect, useState } from "react";
import "./BookshelfForm.scss";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import { GiBookshelf } from "react-icons/gi";
import {
  FaCloudUploadAlt,
  FaGlobeAmericas,
  FaMapMarkedAlt,
  FaCity,
  FaEnvelope,
  FaRoad,
  FaLocationArrow,
} from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utils/security/secreteKey";
import axios from "axios";
import * as ACTION from "../../../redux/reducers/bookshelf/bookshelfReducer";
import { toast } from "react-toastify";

const UpdateBookshelfForm = ({ setOpenBookshelf }) => {
  // Global state variables
  const { loading, error } = useSelector((state) => state.bookshelf);
  const dispatch = useDispatch();

  const initialState = {
    image: null,
    name: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    street: "",
    longitude: "",
    latitude: "",
    openingTime: "",
    closingTime: "",
  };

  // Local state variables
  const [formState, setFormState] = useState(initialState);
  const {
    image,
    name,
    country,
    state: stateName,
    city,
    zipCode,
    street,
    longitude,
    latitude,
    openingTime,
    closingTime,
  } = formState;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormState({
        ...formState,
        [name]: files[0],
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    setFormState(initialState);
  };

  // Clear errors when the component mounts
  useEffect(() => {
    dispatch(ACTION.clearErrors());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Image validation and upload
      const shelfPhoto = new FormData();
      shelfPhoto.append("file", image);
      shelfPhoto.append("cloud_name", cloud_name);
      shelfPhoto.append("upload_preset", upload_preset);

      // Save image to Cloudinary
      const response = await axios.post(cloud_URL, shelfPhoto);
      const { url } = response.data;

      const newBookshelf = {
        image: url,
        name,
        country,
        state: stateName,
        city,
        zipCode,
        street,
        longitude,
        latitude,
        openingTime,
        closingTime,
      };

      dispatch(ACTION.postBookshelfStart());
      const { data } = await axios.post(`${API}/bookshelves/new`, newBookshelf);
      dispatch(ACTION.postBookshelfSuccess(data.message));
      toast.success(data.message);
      handleReset();

      localStorage.setItem("bookshelf", JSON.stringify(data.result));
    } catch (error) {
      dispatch(ACTION.postBookshelfFailure(error.response.data.message));
    }
  };

  return (
    <article className="bookshelf-modal">
      <section className="bookshelf-popup-box">
        <span className="close-modal" onClick={() => setOpenBookshelf(false)}>
          X
        </span>
        <h3 className="bookshelf-form-title">Add New Bookshelf</h3>
        <form onSubmit={handleSubmit} className="bookshelf-form">
          <div className="input-containers-wrapper">
            {/* Bookshelf Photo */}
            <div className="input-container">
              <FaCloudUploadAlt className="input-icon" />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="input-field"
              />
              <label htmlFor="image" className="input-label">
                Upload Bookshelf Photo
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Bookshelf Name */}
            <div className="input-container">
              <GiBookshelf className="input-icon" />
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Bookshelf Name"
                className="input-field"
                required
              />
              <label htmlFor="name" className="input-label">
                Name
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Select Country */}
            <div className="input-container">
              <FaGlobeAmericas className="input-icon" />
              <select
                name="country"
                id="country"
                value={country}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choose your country</option>
                {Country &&
                  Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Select State */}
            <div className="input-container">
              <FaMapMarkedAlt className="input-icon" />
              <select
                name="state"
                id="state"
                value={stateName}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choose your state</option>
                {State &&
                  State.getStatesOfCountry(country).map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Select City */}
            <div className="input-container">
              <FaCity className="input-icon" />
              <select
                name="city"
                id="city"
                value={city}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choose your city</option>
                {City &&
                  City.getCitiesOfState(country, stateName).map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Zip Code */}
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input
                type="text"
                name="zipCode"
                value={zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="input-field"
                required
              />
              <label htmlFor="zipCode" className="input-label">
                Zip Code
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Street */}
            <div className="input-container">
              <FaRoad className="input-icon" />
              <input
                type="text"
                name="street"
                value={street}
                onChange={handleChange}
                placeholder="Street"
                className="input-field"
                required
              />
              <label htmlFor="street" className="input-label">
                Street
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Longitude */}
            <div className="input-container">
              <FaLocationArrow className="input-icon" />
              <input
                type="text"
                name="longitude"
                value={longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="input-field"
                required
              />
              <label htmlFor="longitude" className="input-label">
                Longitude
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Latitude */}
            <div className="input-container">
              <FaLocationArrow className="input-icon" />
              <input
                type="text"
                name="latitude"
                value={latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="input-field"
              />
              <label htmlFor="latitude" className="input-label">
                Latitude
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Opening Time */}
            <div className="input-container">
              <MdAccessTimeFilled className="input-icon" />
              <input
                type="time"
                name="openingTime"
                value={openingTime}
                onChange={handleChange}
                className="input-field"
                required
              />
              <label htmlFor="openingTime" className="input-label">
                Opening Time
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Closing Time */}
            <div className="input-container">
              <MdAccessTimeFilled className="input-icon" />
              <input
                type="time"
                name="closingTime"
                value={closingTime}
                onChange={handleChange}
                className="input-field"
                required
              />
              <label htmlFor="closingTime" className="input-label">
                Closing Time
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

          {/* Submit Button */}
          <button className="bookshelf-btn" disabled={loading}>
            {loading ? (
              <span className="loading">
                <ButtonLoader /> Loading...
              </span>
            ) : (
              "Add Bookshelf"
            )}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </section>
    </article>
  );
};

export default UpdateBookshelfForm;
