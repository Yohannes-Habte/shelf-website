import "./UserDonatedBooks.scss";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import DonatedBookForm from "../../forms/DonatedBook/DonatedBookForm";

const UserDonatedBooks = () => {
  const [bookId, setBookId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openDonatedBook, setOpenDonatedBook] = useState(false);

  const columns = [
    { field: "eventName", headerName: "Event Name", width: 250 },
    { field: "eventPurpose", headerName: "Event PUrpose", width: 400 },
    { field: "eventOrganizer", headerName: "Event Organizer", width: 150 },
    { field: "eventFacilitator", headerName: "Event Facilitator", width: 150 },
    { field: "eventAddress", headerName: "Event Address", width: 200 },
    { field: "eventDate", headerName: "Event Date", width: 150 },
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

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/donatedBooks/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // allUsers();
  };
  return (
    <section className="donated-books-container">
      <h3 className="donated-books-title"> List of Donated Books </h3>

      <aside className="add-new-donated-book">
        <h3 className="add-new-donated-book-title">
          {" "}
          Do you want to donate Book?
        </h3>
        <button
          onClick={() => setOpenDonatedBook(true)}
          className="add-new-donated-book-btn"
        >
          Donate Book
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

      {openDonatedBook && (
        <DonatedBookForm setOpenDonatedBook={setOpenDonatedBook} />
      )}
    </section>
  );
};

export default UserDonatedBooks;
