import { Link, useParams } from "react-router-dom";
import "./BookCardForShelf.scss";
import { Rating } from "@mui/material";
import { useState, useCallback } from "react";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import debounce from "lodash.debounce";

/*

Add a Debounce Mechanism to Prevent Too Many Requests
Debouncing helps limit the number of API requests when a user interacts with the rating component. You can use the lodash.debounce library for this.

npm install lodash.debounce

*/

const BookCardForShelf = ({ book }) => {
  const { bookshelfId } = useParams();
  // Local state variable
  const [rating, setRating] = useState(book.ratings || 0);

  const updateRating = async (newRating) => {
    try {
      await axios.put(`${API}/books/${book._id}/rating`, { rating: newRating });
      setRating(newRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  // Debounce the updateRating function to limit the number of API requests
  const debouncedUpdateRating = useCallback(debounce(updateRating, 500), []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    debouncedUpdateRating(newRating);
  };

  return (
    <section className="book-card-wrapper">
      <figure className="book-cover-page-wrapper">
        <Link to={`/bookshelves/${bookshelfId}/books/${book._id}`}>
          <img className="image" src={book?.coverImageUrl} alt={book?.title} />
        </Link>
      </figure>
      <article className="book-details-wrapper">
        <Link to={`/bookshelves/${bookshelfId}/books/${book._id}`}>
          <h3 className="book-title"> {book?.title} </h3>
        </Link>
        <small className="book-author">
          by Justin G. Longenecker (Author), J. William Petty (Author), Leslie
          E. Palich (Author), Frank Hoy (Author)
        </small>
        <p className="book-rating">
          Rating:{" "}
          <Rating initialRating={rating} onRatingChange={handleRatingChange} />
        </p>

        <p className="book-summary">
          {book.summary.slice(0, 300).concat("...")}{" "}
          <Link to={`/bookshelves/${bookshelfId}/books/${book._id}`}>
            <span className="read-more">read more</span>{" "}
          </Link>
        </p>
      </article>
    </section>
  );
};

export default BookCardForShelf;
