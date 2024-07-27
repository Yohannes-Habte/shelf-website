import { useState } from "react";
import "./BookshelfCard.scss";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { Link } from "react-router-dom";

const BookshelfCard = ({ bookshelf }) => {
  const [liked, setLiked] = useState(true);

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <section className="bookshelf-wrapper">
      <figure className="image-container">
        <Link to={`/bookshelves/${bookshelf._id}`}>
          <img className="image" src={bookshelf?.image} alt={bookshelf?.name} />
        </Link>
      </figure>

      <div className="text-container">
        <aside className="box-aside">
          <dev>
            <Link to={`/bookshelves/${bookshelf._id}`}>
              <h3 className="bookshelf-title"> {bookshelf.name} </h3>
              <p> {bookshelf.street} </p>
            </Link>
          </dev>
          <Link to={`/bookshelves/${bookshelf._id}`}>
            <p>{bookshelf?.books?.length} Books</p>
          </Link>
        </aside>

        <aside className="box-aside">
          <h3
            className={liked ? "like-toggle" : "dislike-toggle"}
            onClick={handleLikeToggle}
            role="button"
            aria-label={
              liked ? "Dislike this bookshelf" : "Like this bookshelf"
            }
            tabIndex={0}
          >
            {liked ? <AiFillLike /> : <AiFillDislike />}{" "}
            <span> {liked ? "Like" : "Dislike"} </span>
          </h3>

          <p>
            <Link to={`/bookshelves/${bookshelf._id}`}>
              {bookshelf?.openingTime} - {bookshelf?.closingTime} Working Hours{" "}
            </Link>
          </p>
        </aside>
      </div>
    </section>
  );
};

export default BookshelfCard;
