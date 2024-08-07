import "./BookshelfList.scss";
import BookshelfCard from "../bookshelfCard/BookshelfCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllBookshelves } from "../../../redux/actions/bookshelf/bookshelfAction";
import Pagination from "../../pagination/Pagination";
// import { useBookshelvesContext } from "../../../context/bookshelves/BookshelvesProvider";

const BookshelfList = () => {
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const dispatch = useDispatch();
  const { bookshelves, loading, error } = useSelector(
    (state) => state.bookshelf
  );

  useEffect(() => {
    const loadBookshelves = async () => {
      const hasMore = await dispatch(fetchAllBookshelves({ page }));
      setMore(hasMore);
    };
    loadBookshelves();
  }, [dispatch, page]);

  const loadMoreBookshelves = () => {
    setPage((prevPage) => prevPage + 1);
  };
  
  // const { bookshelves, loading, error } = useBookshelvesContext();

  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookshelves?.length > 0 ? (
        <div className="bookshelves-card-wrapper">
          {bookshelves &&
            bookshelves.length > 0 &&
            bookshelves.map((bookshelf) => {
              return (
                <BookshelfCard key={bookshelf._id} bookshelf={bookshelf} />
              );
            })}

          <Pagination loadMoreBookshelves={loadMoreBookshelves} more={more} />
        </div>
      ) : (
        <h4>No bookshelves found</h4>
      )}
    </section>
  );
};

export default BookshelfList;
