import axios from "axios";
import "./BookshelfAddressForm.scss";
import { useEffect, useState } from "react";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import { FaBookMedical } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const initialState = {
  bookshelfId: "",
  longitude: "",
  latitude: "",
  street: "",
  zipCode: "",
  city: "",
  state: "",
  country: "",
};
const BookshelfAddressForm = ({ setOpenBookshelf }) => {
  const [formData, setFormData] = useState(initialState);
  const [bookshelves, setBookshelves] = useState([]);

  const {
    bookshelfId,
    longitude,
    latitude,
    street,
    zipCode,
    city,
    state,
    country,
  } = formData;

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBookshelves = async () => {
      try {
        const { data } = await axios.get(`${API}/bookshelves`);
        setBookshelves(data.result);
      } catch (error) {
        toast.error("Error fetching books");
      }
    };
    fetchBookshelves();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${API}/bookshelves/${bookshelfId}`,
        formData
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <article className="bookshelf-location-modal">
      <section className="bookshelf-location-popup-box">
        <span className="close-modal" onClick={() => setOpenBookshelf(false)}>
          {" "}
          X{" "}
        </span>
        <h3 className="bookshelf-location-form-title">Borrowed Book</h3>
        <form onSubmit={handleSubmit} className="bookshelf-location-form">
          {/* Select Bookshelf */}
          <div className="input-container">
            <FaBookMedical className="input-icon" />
            <select
              name="bookshelfId"
              value={bookshelfId}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Bookshelf</option>
              {bookshelves &&
                bookshelves.map((bookshelf) => (
                  <option key={bookshelf._id} value={bookshelf._id}>
                    {bookshelf.name}
                  </option>
                ))}
            </select>
            <label htmlFor="bookshelfId" className="input-label">
              Select Bookshelf
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Longitude */}
          <div className="input-container">
            <FaLocationDot className="input-icon" />
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
            <FaLocationDot className="input-icon" />
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

          {/* Select Country */}
          <div className="input-container">
            <FaLocationDot className="input-icon" />
            <select
              name="country"
              id="country"
              value={country}
              onChange={handleChange}
              className="input-field"
            >
              <option value=""> Choose your country </option>
              {Country &&
                Country.getAllCountries().map((country) => (
                  <option
                    className="option"
                    key={country.isoCode}
                    value={country.isoCode}
                  >
                    {country.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Select State */}
          <div className="input-container">
            <FaLocationDot className="input-icon" />
            <select
              name="state"
              id="state"
              value={state}
              onChange={handleChange}
              className="input-field"
            >
              <option value=""> Choose your state </option>
              {State &&
                State.getStatesOfCountry(country).map((state) => (
                  <option
                    className="option"
                    key={state.isoCode}
                    value={state.isoCode}
                  >
                    {state.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Select City */}
          <div className="input-container">
            <FaLocationDot className="input-icon" />
            <select
              name="city"
              id="city"
              value={city}
              onChange={handleChange}
              className="input-field"
            >
              <option value=""> Choose your city </option>
              {City &&
                City.getCitiesOfCountry(country).map((city) => (
                  <option
                    className="option"
                    key={city.isoCode}
                    value={city.isoCode}
                  >
                    {city.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Zip Code */}
          <div className="input-container">
            <FaLocationDot className="input-icon" />
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
            <FaLocationDot className="input-icon" />
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

          <button type="submit" className="bookshelf-location-form-btn">
            Submit
          </button>
        </form>
      </section>
    </article>
  );
};

export default BookshelfAddressForm;
