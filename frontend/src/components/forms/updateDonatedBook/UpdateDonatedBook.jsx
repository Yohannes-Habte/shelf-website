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
import { useNavigate, useParams } from "react-router-dom";

const UpdateDonatedBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    authors: [{ firstName: "", lastName: "" }],
    bookshelfId: "",
    userId: "",
    genre: "",
    language: "",
    publishedDate: "",
    publisher: "",
    coverImageUrl: "",
    summary: "",
    ISBN: "",
    audio: false,
  });
  const [bookshelves, setBookshelves] = useState([]);
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`${API}/donatedBooks/${bookId}`);
        setBook(data.result);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching book details");
      }
    };
    fetchBook();
  }, [bookId]);

  useEffect(() => {
    if (book) {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Formats as yyyy-MM-dd
      };

      setFormData({
        title: book.title || "",
        authors: book.authors || [{ firstName: "", lastName: "" }],
        bookshelfId: book.bookshelfId || "",
        userId: book.userId || "",
        genre: book.genre || "",
        language: book.language || "",
        publishedDate: formatDate(book.publishedDate) || "",
        publisher: book.publisher || "",
        coverImageUrl: book.coverImageUrl || "",
        summary: book.summary || "",
        ISBN: book.ISBN || "",
        audio: book.audio || false,
      });
    }
  }, [book]);



  // Fetch bookshelves
  useEffect(() => {
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

  // Fetch users
  useEffect(() => {
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

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${API}/genres`);
        setGenres(response.data.result);
      } catch (error) {
        toast.error("Error fetching genres");
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

  const handleAuthorsChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = {
      ...updatedAuthors[index],
      [name]: value,
    };
    setFormData((prevState) => ({
      ...prevState,
      authors: updatedAuthors,
    }));
  };

  const addAuthor = () => {
    setFormData((prevState) => ({
      ...prevState,
      authors: [...prevState.authors, { firstName: "", lastName: "" }],
    }));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      authors: [{ firstName: "", lastName: "" }],
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
    const formDataToUpload = new FormData();
    if (formData.coverImageUrl) {
      formDataToUpload.append("file", formData.coverImageUrl);
      formDataToUpload.append("cloud_name", cloud_name);
      formDataToUpload.append("upload_preset", upload_preset);
    }

    let imageUrl = "";

    try {
      if (formData.coverImageUrl) {
        const response = await axios.post(cloud_URL, formDataToUpload);
        imageUrl = response.data.secure_url;
      }

      const formatDateForServer = (dateString) => {
        return dateString ? new Date(dateString).toISOString() : ""; // Convert to ISO format
      };

      const updateBook = {
        title: formData.title,
        authors: formData.authors,
        bookshelfId: formData.bookshelfId,
        userId: formData.userId,
        genre: formData.genre,
        language: formData.language,
        publishedDate: formatDateForServer(formData.publishedDate),
        publisher: formData.publisher,
        coverImageUrl: imageUrl || formData.coverImageUrl,
        summary: formData.summary,
        ISBN: formData.ISBN,
        audio: formData.audio,
      };

      const { data } = await axios.put(
        `${API}/donatedBooks/${bookId}`,
        updateBook
      );
      toast.success(data.success);
      handleReset();
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error(`Error: ${error.response?.data?.message || "Server Error"}`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <article className="update-donated-book-modal">
      <section className="update-donated-book-popup-box">
        <h3 className="update-donated-book-form-title">Update Donated Book</h3>
        <form onSubmit={handleSubmit} className="update-donated-book-form">
          {/* Title */}
          <div className="title-input-container">
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

          {/* Authors */}
          <div className="author-input-wrapper">
            {formData.authors.map((author, index) => (
              <div key={index} className="author-input-container">
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="firstName"
                    value={author.firstName}
                    onChange={(e) => handleAuthorsChange(index, e)}
                    placeholder="First Name"
                    className="input-field"
                  />
                  <label htmlFor={"firstName"} className="input-label">
                    Author First Name
                  </label>
                  <span className="input-highlight"></span>
                </div>
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="lastName"
                    value={author.lastName}
                    onChange={(e) => handleAuthorsChange(index, e)}
                    placeholder="Last Name"
                    className="input-field"
                  />
                  <label htmlFor={"lastName"} className="input-label">
                    Author Last Name
                  </label>
                  <span className="input-highlight"></span>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addAuthor}
              className="add-author-btn"
            >
              Update Authors
            </button>
          </div>

          <div className="input-containers-wrapper">
            {/* Bookshelf ID */}
            <div className="input-container">
              <FaList className="input-icon" />
              <select
                name="bookshelfId"
                value={formData.bookshelfId}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Bookshelf</option>
                {bookshelves.map((shelf) => (
                  <option key={shelf._id} value={shelf._id}>
                    {shelf.name}
                  </option>
                ))}
              </select>
              <span className="input-highlight"></span>
            </div>

            {/* User ID */}
            <div className="input-container">
              <FaUserTag className="input-icon" />
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Donator</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
              <span className="input-highlight"></span>
            </div>

            {/* Genre */}
            <div className="input-container">
              <FaTags className="input-icon" />
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Genre</option>
                {genres.map((gen) => (
                  <option key={gen._id} value={gen._id}>
                    {gen.category}
                  </option>
                ))}
              </select>

              <span className="input-highlight"></span>
            </div>

            {/* Language */}
            <div className="input-container">
              <FaLanguage className="input-icon" />
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="german">German</option>
              </select>
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
            <div className="audio-checkbox-container">
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
            </div>
          </div>

          {/* Summary */}
          <div className="textarea-field-container">
            <FaAlignLeft className="input-icon" />
            <textarea
              name="summary"
              role={"6"}
              value={formData.summary}
              onChange={handleChange}
              placeholder="Summary"
              className="input-field"
            />
            <label htmlFor="summary" className="input-label">
              Summary
            </label>
            <span className="input-highlight"></span>
          </div>
          <button type="submit" className="update-donated-book-btn">
            Update Book
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateDonatedBook;
