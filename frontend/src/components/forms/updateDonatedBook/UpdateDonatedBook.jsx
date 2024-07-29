import { useEffect, useState } from "react";
import "./UpdateDonatedBook.scss";
import axios from "axios";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import {
  FaBookMedical,
  FaUser,
  FaComment,
  FaList,
  FaUserTag,
  FaTags,
  FaLanguage,
  FaCalendarAlt,
  FaBuilding,
  FaImage,
  FaAlignLeft,
  FaBarcode,
  FaVolumeUp,
} from "react-icons/fa";

import { updateDonatedBook } from "../../../redux/actions/donation/donatedBookAction";
import { useNavigate } from "react-router-dom";

const UpdateDonatedBook = ({ bookId, dispatch, book, loading, error }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    message: "",
    bookshelfId: "",
    userId: "",
    genre: "",
    language: "",
    publishedDate: "",
    publisher: "",
    coverImageUrl: null,
    summary: "",
    ISBN: "",
    audio: false,
  });
  const {
    title,
    author,
    message,
    bookshelfId,
    userId,
    genre,
    language,
    publishedDate,
    publisher,
    coverImageUrl,
    summary,
    ISBN,
    audio,
  } = formData;
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        message: book.message || "",
        bookshelfId: book.bookshelfId || "",
        userId: book.userId || "",
        genre: book.genre || "",
        language: book.language || "",
        publishedDate: book.publishedDate || "",
        publisher: book.publisher || "",
        coverImageUrl: "",
        summary: book.summary || "",
        ISBN: book.ISBN || "",
        audio: book.audio || false,
      });
    }
  }, [book]);

  const [bookshelves, setBookshelves] = useState([]);
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([]);

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

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/users`);
        setUsers(response.data.result);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // Fetch all bookshelves
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${API}/genres`);
        setGenres(response.data.result);
      } catch (error) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      title: "",
      author: "",
      message: "",
      bookshelfId: "",
      userId: "",
      genre: "",
      language: "",
      publishedDate: "",
      publisher: "",
      coverImageUrl: null,
      summary: "",
      ISBN: "",
      audio: false,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", coverImageUrl);
    formData.append("cloud_name", cloud_name);
    formData.append("upload_preset", upload_preset);

    // Upload to Cloudinary
    const response = await axios.post(cloud_URL, formData);
    const imageUrl = response.data.secure_url;

    try {
      const updateBook = {
        title: title,
        author: author,
        message: message,
        bookshelfId: bookshelfId,
        userId: userId,
        genre: genre,
        language: language,
        publishedDate: publishedDate,
        publisher: publisher,
        coverImageUrl: imageUrl,
        summary: summary,
        ISBN: ISBN,
        audio: audio,
      };
      await dispatch(updateDonatedBook(bookId, updateBook));

      handleReset();

      toast.success("Book updated successfully!");
      navigate("/admin/dashboard")
    } catch (error) {
      console.error("Error updating book:", error);

      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        toast.error("Network Error: No response from the server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <article className="update-donated-book-modal">
      <section className="update-donated-book-popup-box">
        <h3 className="update-donated-book-form-title">Update Donated Book</h3>
        <form onSubmit={handleSubmit} className="update-donated-book-form">
          <div className="input-containers-wrapper">
            {/* Title */}
            <div className="input-container">
              <FaBookMedical className="input-icon" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="input-field"
              />
              <label htmlFor="title" className="input-label">
                Title
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Author */}
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="input-field"
              />
              <label htmlFor="author" className="input-label">
                Author
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Message */}
            <div className="input-container">
              <FaComment className="input-icon" />
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="input-field"
              />
              <label htmlFor="message" className="input-label">
                Message
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Bookshelf ID */}
            <div className="input-container">
              <FaList className="input-icon" />
              <select
                name="bookshelfId"
                value={formData.bookshelfId}
                onChange={handleChange}
                placeholder="Bookshelf ID"
                className="input-field"
              >
                <option value="">Select Bookshelf</option>
                {bookshelves &&
                  bookshelves.map((shelf) => (
                    <option key={shelf._id} value={shelf._id}>
                      {shelf.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="shelfId" className="input-label">
                Select Bookshelf
              </label>
            </div>

            {/* User ID */}
            <div className="input-container">
              <FaUserTag className="input-icon" />
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="User ID"
                className="input-field"
              >
                <option value="">Select Donator</option>
                {users &&
                  users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
              </select>
              <label htmlFor="userId" className="input-label">
                Select Donator
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Genre */}
            <div className="input-container">
              <FaTags className="input-icon" />
              <select
                type="text"
                name="genre"
                value={book?.genre}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Genre</option>
                {genres &&
                  genres.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.category}
                    </option>
                  ))}
              </select>
              <label htmlFor="" className="input-label">
                Book Genre
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Language */}
            <div className="input-container">
              <FaLanguage className="input-icon" />
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                placeholder="Language"
                className="input-field"
              >
                <option value="default">Select Language</option>
                <option value="english">English</option>
                <option value="german">German</option>
              </select>

              <label htmlFor="language" className="input-label">
                Select Language
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Published Date */}
            <div className="input-container">
              <FaCalendarAlt className="input-icon" />
              <input
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
                placeholder="Published Date"
                className="input-field"
              />
              <label htmlFor="publishedDate" className="input-label">
                Published Date
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Publisher */}
            <div className="input-container">
              <FaBuilding className="input-icon" />
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                placeholder="Publisher"
                className="input-field"
              />
              <label htmlFor="publisher" className="input-label">
                Publisher
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Cover Image */}
            <div className="input-container">
              <FaImage className="input-icon" />
              <input
                type="file"
                name="coverImageUrl"
                onChange={handleChange}
                className="input-field"
                accept="image/*"
              />
              <label htmlFor="coverImageUrl" className="input-label">
                Cover Image
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* ISBN */}
            <div className="input-container">
              <FaBarcode className="input-icon" />
              <input
                type="text"
                name="ISBN"
                value={formData.ISBN}
                onChange={handleChange}
                placeholder="ISBN"
                className="input-field"
              />
              <label htmlFor="ISBN" className="input-label">
                ISBN
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Audio */}
            <div className="checkbox-container">
              <FaVolumeUp className="input-icon" />
              <input
                type="checkbox"
                name="audio"
                checked={formData.audio}
                onChange={handleChange}
                className="checkbox-field"
              />
              <label htmlFor="audio" className="input-label">
                Audio
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

          {/* Summary */}
          <div className="input-container">
            <FaAlignLeft className="input-icon" />
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={4}
              placeholder="Summary"
              className="input-field"
            />
            <label htmlFor="summary" className="input-label">
              Summary
            </label>
            <span className="input-highlight"></span>
          </div>

          <button disabled={loading} className="update-donated-book-form-btn">
            {loading ? "Loading..." : "Update Book"}
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateDonatedBook;
