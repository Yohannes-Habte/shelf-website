// src/context/BookshelfContext.jsx

import { createContext, useState, useContext } from "react";
import { fetchBookshelves } from "../api/bookshelfApi";

const BookshelfContext = createContext();

export const useBookshelfContext = () => useContext(BookshelfContext);

const BookshelfProvider = ({ children }) => {
  const [bookshelves, setBookshelves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBookshelves = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBookshelves(searchParams);
      setBookshelves(result);
    } catch (error) {
      setError("Error fetching bookshelves. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookshelfContext.Provider
      value={{ bookshelves, loading, error, searchBookshelves }}
    >
      {children}
    </BookshelfContext.Provider>
  );
};

export default BookshelfProvider;
