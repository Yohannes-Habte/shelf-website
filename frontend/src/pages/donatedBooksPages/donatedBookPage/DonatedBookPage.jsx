import { useParams } from "react-router-dom";
import UpdateDonatedBook from "../../../components/forms/updateDonatedBook/UpdateDonatedBook";
import "./DonatedBookPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDonatedBook } from "../../../redux/actions/donation/donatedBookAction";

const DonatedBookPage = () => {
  const { bookId } = useParams();
  console.log("donated book id is:", bookId);

  const dispatch = useDispatch();
  const book = useSelector((state) => state.donatedBook.donatedBook);
  const loading = useSelector((state) => state.donatedBook.loading);
  const error = useSelector((state) => state.donatedBook.error);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchDonatedBook(bookId));
    }
  }, [bookId, dispatch]);

  return (
    <main>
      <section>
        <h1>Donate Book</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <UpdateDonatedBook
            bookId={bookId}
            dispatch={dispatch}
            book={book}
            loading={loading}
            error={error}
          />
        )}
      </section>
    </main>
  );
};
export default DonatedBookPage;
