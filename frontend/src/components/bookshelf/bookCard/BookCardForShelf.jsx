import { Link, useParams } from "react-router-dom";
import "./BookCardForShelf.scss";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import debounce from "lodash.debounce";
import Rating from "../ratings/Rating";

const BookCardForShelf = ({ book }) => {
  const { bookshelfId } = useParams();
  const [averageRating, setAverageRating] = useState(0);

  const fetchRating = async () => {
    try {
      const response = await axios.get(`${API}/books/${book._id}/rating`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [book._id]);

  const updateRating = async (newRating) => {
    try {
      const response = await axios.put(`${API}/books/${book._id}/rating`, {
        rating: newRating,
      });
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const debouncedUpdateRating = useCallback(debounce(updateRating, 500), []);

  const handleRatingChange = (newRating) => {
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
          Average Rating: {averageRating?.toFixed(1)}
          <Rating
            initialRating={averageRating}  // Pass the averageRating to Rating component
            onRatingChange={handleRatingChange}
          />
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
