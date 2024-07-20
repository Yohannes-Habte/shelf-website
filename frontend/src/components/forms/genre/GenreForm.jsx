import { useState } from "react";
import ReactIcons from "../../reactIcons/ReactIcons";
import "./GenreForm.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import * as Action from "../../../redux/reducers/genre/genreReducer";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";

const GenreForm = () => {
  const { bookIcon } = ReactIcons();

  // Global state variables
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(Action.genreStart());

      const { data } = await axios.post(`${API}/genres/new`);

      dispatch(Action.genreSuccess(data.result));
      toast.success(data.message);
      setGenre("");
    } catch (err) {
      console.log(err);
      dispatch(Action.genreFailure(err.response.data.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} action="" className="genre-form">
      {/* Email input container */}
      <p className="book-genre">Book Category</p>
      <div className="input-container">
        <span className="icon"> {bookIcon} </span>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter Email"
          className="input-field"
        />
        <label htmlFor="" className="input-label">
          Book Category
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

      {error ? <p className="error-message"> {error} </p> : null}
    </form>
  );
};

export default GenreForm;
