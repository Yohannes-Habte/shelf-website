import { Helmet } from "react-helmet-async";
import Header from "../../components/layout/header/Header";
import "./FAQsPage.scss";

const FAQsPage = () => {
  return (
    <main className="faqs-page">
      <Helmet>
        <title> FAQs </title>
      </Helmet>
      <Header />
      <section className="faqs-page-container">
        <h1 className="faqs-page-title"> FAQs page </h1>
      </section>
    </main>
  );
};

export default FAQsPage;
