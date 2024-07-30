import "./DonatedBookForm.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import {
  FaBook,
  FaLanguage,
  FaUser,
  FaHeadphones,
  FaBookReader,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const DonatedBookForm = ({ setOpenDonatedBook }) => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);

  // Local state variables
  const initialState = {
    title: "",
    bookshelf: "",
    language: "",
    authors: [{ firstName: "", lastName: "" }],
    audio: false,
  };
  const [bookData, setBookData] = useState(initialState);
  const [bookshelves, setBookshelves] = useState([]);

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API}/bookshelves`);
        setBookshelves(response.data.result);
      } catch (error) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchBookshelves();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAuthorChange = (index, e) => {
    const { name, value } = e.target;
    setBookData((prevData) => {
      const newAuthors = [...prevData.authors];
      newAuthors[index][name] = value;
      return { ...prevData, authors: newAuthors };
    });
  };

  const addAuthor = () => {
    setBookData((prevData) => ({
      ...prevData,
      authors: [...prevData.authors, { firstName: "", lastName: "" }],
    }));
  };

  const removeAuthor = (index) => {
    setBookData((prevData) => ({
      ...prevData,
      authors: prevData.authors.filter((_, i) => i !== index),
    }));
  };

  const handleReset = () => {
    setBookData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDonatedBook = {
        ...bookData,
        userId: currentUser._id,
        bookshelfId: bookData.bookshelf,
      };
      const { data } = await axios.post(
        `${API}/donatedBooks/new`,
        newDonatedBook
      );
      toast.success(data.message);
      handleReset();
    } catch (error) {
      console.error("Error donating book:", error);
      toast.error("Error donating book");
    }
  };

  return (
    <article className="donated-book-modal">
      <section className="donated-book-popup-box">
        <span className="close-modal" onClick={() => setOpenDonatedBook(false)}>
          X
        </span>
        <h3 className="donated-book-form-title">Donate Book</h3>
        <form onSubmit={handleSubmit} className="donated-book-form">
          {/* Title */}
          <div className="input-container">
            <FaBook className="input-icon" />
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              placeholder="Title"
              className="input-field"
              required
            />
            <label htmlFor="title" className="input-label">
              Title
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Language */}
          <div className="input-container">
            <FaLanguage className="input-icon" />
            <select
              name="language"
              value={bookData.language}
              onChange={handleChange}
              className="input-field"
            >
              <option value="" disabled>
                Select Language
              </option>
              <option value="english">English</option>
              <option value="german">German</option>
            </select>
            <label htmlFor="language" className="input-label">
              Language
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Select Bookshelf */}
          <div className="input-container">
            <FaBookReader className="input-icon" />
            <select
              name="bookshelf"
              value={bookData.bookshelf}
              onChange={handleChange}
              className="input-field"
            >
              <option value="" disabled>
                Select Bookshelf
              </option>
              {bookshelves.map((shelf) => (
                <option key={shelf._id} value={shelf._id}>
                  {shelf.name}
                </option>
              ))}
            </select>
            <label htmlFor="bookshelf" className="input-label">
              Bookshelf
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Audio */}
          <div className="checkbox-container">
            <FaHeadphones className="input-icon" />
            <input
              type="checkbox"
              name="audio"
              checked={bookData.audio}
              onChange={handleChange}
              className="checkbox-field"
            />
            <label htmlFor="audio" className="input-label">
              Audio
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Authors */}
          <div className="authors-inputs-container">
            <label>Authors:</label>
            {bookData.authors.map((author, index) => (
              <div key={index} className="author-inputs-wrapper">
                {/* First Name */}
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={author.firstName}
                    onChange={(e) => handleAuthorChange(index, e)}
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
                    placeholder="Last Name"
                    value={author.lastName}
                    onChange={(e) => handleAuthorChange(index, e)}
                    className="input-field"
                    required
                  />
                  <label htmlFor="lastName" className="input-label">
                    Last Name
                  </label>
                  <span className="input-highlight"></span>
                </div>

                <button
                  type="button"
                  className="remove-author-btn"
                  onClick={() => removeAuthor(index)}
                >
                  Remove Author
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-author-btn"
              onClick={addAuthor}
            >
              Add Author
            </button>
          </div>

          <button type="submit" className="donated-book-form-btn">
            Submit
          </button>
        </form>
      </section>
    </article>
  );
};

export default DonatedBookForm;
