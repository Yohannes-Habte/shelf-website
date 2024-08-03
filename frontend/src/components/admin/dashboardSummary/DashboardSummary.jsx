import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonatedBookChart from "../../charts/books/AreaChatBookshelves";
import AdminInbox from "../adminInbox/AdminInbox";
import AllBooks from "../allBooks/AllBooks";
import AllBookshelves from "../allBookshelves/AllBookshelves";
import AllBorrowedBooks from "../allBorrowedBooks/AllBorrowedBooks";
import AllDonatedBooks from "../allDonatedBooks/AllDonatedBooks";
import Genres from "../AllGenres/Genres";
import Ratings from "../AllRatings/Ratings";
import AllUsers from "../allUsers/AllUsers";
import "./DashboardSummary.scss";
import {
  countBookshelves,
  fetchAllBookshelves,
} from "../../../redux/actions/bookshelf/bookshelfAction";
import {
  countBorrowedBooks,
  fetchBorrowedBooks,
} from "../../../redux/actions/borrow/BorrowBookAction";
import {
  countBooks,
  fetchBooks,
} from "../../../redux/actions/book/bookActions";
import { countUsers } from "../../../redux/actions/user/userActions";
import {
  countDonatedBooks,
  fetchDonatedBooks,
} from "../../../redux/actions/donation/donatedBookAction";
import PieChartBookshelves from "../../charts/performance/PieChartBookshelves";
import { countComments } from "../../../redux/actions/comment/commentActions";
import BookshelvesChart from "../../charts/bookshelves/BookshelvesChart";

const DashboardSummary = ({ isActive }) => {
  const dispatch = useDispatch();
  const { count: countShelves, bookshelves } = useSelector(
    (state) => state.bookshelf
  );
  const { count: Books, books } = useSelector((state) => state.book);
  const { count: BorrowedBooks, borrowedBooks } = useSelector(
    (state) => state.borrowedBook
  );
  const { count: DonatedBooks, donatedBooks } = useSelector(
    (state) => state.donatedBook
  );
  const { count: Users } = useSelector((state) => state.user);
  const { count: Comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchAllBookshelves());
    dispatch(fetchBooks());
    dispatch(fetchDonatedBooks());
    dispatch(fetchBorrowedBooks());
    dispatch(countBookshelves());
    dispatch(countBooks());
    dispatch(countDonatedBooks());
    dispatch(countBorrowedBooks());
    dispatch(countUsers());
    dispatch(countComments());
  }, [dispatch]);

  // Function to handle the print
  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="admin-dashboard-contents-container">
      {isActive === 1 && (
        <section className="summary-dashboard-container" id="printable">
          <h3 className="summary-dashboard-title">Summary Overview</h3>
          <button onClick={handlePrint} className="print-button">
            Print
          </button>

          <section className="bookshelves-bar-chart-wrapper">
            <BookshelvesChart
              bookshelves={bookshelves}
              books={books}
              donatedBooks={donatedBooks}
              borrowedBooks={borrowedBooks}
            />
          </section>

          <div className="line-pie-charts-wrapper">
            <DonatedBookChart bookshelves={bookshelves} books={books} />
            <PieChartBookshelves
              countShelves={countShelves}
              Books={Books}
              BorrowedBooks={BorrowedBooks}
              DonatedBooks={DonatedBooks}
              Users={Users}
              Comments={Comments}
            />
          </div>
        </section>
      )}

      {isActive === 2 && <AllUsers />}
      {isActive === 3 && <AllBookshelves />}
      {isActive === 4 && <AllBooks />}
      {isActive === 5 && <AllDonatedBooks />}
      {isActive === 6 && <AllBorrowedBooks />}
      {isActive === 7 && <Comments />}
      {isActive === 8 && <Ratings />}
      {isActive === 9 && <Genres />}
      {isActive === 10 && <AdminInbox />}
    </article>
  );
};

export default DashboardSummary;
