import { Helmet } from "react-helmet-async";
import Header from "../../../components/layout/header/Header";
import "./BookshelvesPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllBookshelves } from "../../../redux/actions/bookshelf/bookshelfAction";
import BookshelfCard from "../../../components/bookshelf/bookshelfCard/BookshelfCard";

const BookshelvesPage = () => {
  const dispatch = useDispatch();
  const { bookshelves, loading, error } = useSelector(
    (state) => state.bookshelf
  );

  useEffect(() => {
    dispatch(fetchAllBookshelves());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <main className="bookshelves-page">
      <Helmet>
        <title> Bookshelves </title>
      </Helmet>
      <Header />
      <section className="bookshelves-page-container">
        <h1 className="bookshelves-page-title"> Bookshelves </h1>

        <div className="bookshelf-cards-wrapper">
          {bookshelves &&
            bookshelves.length > 0 &&
            bookshelves.map((bookshelf) => {
              return (
                <BookshelfCard key={bookshelf._id} bookshelf={bookshelf} />
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default BookshelvesPage;
