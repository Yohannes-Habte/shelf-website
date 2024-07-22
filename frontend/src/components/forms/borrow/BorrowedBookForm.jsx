import { useState, useEffect } from "react";
import axios from "axios";
import { FaBookMedical } from "react-icons/fa";
import "./BorrowedBookForm.scss";
import { API } from "../../../utils/security/secreteKey";

const initialValues = {
  ISBN: "",
  title: "",
  author: "",
  dateBorrowed: "",
  dueDate: "",
  returnDate: "",
  book: "",
  borrowedFrom: "",
};
const BorrowedBookForm = ({ setOpenBorrowedBook }) => {
  // Local variables
  const [formData, setFormData] = useState(initialValues);
  const [books, setBooks] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);

  useEffect(() => {
    // Fetch books and bookshelves from the backend
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/bookshelves`);
        setBookshelves(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch books and bookshelves from the backend
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/books`);
        setBooks(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/borrowedBooks/${"currentUser._id"}/new`,
        formData
      );
      console.log("BorrowedBook created successfully:", response.data);

      handleReset();
    } catch (error) {
      console.error("Error creating BorrowedBook:", error);
    }
  };

  return (
    <article className="borrowed-book-modal">
      <section className="borrowed-book-popup-box">
        <span
          className="close-modal"
          onClick={() => setOpenBorrowedBook(false)}
        >
          X
        </span>
        <h3 className="borrowed-book-form-title">Borrowed Book</h3>

        <form onSubmit={handleSubmit} className="borrowed-book-form">
          <div className="input-containers-wrapper">
            {/* Book ISBN */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="text"
                name="ISBN"
                value={formData.ISBN}
                onChange={handleChange}
                placeholder="Book ISBN"
                className="input-field"
              />
              <label htmlFor="ISBN" className="input-label">
                Book ISBN
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Book */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <select
                name="book"
                value={formData.book}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select a book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </select>
              <label htmlFor="book" className="input-label">
                Book
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Title */}

            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Title </option>
                {books &&
                  books?.authors?.map((author) => (
                    <option key={author.id} value={author._id}>
                      {author.title}
                    </option>
                  ))}
              </select>
              <label htmlFor="title" className="input-label">
                Title
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Author */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <select
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Author</option>
                {books &&
                  books?.authors?.map((author) => (
                    <option key={author.id} value={author._id}>
                      {author.firstName} {author.lastName}
                    </option>
                  ))}
              </select>
              <label htmlFor="author" className="input-label">
                Author
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Date Borrowed */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="date"
                name="dateBorrowed"
                value={formData.dateBorrowed}
                onChange={handleChange}
                placeholder="Date Borrowed"
                className="input-field"
              />
              <label htmlFor="dateBorrowed" className="input-label">
                Date Borrowed
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Due Date */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                placeholder="Due Date"
                className="input-field"
              />
              <label htmlFor="dueDate" className="input-label">
                Due Date
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Return Date */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                placeholder="Return Date"
                className="input-field"
              />
              <label htmlFor="returnDate" className="input-label">
                Return Date
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Borrowed From */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <select
                name="borrowedFrom"
                value={formData.borrowedFrom}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select a bookshelf</option>
                {bookshelves &&
                  bookshelves.map((shelf) => (
                    <option key={shelf._id} value={shelf._id}>
                      {shelf.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="borrowedFrom" className="input-label">
                Borrowed From
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

          <button type="submit" className="borrowed-book-form-btn">
            Submit
          </button>
        </form>
      </section>
    </article>
  );
};

export default BorrowedBookForm;
