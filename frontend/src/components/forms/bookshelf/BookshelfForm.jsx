import { useRef, useState, useContext } from "react";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import { GiBookshelf } from "react-icons/gi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import {
  FaCloudUploadAlt,
  FaGlobeAmericas,
  FaMapMarkedAlt,
  FaCity,
  FaEnvelope,
  FaRoad,
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
import { UserLocationContext } from "../../../context/userLocation/UserLocationProvider";
import "./BookshelfForm.scss";

const initialState = {
  image: null,
  name: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
  street: "",
  openingTime: "09:00", // Default opening time
  closingTime: "18:00", // Default closing time
};

const BookshelfForm = ({ setOpenBookshelf }) => {
  const mapRef = useRef(null);

  const { userLocation, isLoading, error } = useContext(UserLocationContext);

  // Global state variables (from Redux)
  const { loading, error: formError } = useSelector((state) => state.bookshelf);
  const dispatch = useDispatch();

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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      // Display a message or disable the form button while user location is loading
      console.warn("User location is still being fetched. Please wait.");
      return;
    }

    if (error) {
      // Handle errors fetching user location (consider displaying an error message to the user)
      console.error("Error getting user location:", error);
      return;
    }

    try {
      // Image validation and upload (using FormData)
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
        // Use userLocation if available, otherwise set latitude and longitude to null
        longitude: userLocation?.longitude || null,
        latitude: userLocation?.latitude || null,
        openingTime,
        closingTime,
      };

      dispatch(ACTION.postBookshelfStart()); // Dispatch Redux action to indicate start of creating bookshelf
      const { data } = await axios.post(`${API}/bookshelves/new`, newBookshelf);
      dispatch(ACTION.postBookshelfSuccess(data.message)); // Dispatch Redux action on success
      toast.success(data.message);
      handleReset();
    } catch (error) {
      dispatch(ACTION.postBookshelfFailure(error.response.data.message)); // Dispatch Redux action on error
    }
  };
  return (
    <article className="bookshelf-modal">
      <section className="bookshelf-popup-box">
        <span className="close-modal" onClick={() => setOpenBookshelf(false)}>
          X
        </span>
        <h3 className="bookshelf-form-title">Add New Bookshelf</h3>

        <div className="form-map-wrapper">
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

          <div className="px-2">
            <MapContainer
              // center={center}
              zoom={5}
              scrollWheelZoom={true}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
                console.log("Map instance created:", mapRef.current);
              }}
              style={{ height: "500px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* {bookshelves?.map((shelf) => ( */}
              {/* <Marker
            key={shelf._id}
            position={shelf?.location?.coordinates}
            icon={customIcon}
          >
            <Popup>
              <div style={{ maxWidth: "200px" }}>
                <h3>{shelf?.name}</h3>
                <p>{shelf?.street}</p>
                {shelf?.image && (
                  <img
                    src={shelf?.image}
                    alt={shelf?.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                )}
                <button
                  onClick={() => setDestination(shelf?.location?.coordinates)}
                  style={{ marginTop: "10px" }}
                >
                  Go Here
                </button>
              </div>
            </Popup>
          </Marker> */}
              {/* ))} */}
              {/* <LocationMarker /> */}
              {/* {userLocation && destination && (
          <UserStartAndDestination start={userLocation} end={destination} />
        )} */}
              {/* {mapReady && <MiniMapSettings position="topright" zoom={0} />} */}
              {/* {<MiniMapSettings position="topright" zoom={0} />} */}
            </MapContainer>
          </div>
        </div>

        {formError && <p className="error-message">{formError}</p>}
      </section>
    </article>
  );
};

export default BookshelfForm;
