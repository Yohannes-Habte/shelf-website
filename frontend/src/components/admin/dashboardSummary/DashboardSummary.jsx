import { useDispatch, useSelector } from "react-redux";
import DonatedBookChart from "../../charts/books/AreaChatBookshelves";
import UsersChart from "../../charts/users/UsersChart";
import AdminInbox from "../adminInbox/AdminInbox";
import AllBooks from "../allBooks/AllBooks";
import AllBookshelves from "../allBookshelves/AllBookshelves";
import AllBorrowedBooks from "../allBorrowedBooks/AllBorrowedBooks";
import AllDonatedBooks from "../allDonatedBooks/AllDonatedBooks";
import Genres from "../AllGenres/Genres";
import Ratings from "../AllRatings/Ratings";
import AllUsers from "../allUsers/AllUsers";
import "./DashboardSummary.scss";
import { countBookshelves } from "../../../redux/actions/bookshelf/bookshelfAction";
import { useEffect } from "react";
import { countBorrowedBooks } from "../../../redux/actions/borrow/BorrowBookAction";
import { countBooks } from "../../../redux/actions/book/bookActions";
import { countUsers } from "../../../redux/actions/user/userActions";
import { countDonatedBooks } from "../../../redux/actions/donation/donatedBookAction";
import PieChartBookshelves from "../../charts/performance/PieChartBookshelves";
import { countComments } from "../../../redux/actions/comment/commentActions";

const DashboardSummary = ({ isActive }) => {
  // Global state variables
  const dispatch = useDispatch();
  const { count: countShelves } = useSelector((state) => state.bookshelf);
  const { count: Books } = useSelector((state) => state.book);
  const { count: BorrowedBooks } = useSelector((state) => state.borrowedBook);
  const { count: DonatedBooks } = useSelector((state) => state.donatedBook);
  const { count: Users } = useSelector((state) => state.user);
  const { count: Comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(countBookshelves());
    dispatch(countBooks());
    dispatch(countDonatedBooks());
    dispatch(countBorrowedBooks());
    dispatch(countUsers());
    dispatch(countComments());
  }, [dispatch]);
  return (
    <article className="admin-dashboard-contents-container">
      {isActive === 1 && (
        <section className="summary-dashboard-container">
          <h3 className="summary-dashboard-title"> Summary Overview </h3>

          <section className="bookshelves-bar-chart-wrapper">
            <UsersChart />
          </section>

          <div className="line-pie-charts-wrapper">
            <section className="line-chart">
              <DonatedBookChart />

              <h4 className="box-title"> Fig.2: Line Chart </h4>
            </section>

            <section className="pie-chart">
              <PieChartBookshelves
                countShelves={countShelves}
                Books={Books}
                BorrowedBooks={BorrowedBooks}
                DonatedBooks={DonatedBooks}
                Users={Users}
                Comments={Comments}
              />

              <h4 className="box-title"> Fig.3: Performance Overview </h4>
            </section>
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
