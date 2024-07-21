import { toast } from "react-toastify";
import "./AllBooks.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import BookForm from "../../forms/book/BookForm";
import BookAuthor from "../../forms/author/BookAuthor";

const AllBooks = () => {
  const [bookId, setBookId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openBook, setOpenBook] = useState(false);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/books/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // allUsers();
  };

  const columns = [
    { field: "ISBN", headerName: "ISBN", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "publishedDate", headerName: "Published Date", width: 150 },
    { field: "language", headerName: "Language", width: 100 },
    { field: "publisher", headerName: "Publisher", width: 150 },
    { field: "coverImageUrl", headerName: "Cover", width: 150 },
    { field: "summary", headerName: "Summary", width: 150 },
    { field: "shelfId", headerName: "Bookshelf", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <FaTrashAlt
              onClick={() => setBookId(params.id) || setConfirmDeletion(true)}
              className="delete"
            />
          </div>
        );
      },
    },
  ];

  const rows = [];
  return (
    <section className="books-table-container">
      <h3 className="books-table-title"> List of Books </h3>

      <aside className="add-new-book">
        <h3 className="add-new-book-title">Add New Genre</h3>
        <button onClick={() => setOpenBook(true)} className="add-new-book-btn">
          Add New
        </button>
      </aside>

      <DataGrid
        // Rows
        rows={rows}
        // Columns
        columns={columns}
        // Initial state
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // Create search bar
        slots={{ toolbar: GridToolbar }}
        // Search a specific user
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // Page size optons
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        //
      />

      {confirmDeletion && (
        <article className="service-delete-confirmation-wrapper">
          <span
            className="delete-icon"
            onClick={() => setConfirmDeletion(false)}
          >
            X
          </span>

          <h3 className="you-want-delete-user">
            Are you sure you want delete this service?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <p
              className={`cancel-delete`}
              onClick={() => setConfirmDeletion(false)}
            >
              cancel
            </p>
            <h3
              className={`confirm-delete`}
              onClick={() => setConfirmDeletion(false) || handleDelete(bookId)}
            >
              confirm
            </h3>
          </aside>
        </article>
      )}

      {openBook && <BookForm setOpenBook={setOpenBook} />}

      <BookAuthor />
    </section>
  );
};

export default AllBooks;
