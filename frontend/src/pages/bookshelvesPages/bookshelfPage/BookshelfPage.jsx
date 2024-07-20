import { Helmet } from "react-helmet-async";
import Header from "../../../components/layout/header/Header";
import "./BookshelfPage.scss";

const BookshelfPage = () => {
  return (
    <main className="bookshelf-page">
      <Helmet>
        <title> Bookshelf </title>
      </Helmet>

      <Header />
      <section className="bookshelf-page-container">
        <h1 className="bookshelf-page-title"> Bookshelf page </h1>
      </section>
    </main>
  );
};

export default BookshelfPage;
