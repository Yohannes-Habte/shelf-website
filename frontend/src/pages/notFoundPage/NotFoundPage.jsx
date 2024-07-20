import { Helmet } from "react-helmet-async";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <main className="notFound-page">
      <Helmet>
        <title> Not Found </title>
      </Helmet>
      <section className="notFound-page-container">
        <h1 className="notFound-page-title"> Not Found Page </h1>
      </section>
    </main>
  );
};

export default NotFoundPage;
