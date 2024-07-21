import axios from "axios";
import "./BookshelfAddressForm.scss";
import { useEffect, useState } from "react";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { FaBookMedical } from "react-icons/fa";

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
const BookshelfAddressForm = () => {
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
    <form onSubmit={handleSubmit}>
      {/* Select Bookshelf */}
      <div className="input-container">
        <FaBookMedical className="input-icon" />
        <select
          type="text"
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
        <label htmlFor="" className="input-label">
          Select Bookshelf
        </label>
        <span className="input-highlight"></span>
      </div>

      <div>
        <label>Longitude:</label>
        <input
          type="text"
          name="longitude"
          value={longitude}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Latitude:</label>
        <input
          type="text"
          name="latitude"
          value={latitude}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={street}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          value={zipCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookshelfAddressForm;
