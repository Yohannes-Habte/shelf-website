import { toast } from "react-toastify";
import "./AllBooks.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import BookForm from "../../forms/book/BookForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../redux/actions/book/bookActions";
import { MdEditSquare } from "react-icons/md";
import EditBook from "../../forms/updateBook/EditBook";

const AllBooks = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);

  // Local state variables
  const [bookId, setBookId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openBook, setOpenBook] = useState(false);
  const [openEditBook, setOpenEditBook] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const columns = [
    {
      field: "coverImageUrl",
      headerName: "Cover Page",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "NULL"}
          alt={params.row.title}
          style={{ width: "3rem", height: "2rem", objectFit: "contain" }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "genre",
      headerName: "Genre",
      width: 150,
      renderCell: (params) => params.row.genre.category,
    },
    {
      field: "authors",
      headerName: "Authors",
      width: 300,
      renderCell: (params) =>
        params.row.authors
          .map((author) => `${author.firstName} ${author.lastName}`)
          .join(", "),
    },
    { field: "language", headerName: "Language", width: 100 },
    {
      field: "publishedDate",
      headerName: "Published Date",
      width: 150,
      renderCell: (params) =>
        new Date(params.row.publishedDate).toLocaleDateString(),
    },
    { field: "publisher", headerName: "Publisher", width: 150 },
    { field: "summary", headerName: "Summary", width: 300 },
    { field: "audio", headerName: "Audio", width: 100 },
    {
      field: "borrowedTimes",
      headerName: "Borrowed times",
      width: 150,
      renderCell: (params) => params.row.borrowedTimes.length,
    },
    { field: "status", headerName: "Status", width: 150 },
    { field: "ISBN", headerName: "ISBN", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <MdEditSquare
              className="edit"
              onClick={() => setOpenEditBook(true)}
            />

            <FaTrashAlt
              onClick={() => {
                setBookId(params.id);
                setConfirmDeletion(true);
              }}
              className="delete"
            />
          </div>
        );
      },
    },
  ];

  const rows = books.map((book) => ({
    ...book,
    id: book._id,
  }));

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/books/${id}`);
      toast.success(data.message);
      dispatch(fetchBooks()); // Re-fetch books after deletion
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section
      className="books-table-container"
      style={{ height: "400px", width: "100%" }}
    >
      <h3 className="books-table-title">List of Books</h3>

      <aside className="add-new-book">
        <h3 className="add-new-book-title">Add New Genre</h3>
        <button onClick={() => setOpenBook(true)} className="add-new-book-btn">
          Add New
        </button>
      </aside>

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

      {confirmDeletion && (
        <article className="service-delete-confirmation-wrapper">
          <span
            className="delete-icon"
            onClick={() => setConfirmDeletion(false)}
          >
            X
          </span>

          <h3 className="you-want-delete-user">
            Are you sure you want to delete this book?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <p
              className="cancel-delete"
              onClick={() => setConfirmDeletion(false)}
            >
              Cancel
            </p>
            <h3
              className="confirm-delete"
              onClick={() => setConfirmDeletion(false) || handleDelete(bookId)}
            >
              Confirm
            </h3>
          </aside>
        </article>
      )}

      {openBook && <BookForm setOpenBook={setOpenBook} />}

      {openEditBook && <EditBook setOpenEditBook={setOpenEditBook} />}
    </section>
  );
};

export default AllBooks;
