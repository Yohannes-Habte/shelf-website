import "./DonatedBookForm.scss";
import { useState } from "react";
import axios from "axios";
import { FaBookMedical } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

const DonatedBookForm = ({ setOpenDonatedBook }) => {
  // Step 1: Set up the initial state
  const initialFormData = {
    title: "",
    author: "",
    ISBN: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Step 2: Create the handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form reset
  const handleReset = () => {
    setFormData(initialFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/donatedBooks", formData);
      console.log("Book donated successfully:", response.data);
      handleReset();
    } catch (error) {
      console.error("Error donating book:", error);
    }
  };

  return (
    <article className="donated-book-modal">
      <section className="donated-book-popup-box">
        <span className="close-modal" onClick={() => setOpenDonatedBook(false)}>
          X
        </span>
        <h3 className="donated-book-form-title">Borrowed Book</h3>
        <form onSubmit={handleSubmit} className="donated-book-form">
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
              required
            />
            <label htmlFor="title" className="input-label">
              Title
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Author */}
          <div className="input-container">
            <FaUserTie className="input-icon" />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="input-field"
              required
            />
            <label htmlFor="author" className="input-label">
              Author
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* ISBN */}
          <div className="input-container">
            <FaBookMedical className="input-icon" />
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

          {/* Message */}
          <div className="input-container">
            <MdMessage className="input-icon" />
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="input-field"
              required
            />
            <label htmlFor="message" className="input-label">
              Message
            </label>
            <span className="input-highlight"></span>
          </div>

          <button type="button" className="donated-book-form-btn">
            Donate Book
          </button>
        </form>
      </section>
    </article>
  );
};

export default DonatedBookForm;
