import { Helmet } from "react-helmet-async";
import "./BooksPage.scss";

const BooksPage = () => {
  return (
    <main className="books-page">
      <Helmet>
        <title> Books </title>
      </Helmet>
      
      <section className="books-page-container">
        <h1 className="books-page-title"> Books page </h1>
      </section>
    </main>
  );
};

export default BooksPage;
