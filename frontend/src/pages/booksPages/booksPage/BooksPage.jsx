import { Helmet } from "react-helmet-async";
import "./BooksPage.scss";
import Header from "../../../components/layout/header/Header";
import { useLocation } from "react-router-dom";
import BookCardForShelf from "../../../components/bookshelf/bookCard/BookCardForShelf";

const BooksPage = () => {
  const location = useLocation();
  const { books, shelf } = location.state || { books: [], shelf: {} };


  return (
    <main className="books-page">
      <Helmet>
        <title> Books </title>
      </Helmet>
      <Header />
      <section className="books-page-container">
        <h1 className="books-page-title">Books of {shelf?.name} </h1>

        <div className="books-card-container">
          {books &&
            books.length > 0 &&
            books.map((book) => {
              return <BookCardForShelf key={book._id} book={book} />;
            })}
        </div>
      </section>
    </main>
  );
};

export default BooksPage;
