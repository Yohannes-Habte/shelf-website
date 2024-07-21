import { useEffect, useState } from "react";
import "./BookshelfForm.scss";
import ReactIcons from "../../reactIcons/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import { GiBookshelf } from "react-icons/gi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utils/security/secreteKey";
import axios from "axios";
import * as ACTION from "../../../redux/reducers/bookshelf/bookshelfReducer";
import { toast } from "react-toastify";

const initialState = {
  barcode: "",
  image: null,
  name: "",
  openingHours: "",
};

const BookshelfForm = ({ setOpenBookshelf }) => {
  // Global icons
  const { bookshelfIcon } = ReactIcons();

  // Global state variables
  const { loading, error } = useSelector((state) => state.bookshelf);
  const dispatch = useDispatch();

  // Local state variables
  const [state, setState] = useState(initialState);
  const { barcode, image, name, openingHours } = state;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setState({
        ...state,
        [name]: files[0],
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    setState(initialState);
  };

  // Clear errors when the component mounts
  useEffect(() => {
    dispatch(ACTION.clearErrors());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Image validation
    const shelfPhoto = new FormData();
    shelfPhoto.append("file", image);
    shelfPhoto.append("cloud_name", cloud_name);
    shelfPhoto.append("upload_preset", upload_preset);

    // Save image to cloudinary
    const response = await axios.post(cloud_URL, shelfPhoto);
    const { url } = response.data;
    try {
      const newBookshelf = {
        barcode: barcode,
        image: url,
        name: name,
        openingHours: openingHours,
      };
      dispatch(ACTION.postBookshelfStart());
      const { data } = await axios.post(`${API}/bookshelves/new`, newBookshelf);
      dispatch(ACTION.postBookshelfSuccess(data.message));
      toast.success(data.message);
      handleReset();
    } catch (error) {
      dispatch(ACTION.postBookshelfFailure(error.response.data.message));
    }
  };

  return (
    <article className="bookshelf-modal">
      <section className="bookshelf-popup-box">
        <span className="close-modal" onClick={() => setOpenBookshelf(false)}>
          X
        </span>
        <h3 className="bookshelf-form-title">Add New Bookshelf</h3>
        <form onSubmit={handleSubmit} action="" className="bookshelf-form">
          {/* Bookshelf Barcode */}
          <div className="input-container">
            <GiBookshelf className="input-icon" />

            <input
              type="text"
              name="barcode"
              value={barcode}
              onChange={handleChange}
              placeholder="Bookshelf Barcode"
              className="input-field"
            />
            <label htmlFor="" className="input-label">
              Barcode
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Bookshelf Photo */}
          <div className="input-container">
            <FaCloudUploadAlt className="input-icon" />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="input-field"
            />
            <label htmlFor="" className="input-label">
              Barcode
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Bookshelf Name */}
          <div className="input-container">
            <span className="input-icon"> {bookshelfIcon} </span>
            <GiBookshelf className="input-icon" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Bookshelf Name"
              className="input-field"
            />
            <label htmlFor="" className="input-label">
              Name
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Bookshelf Opening Hours */}
          <div className="input-container">
            <MdAccessTimeFilled className="input-icon" />
            <input
              type="text"
              name="openingHours"
              value={openingHours}
              onChange={handleChange}
              placeholder="Bookshelf Opening Hours"
              className="input-field"
            />
            <label htmlFor="" className="input-label">
              Opening Hours
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Button for log in form */}
          <button className="bookshelf-btn" disabled={loading}>
            {loading ? (
              <span className="loading">
                <ButtonLoader /> Loading...
              </span>
            ) : (
              "Add Bookshelf"
            )}
          </button>
        </form>
        {error ? <p className="error-message"> {error} </p> : null}
      </section>
    </article>
  );
};

export default BookshelfForm;
