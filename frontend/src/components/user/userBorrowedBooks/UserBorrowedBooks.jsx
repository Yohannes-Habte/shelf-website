import "./UserBorrowedBooks.scss";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import BorrowedBookForm from "../../forms/borrow/BorrowedBookForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowedBooks } from "../../../redux/actions/user/userActions";

const UserBorrowedBooks = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { borrowedBooks, currentUser, loading, error } = useSelector(
    (state) => state.user
  );
  const [openBorrowedBook, setOpenBorrowedBook] = useState(false);

  console.log("borrowed books", borrowedBooks);
  console.log("user =", currentUser._id);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchBorrowedBooks(currentUser._id));
    }
  }, [dispatch, currentUser]);

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
    { field: "title", headerName: "Title", width: 350 },
    { field: "author", headerName: "Author", width: 300 },
    { field: "language", headerName: "Language", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "publishedDate", headerName: "Published Date", width: 150 },
    { field: "publisher", headerName: "Publisher", width: 150 },
    { field: "dateDonated", headerName: "Donated Date", width: 100 },
    { field: "audio", headerName: "Audio", width: 100 },
    { field: "ISBN", headerName: "ISBN", width: 100 },
  ];

  const rows = [];

  borrowedBooks &&
    borrowedBooks.length > 0 &&
    borrowedBooks.map((book) =>
      rows.push({
        id: book._id,
        coverImageUrl: book?.coverImageUrl,
        title: book?.title,
        author: book?.author,
        language: book?.language,
        genre: book?.genre,
        publishedDate: book?.publishedDate?.slice(0, 10),
        publisher: book?.publisher?.slice(0, 10),
        dateDonated: book?.dateDonated?.slice(0, 10),
        audio: book?.audio,
        ISBN: book?.ISBN,
      })
    );

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <section className="borrowed-books-container">
      <h3 className="borrowed-books-title"> List of Borrowed Books </h3>

      <aside className="add-new-borrowed-book">
        <h3 className="add-new-borrowed-book-title">
          Do you want to Borrow Book?{" "}
        </h3>
        <button
          onClick={() => setOpenBorrowedBook(true)}
          className="add-new-borrowed-book-btn"
        >
          Borrow Book
        </button>
      </aside>
      {borrowedBooks.length === 0 ? (
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
