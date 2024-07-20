import { Helmet } from "react-helmet-async";
import Header from "../../components/layout/header/Header";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <main className="about-page">
      <Helmet>
        <title> About Us </title>
      </Helmet>
      <Header />
      <section className="about-page-container">
        <h1 className="about-page-title"> About Page </h1>
      </section>
    </main>
  );
};

export default AboutPage;
