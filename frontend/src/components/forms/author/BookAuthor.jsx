import "./BookAuthor.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { FaBookMedical } from "react-icons/fa";

const initialState = {
  bookId: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  deathDate: "",
};
const BookAuthor = () => {
  const [author, setAuthor] = useState(initialState);
  const [books, setBooks] = useState([]);

  const { bookId, firstName, lastName, birthDate, deathDate } = author;

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/books`);
        setBooks(data.result);
      } catch (error) {
        toast.error("Error fetching books");
      }
    };
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({
      ...author,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${API}/books/${bookId}`, author);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Select Book */}
      <div className="input-container">
        <FaBookMedical className="input-icon" />
        <select
          type="text"
          name="bookId"
          value={bookId}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select a Book</option>
          {books &&
            books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
        </select>
        <label htmlFor="" className="input-label">
          Select Book
        </label>
        <span className="input-highlight"></span>
      </div>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Birth Date:
          <input
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Death Date:
          <input
            type="date"
            name="deathDate"
            value={deathDate}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default BookAuthor;
