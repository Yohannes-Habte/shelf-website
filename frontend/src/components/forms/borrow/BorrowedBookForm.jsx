import { useState, useEffect } from "react";
import axios from "axios";
import { FaBookMedical } from "react-icons/fa";
import "./BorrowedBookForm.scss";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialValues = {
  ISBN: "",
  title: "",
  author: "",
  dueDate: "",
  book: "",
  borrowedFrom: "",
};
const BorrowedBookForm = ({ setOpenBorrowedBook }) => {
  const { currentUser } = useSelector((state) => state.user);
  // Local variables
  const [formData, setFormData] = useState(initialValues);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);

  useEffect(() => {
    // Fetch books and bookshelves from the backend
    const fetchBookshelves = async () => {
      try {
        const { data } = await axios.get(`${API}/bookshelves`);
        setBookshelves(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookshelves();
  }, []);

  useEffect(() => {
    // Fetch books and bookshelves from the backend
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/books`);
        setBooks(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBooks();
  }, []);

  // Extract authors from books
  useEffect(() => {
    const allAuthors = [];
    books.forEach((book) => {
      if (book.authors && book.authors.length > 0) {
        book.authors.forEach((author) => allAuthors.push(author));
      }
    });
    setAuthors(allAuthors);
  }, [books]);

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
      const { data } = await axios.post(
        `${API}/borrowedBooks/new/${currentUser._id}`,
        formData
      );

      toast.success(data.message);

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
                {books &&
                  books.length !== 0 &&
                  books.map((book) => (
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
                  books.length > 0 &&
                  books.map((book) => (
                    <option key={book.id} value={book._id}>
                      {book.title}
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
                {authors &&
                  authors.length > 0 &&
                  authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.firstName} {author.lastName}
                    </option>
                  ))}
              </select>
              <label htmlFor="author" className="input-label">
                Author
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
