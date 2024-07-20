import { Helmet } from "react-helmet-async";
import Header from "../../components/layout/header/Header";
import "./ContactPage.scss";

const ContactPage = () => {
  return (
    <main className="contact-page">
      <Helmet>
        <title> Contact Us </title>
      </Helmet>
      <Header />
      <section className="contact-page-container">
        <h1 className="contact-page-title"> Contact Page </h1>
      </section>
    </main>
  );
};

export default ContactPage;
