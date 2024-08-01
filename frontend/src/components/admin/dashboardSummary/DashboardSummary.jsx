import { useDispatch, useSelector } from "react-redux";
import DonatedBookChart from "../../charts/books/DonatedBookChart";
import BookshelvesChart from "../../charts/bookshelves/BookshelvesChart";
import PerformanceOverviewChart from "../../charts/performance/PerformanceOverviewChart";
import UsersChart from "../../charts/users/UsersChart";
import AdminInbox from "../adminInbox/AdminInbox";
import AllBooks from "../allBooks/AllBooks";
import AllBookshelves from "../allBookshelves/AllBookshelves";
import AllBorrowedBooks from "../allBorrowedBooks/AllBorrowedBooks";
import Comments from "../allComments/Comments";
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

const DashboardSummary = ({ isActive }) => {
  // Global state variables
  const dispatch = useDispatch();
  const { count: countShelves } = useSelector((state) => state.bookshelf);
  const { count: Books } = useSelector((state) => state.book);
  const { count: BorrowedBooks } = useSelector((state) => state.borrowedBook);

  const { count: DonatedBooks } = useSelector((state) => state.donatedBook);
  const { count: Users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(countBookshelves());
    dispatch(countBooks());
    dispatch(countDonatedBooks());
    dispatch(countBorrowedBooks());

    dispatch(countUsers());
  }, [dispatch]);
  return (
    <article>
      {isActive === 1 && (
        <section className="update-profile-container">
          <h3 className="update-profile-title"> Summary Overview </h3>

          <section className="users-participation-wrapper">
            <UsersChart />

            <aside className="box-text">
              <h4 className="box-title"> Users </h4>
              <h4 className="box-count"> Counts: {Users} </h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>

          <section className="users-participation-wrapper">
            <BookshelvesChart />

            <aside className="box-text">
              <h4 className="box-title"> Bookshelves Chart </h4>
              <h4 className="box-count">
                {" "}
                Counts: {countShelves ? countShelves : 0}{" "}
              </h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>

          <section className="users-participation-wrapper">
            <DonatedBookChart />

            <aside className="box-text">
              <h4 className="box-title"> Books </h4>
              <h4 className="box-count">Counts: {Books ? Books : 0}</h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>

          <section className="users-participation-wrapper">
            <DonatedBookChart />

            <aside className="box-text">
              <h4 className="box-title"> Donated Books </h4>
              <h4 className="box-count">
                Counts: {DonatedBooks ? DonatedBooks : 0}
              </h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>

          <section className="users-participation-wrapper">
            <DonatedBookChart />

            <aside className="box-text">
              <h4 className="box-title"> Borrowed Books </h4>
              <h4 className="box-count">
                {" "}
                Counts: {BorrowedBooks ? BorrowedBooks : 0}{" "}
              </h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>

          <section className="users-participation-wrapper">
            <PerformanceOverviewChart />

            <aside className="box-text">
              <h4 className="box-title"> Performance Overview </h4>
              <h4 className="box-count"> Counts: 60 </h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>
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
