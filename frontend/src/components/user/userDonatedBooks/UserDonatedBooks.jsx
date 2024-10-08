import "./UserDonatedBooks.scss";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DonatedBookForm from "../../forms/DonatedBook/DonatedBookForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonatedBooks } from "../../../redux/actions/user/userActions";

const UserDonatedBooks = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { donatedBooks, currentUser } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchDonatedBooks(currentUser._id));
    }
  }, [dispatch, currentUser]);

  const [openDonatedBook, setOpenDonatedBook] = useState(false);

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
    { field: "authors", headerName: "Author", width: 300 },
    { field: "language", headerName: "Language", width: 150 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "publishedDate", headerName: "Published Date", width: 150 },
    { field: "publisher", headerName: "Publisher", width: 150 },
    { field: "dateDonated", headerName: "Donated Date", width: 100 },
    { field: "audio", headerName: "Audio", width: 100 },
    { field: "ISBN", headerName: "ISBN", width: 100 },
  ];

  // Convert donatedBooks to rows for DataGrid
  const rows = donatedBooks.map((book) => ({
    id: book._id,
    coverImageUrl: book?.coverImageUrl || "NULL",
    title: book?.title || "NULL",
    authors:
      book?.authors
        .map((author) => `${author?.firstName} ${author?.lastName}`)
        .join(", ") || "NULL",
    language: book?.language || "NULL",
    genre: book?.genre?.category || "NULL",
    publishedDate: new Date(book?.publishedDate)?.toLocaleDateString() || "NULL",
    publisher: book?.publisher || "NULL",
    dateDonated: new Date(book?.dateDonated)?.toLocaleDateString() || "NULL",
    audio: book?.audio ? "Yes" : "No",
    ISBN: book?.ISBN || "NULL",
  }));

 

  return (
    <section className="donated-books-container">
      <h3 className="donated-books-title">List of Donated Books</h3>

      <aside className="add-new-donated-book">
        <h3 className="add-new-donated-book-title">
          Do you want to donate a book?
        </h3>
        <button
          onClick={() => setOpenDonatedBook(true)}
          className="add-new-donated-book-btn"
        >
          Donate Book
        </button>
      </aside>

      {donatedBooks.length === 0 ? (
        <p>No donated books available.</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
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

      {openDonatedBook && (
        <DonatedBookForm setOpenDonatedBook={setOpenDonatedBook} />
      )}
    </section>
  );
};

export default UserDonatedBooks;
