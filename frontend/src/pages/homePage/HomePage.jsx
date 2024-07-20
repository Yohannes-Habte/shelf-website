import { Helmet } from "react-helmet-async";
import Header from "../../components/layout/header/Header";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <main className="home-page">
      <Helmet>
        <title> BookLook </title>
      </Helmet>
      <Header />
      <section className="home-page-container">
        <h1 className="home-page-title"> Home Page </h1>
      </section>
    </main>
  );
};

export default HomePage;
