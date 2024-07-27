import { Helmet } from "react-helmet-async";
import Header from "../../../components/layout/header/Header";
import "./BookshelfPage.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookshelf } from "../../../redux/actions/bookshelf/bookshelfAction";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";

const BookshelfPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { shelf, loading, error } = useSelector((state) => state.bookshelf);

  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [donatedBooks, setDonatedBooks] = useState([]);

  console.log("books=", books);

  // Get bookshelf books

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/bookshelves/${id}/books`);
        setBooks(data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();

    const fetchDonatedBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/bookshelves/${id}/books`);
        setDonatedBooks(data.donatedBooks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonatedBooks();

    const fetchBorrowedBooks = async () => {
      try {
        const { data } = await axios.get(`${API}/bookshelves/${id}/books`);
        setBorrowedBooks(data.borrowedBooks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  useEffect(() => {
    dispatch(fetchBookshelf(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="bookshelf-page">
      <Helmet>
        <title> Bookshelf </title>
      </Helmet>

      <Header />
      <section className="bookshelf-page-container">
        <h1 className="bookshelf-page-title"> {shelf?.name} </h1>

        <article className="shelf-details-wrapper">
          <figure className="shelf-image">
            <img className="image" src={shelf?.image} alt={shelf?.name} />
          </figure>
          <section className="shelf-details">
            <h3 className="shelf-books"> {shelf?.name} Books</h3>
            <aside className="books-info">
              <h1>All Books: 60 </h1>
              <p> Borrowed Books: 34 </p>
              <p> Available Books: 26 </p>
            </aside>
          </section>

          <section className="shelf-details">
            <h3 className="shelf-books"> {shelf?.name} Books</h3>
            <aside className="books-info">
              <h1>
                All Books:{" "}
                <Link to={`/bookshelves/${id}/books`}> {books.length} </Link>{" "}
              </h1>
              <p> Borrowed Books: {borrowedBooks.length} </p>
              <p> Available Books: {donatedBooks.length} </p>
            </aside>
          </section>
        </article>
      </section>
    </main>
  );
};

export default BookshelfPage;
