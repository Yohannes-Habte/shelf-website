import { Helmet } from "react-helmet-async";
import "./BookPage.scss";

const BookPage = () => {
  return (
    <main className="book-page">
      <Helmet>
        <title> Book </title>
      </Helmet>
      <section className="book-page-container">
        <h1 className="book-page-title"> Book page </h1>
      </section>
    </main>
  );
};

export default BookPage;
