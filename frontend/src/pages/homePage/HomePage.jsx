import { Helmet } from "react-helmet-async";
import Header from "../../components/layout/header/Header";
import "./HomePage.scss";
import Bookshelves from "../../components/map/bookshelves/Bookshelves";

const HomePage = () => {
  return (
    <main className="home-page">
      <Helmet>
        <title> BookLook </title>
      </Helmet>
      <Header />
      <section className="home-page-container">
        <h1 className="home-page-title"> Home Page </h1>

        <Bookshelves />
      </section>
    </main>
  );
};

export default HomePage;
