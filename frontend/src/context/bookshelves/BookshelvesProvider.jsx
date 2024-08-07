import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../utils/security/secreteKey";

const BookshelvesContext = createContext();

export const useBookshelvesContext = () => {
  return useContext(BookshelvesContext);
};

const BookshelvesProvider = ({ children }) => {
  const [bookshelves, setBookshelves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  //============================================================================
  // Display bookshelves
  //============================================================================
  useEffect(() => {
    const fetchBookshelves = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/bookshelves?page=${page}`);
        setBookshelves((prevBookshelves) => [
          ...prevBookshelves,
          ...response.data.result,
        ]);

        setHasMore(response.data.result.length > 0);
      } catch (error) {
        setError("Failed to fetch bookshelves");
        toast.error("Failed to fetch bookshelves");
      } finally {
        setLoading(false);
      }
    };

    fetchBookshelves();
  }, [page]);

  //============================================================================
  // Add more bookshelves
  //============================================================================

  const loadMoreBookshelves = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <BookshelvesContext.Provider
      value={{
        bookshelves,
        loading,
        error,
        loadMoreBookshelves,
        hasMore,
        page,
        setPage,
      }}
    >
      {children}
    </BookshelvesContext.Provider>
  );
};

export default BookshelvesProvider;
