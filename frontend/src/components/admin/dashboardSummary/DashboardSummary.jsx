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

const DashboardSummary = ({ isActive }) => {
  return (
    <article>
      {isActive === 1 && (
        <section className="update-profile-container">
          <h3 className="update-profile-title"> Summary Overview </h3>

          <section className="users-participation-wrapper">
            <UsersChart />

            <aside className="box-text">
              <h4 className="box-title"> Users </h4>
              <h4 className="box-count"> Counts: 40 </h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>

          <section className="users-participation-wrapper">
            <DonatedBookChart />

            <aside className="box-text">
              <h4 className="box-title"> Donated Books </h4>
              <h4 className="box-count"> Counts: 60 </h4>
              <p className="box-link">Link to</p>
            </aside>
          </section>

          <section className="users-participation-wrapper">
            <BookshelvesChart />

            <aside className="box-text">
              <h4 className="box-title"> Bookshelves Chart </h4>
              <h4 className="box-count"> Counts: 160 </h4>
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
