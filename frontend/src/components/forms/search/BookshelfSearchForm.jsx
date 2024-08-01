import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import { fetchAllBookshelves } from "../../../redux/actions/bookshelf/bookshelfAction";
import {
  FaBookReader,
  FaCity,
  FaGlobeAmericas,
  FaMapMarkedAlt,
} from "react-icons/fa";
import "./BookshelfSearchForm.scss";

const BookshelfSearchForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    name: "",
  });

  const { country, state, city, name } = formData;

  useEffect(() => {
    // Reset city if the state changes and is invalid for the selected country
    if (!State.getStatesOfCountry(country).some((s) => s.isoCode === state)) {
      setFormData((prevState) => ({ ...prevState, city: "" }));
    }
  }, [country, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Log to verify form data
    dispatch(fetchAllBookshelves(formData));
  };

  const handleReset = () => {
    setFormData({
      country: "",
      state: "",
      city: "",
      name: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bookshelf-search-form">
      {/* Select Country */}
      <div className="input-container">
        <FaGlobeAmericas className="input-icon" />
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Choose your country</option>
          {Country.getAllCountries().map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
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
          value={state}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Choose your state</option>
          {State.getStatesOfCountry(country).map((s) => (
            <option key={s.isoCode} value={s.isoCode}>
              {s.name}
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
        >
          <option value="">Choose your city</option>
          {City.getCitiesOfState(country, state).map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bookshelf name */}
      <div className="input-container">
      <FaBookReader className="input-icon" />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Bookshelf Name"
          className="input-field"
        />
      </div>
      <div className="input-container">
        <button type="submit" className="bookshelf-search-btn">
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bookshelf-reset-btn"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default BookshelfSearchForm;
