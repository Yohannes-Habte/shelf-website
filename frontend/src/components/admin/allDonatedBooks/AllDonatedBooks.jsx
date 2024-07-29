import { useEffect, useState } from "react";
import "./AllDonatedBooks.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonatedBooks } from "../../../redux/actions/donation/donatedBookAction";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllDonatedBooks = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { donatedBooks, loading, error } = useSelector(
    (state) => state.donatedBook
  );

  useEffect(() => {
    dispatch(fetchDonatedBooks());
  }, [dispatch]);

  // Local state variables
  const [bookId, setBookId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);

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
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <Link to={`/donatedBooks/${params.id}`}>
              <FaEdit className="edit" />
            </Link>

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

  donatedBooks &&
    donatedBooks.length > 0 &&
    donatedBooks.map((book) =>
      rows.push({
        id: book._id,
        coverImageUrl: book.coverImageUrl,
        title: book.title,
        author: book.author,
        language: book.language,
        genre: book.genre.category,
        publishedDate: book.publishedDate.slice(0, 10),
        publisher: book.publisher.slice(0, 10),
        dateDonated: book.dateDonated.slice(0, 10),
        audio: book.audio,
        ISBN: book.ISBN,
      })
    );

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${API}/donatedBooks/${bookId}`);
      toast.success(data.message);
      dispatch(fetchDonatedBooks()); // Refresh the list of donated books
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting the book");
    } finally {
      setConfirmDeletion(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="donated-books-container">
      <h3 className="donated-books-title">List of Donated Books</h3>

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
            <h3 className="confirm-delete" onClick={handleDelete}>
              Confirm
            </h3>
          </aside>
        </article>
      )}
    </section>
  );
};

export default AllDonatedBooks;
