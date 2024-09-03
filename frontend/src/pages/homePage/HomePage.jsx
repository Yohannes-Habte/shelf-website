import { Helmet } from "react-helmet-async";
import Header from "../../components/layout/header/Header";
import "./HomePage.scss";
import Bookshelves from "../../components/map/bookshelves/Bookshelves";
import Footer from "../../components/layout/footer/Footer";
import BookshelfCard from "../../components/bookshelf/bookshelfCard/BookshelfCard";
import CarouselBookshelf from "../../components/bookshelf/carouselBookshelf/CarouselBookshelf";
import { useBookshelvesContext } from "../../context/bookshelves/BookshelvesProvider";
import BookshelfSearchForm from "../../components/forms/search/BookshelfSearchForm";

const HomePage = () => {
  const { bookshelves } = useBookshelvesContext();
  // Carousel data
  const bookshelvesData = bookshelves?.map((bookshelf) => (
    <BookshelfCard key={bookshelf._id} bookshelf={bookshelf} />
  ));

  return (
    <main className="home-page">
      <Helmet>
        <title> BookLooks </title>
      </Helmet>
      <Header />
      <section className="home-page-container">
        <h1 className="home-page-title"> Home Page </h1>

        <BookshelfSearchForm />

        <CarouselBookshelf data={bookshelvesData} />

        <Bookshelves />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
