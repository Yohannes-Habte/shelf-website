import { useState } from "react";
import axios from "axios";
import { API } from "../../utils/security/secreteKey";
// Replace with your actual API base URL

const BookshelfSearch = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API}/bookshelves?search=${encodeURIComponent(search)}`
      );
      setResults(response.data.result);
    } catch (error) {
      console.error("Error fetching bookshelves:", error);
      // Handle error appropriately
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bookshelves..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((shelf) => (
              <li key={shelf._id}>
                {shelf.name} - {shelf.city}, {shelf.state}, {shelf.country}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookshelves found</p>
        )}
      </div>
    </div>
  );
};

export default BookshelfSearch;
