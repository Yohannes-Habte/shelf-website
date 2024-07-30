import "./UserBorrowedBooks.scss";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BorrowedBookForm from "../../forms/borrow/BorrowedBookForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowedBooks } from "../../../redux/actions/user/userActions";

const UserBorrowedBooks = () => {
  const dispatch = useDispatch();
  const {
    borrowedBooks = [],
    currentUser,
    loading,
    error,
  } = useSelector((state) => state.user);
  const [openBorrowedBook, setOpenBorrowedBook] = useState(false);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchBorrowedBooks(currentUser._id));
    }
  }, [dispatch, currentUser]);

  // Log the borrowedBooks data
  useEffect(() => {
    console.log("Fetched borrowedBooks:", borrowedBooks);
  }, [borrowedBooks]);

  const columns = [
    {
      field: "coverImageUrl",
      headerName: "Cover",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.title}
          style={{ width: "3rem", height: "2rem", objectFit: "contain" }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 250 },
    { field: "author", headerName: "Author(s)", width: 200 },
    { field: "language", headerName: "Language", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "publishedDate", headerName: "Published Date", width: 150 },
    { field: "publisher", headerName: "Publisher", width: 150 },
    { field: "audio", headerName: "Audio", width: 100 },
    { field: "ISBN", headerName: "ISBN", width: 100 },
  ];

  const rows = borrowedBooks.map((item) => ({
    id: item._id || `fallback-id-${Math.random()}`, // Ensure id is always unique
    coverImageUrl: item.book.coverImageUrl || '',
    title: item.book.title || '',
    author: item.book.authors?.map(
      (author) => `${author.firstName || ''} ${author.lastName || ''}`
    ).join(", ") || 'Unknown',
    language: item.book.language || 'Unknown',
    genre: item.book.genre || 'Unknown',
    publishedDate: item.book.publishedDate ? item.book.publishedDate.slice(0, 10) : '',
    publisher: item.book.publisher ?item. book.publisher.slice(0, 10) : '',
    dateDonated: item.book.dateDonated ? item.book.dateDonated.slice(0, 10) : '',
    audio: item.book.audio ? "Yes" : "No",
    ISBN: item.book.ISBN || 'Unknown',
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="borrowed-books-container">
      <h3 className="borrowed-books-title">List of Borrowed Books</h3>

      <aside className="add-new-borrowed-book">
        <h3 className="add-new-borrowed-book-title">
          Do you want to Borrow a Book?
        </h3>
        <button
          onClick={() => setOpenBorrowedBook(true)}
          className="add-new-borrowed-book-btn"
        >
          Borrow Book
        </button>
      </aside>
      {rows.length === 0 ? (
        <p>No borrowed books available.</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}

      {openBorrowedBook && (
        <BorrowedBookForm setOpenBorrowedBook={setOpenBorrowedBook} />
      )}
    </section>
  );
};

export default UserBorrowedBooks;
