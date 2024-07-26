import { useState } from "react";
import "./AllBookshelves.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utils/security/secreteKey";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ClickOnMapBookshelf from "../../forms/bookshelf/clickMapOption/ClickOnMapBookshelf";
import UserLocationBookshelf from "../../forms/bookshelf/userLocationOption/UserLocationBookshelf";
import SearchLocationBookshelf from "../../forms/bookshelf/searchLocationOption/SearchLocationBookshelf";

const AllBookshelves = () => {
  // Local state variable
  const [bookshelfId, setBookshelfId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openClickMapBookshelf, setOpenClickMapBookshelf] = useState(false);
  const [openUserLocationBookshelf, setOpenUserLocationBookshelf] =
    useState(false);
  const [openSearchLocationBookshelf, setOpenSearchLocationBookshelf] =
    useState(false);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/bookshelves/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // allUsers();
  };

  const columns = [
    { field: "image", headerName: "Photo", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "street", headerName: "Address", width: 200 },
    { field: "zipCode", headerName: "Zip Code", width: 100 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "openingHours", headerName: "Opening Hours", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <MdEditSquare
              className="edit"
              onClick={() => setOpenClickMapBookshelf(true)}
            />

            <FaTrashAlt
              onClick={() =>
                setBookshelfId(params.id) || setConfirmDeletion(true)
              }
              className="delete"
            />
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: "sfs13",
      barcode: "bookshelf",
      image: "photo",
      name: "start bookshelf",
      location: "lat: 2, lon: 34",
      street: "rabenstr. 50z",
      zipCode: "25421",
      city: "Pinneberg",
      state: "Schleswig-holstein",
      country: "Germany",
      openingHours: "8:00 - 18:00",
    },
  ];
  return (
    <section className="bookshelves-table-container">
      <h3 className="bookshelves-table-title"> List of Bookshelves </h3>

      <aside className="add-new-bookshelf">
        <h3 className="add-new-bookshelf-title">
          Options to Add New Bookshelf
        </h3>
        <div>
          <button
            onClick={() => setOpenClickMapBookshelf(true)}
            className="add-new-bookshelf-btn"
          >
            Click On Map
          </button>

          <button
            onClick={() => setOpenUserLocationBookshelf(true)}
            className="add-new-bookshelf-btn"
          >
            User Location
          </button>

          <button
            onClick={() => setOpenSearchLocationBookshelf(true)}
            className="add-new-bookshelf-btn"
          >
            Search Location
          </button>
        </div>
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
              onClick={() =>
                setConfirmDeletion(false) || handleDelete(bookshelfId)
              }
            >
              confirm
            </h3>
          </aside>
        </article>
      )}

      {openClickMapBookshelf && (
        <ClickOnMapBookshelf
          setOpenClickMapBookshelf={setOpenClickMapBookshelf}
        />
      )}
      {openUserLocationBookshelf && (
        <UserLocationBookshelf
          setOpenUserLocationBookshelf={setOpenUserLocationBookshelf}
        />
      )}
      {openSearchLocationBookshelf && (
        <SearchLocationBookshelf
          setOpenSearchLocationBookshelf={setOpenSearchLocationBookshelf}
        />
      )}
    </section>
  );
};

export default AllBookshelves;
