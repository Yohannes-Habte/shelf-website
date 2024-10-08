import { useState } from "react";
import "./GenreForm.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import * as Action from "../../../redux/reducers/genre/genreReducer";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import { FaBook } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";

const initialFormData = {
  genre: "",
  description: "",
};
const GenreForm = ({ setOpenGenre }) => {
  // Global state variables
  const { loading, error } = useSelector((state) => state.genre);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGenre = {
      category: formData.genre,
      description: formData.description,
    };
    try {
      dispatch(Action.genreStart());

      const { data } = await axios.post(`${API}/genres/new`, newGenre);

      dispatch(Action.genreSuccess(data.result));
      toast.success(data.message);
      handleReset();
    } catch (err) {
      console.log(err);
      dispatch(Action.genreFailure(err.response.data.message));
    }
  };

  return (
    <article className="genre-modal">
      <section className="genre-popup-box">
        <span className="close-modal" onClick={() => setOpenGenre(false)}>
          X
        </span>
        <h3 className="genre-form-title">Add New Bookshelf</h3>
        <form onSubmit={handleSubmit} action="" className="genre-form">
          {/* Email input container */}
          <p className="book-genre">Book Category</p>
          <div className="input-container">
            <FaBook className="input-icon" />
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Enter Book Genre"
              className="input-field"
            />
            <label htmlFor="" className="input-label">
              Book Category
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <MdMessage className="input-icon" />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              cols="30"
              placeholder="Enter Genre Description ..."
              className="input-field"
            />

            <label htmlFor="description" className="input-label">
              {" "}
              Description
            </label>
            <span className="input-highlight"></span>
          </div>

          <button className="genre-btn" disabled={loading}>
            {loading ? (
              <span className="loading">
                <ButtonLoader /> Loading...
              </span>
            ) : (
              "Add Genre "
            )}
          </button>
        </form>
        {error ? <p className="error-message"> {error} </p> : null}
      </section>
    </article>
  );
};

export default GenreForm;
