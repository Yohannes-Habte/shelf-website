import { Helmet } from "react-helmet-async";
import Header from "../../../components/layout/header/Header";
import "./BookshelvesPage.scss";

const BookshelvesPage = () => {
  return (
    <main className="bookshelves-page">
      <Helmet>
        <title> Bookshelves </title>
      </Helmet>
      <Header />
      <section className="bookshelves-page-container">
        <h1 className="bookshelves-page-title"> Bookshelves page </h1>
      </section>
    </main>
  );
};

export default BookshelvesPage;
