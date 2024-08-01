import "./BookshelfList.scss";
import BookshelfCard from "../bookshelfCard/BookshelfCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllBookshelves } from "../../../redux/actions/bookshelf/bookshelfAction";

const BookshelfList = () => {
  const dispatch = useDispatch();
  const { bookshelves, loading, error } = useSelector(
    (state) => state.bookshelf
  );

  useEffect(() => {
    dispatch(fetchAllBookshelves());
  }, [dispatch]);
  
  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookshelves.length > 0 ? (
        <div className="bookshelf-cards-wrapper">
          {bookshelves &&
            bookshelves.length > 0 &&
            bookshelves.map((bookshelf) => {
              return (
                <BookshelfCard key={bookshelf._id} bookshelf={bookshelf} />
              );
            })}
        </div>
      ) : (
        <h4>No bookshelves found</h4>
      )}
    </section>
  );
};

export default BookshelfList;
