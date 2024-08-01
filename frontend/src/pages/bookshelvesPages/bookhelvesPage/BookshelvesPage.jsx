import { Helmet } from "react-helmet-async";
import Header from "../../../components/layout/header/Header";
import "./BookshelvesPage.scss";
import BookshelfSearchForm from "../../../components/forms/search/BookshelfSearchForm";
import BookshelfList from "../../../components/bookshelf/allBookshelves/BookshelfList";

const BookshelvesPage = () => {
  return (
    <main className="bookshelves-page">
      <Helmet>
        <title> Bookshelves </title>
      </Helmet>
      <Header />
      <section className="bookshelves-page-container">
        <h1 className="bookshelves-page-title"> Bookshelves </h1>
        <BookshelfSearchForm />
        <BookshelfList />
      </section>
    </main>
  );
};

export default BookshelvesPage;
