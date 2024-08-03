// src/components/AllBookshelves/AllBookshelves.js
import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js"; // Import html2pdf.js
import "./AllBookshelves.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookshelves } from "../../../redux/actions/bookshelf/bookshelfAction";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import ClickOnMapBookshelf from "../../forms/bookshelf/clickMapOption/ClickOnMapBookshelf";
import UserLocationBookshelf from "../../forms/bookshelf/userLocationOption/UserLocationBookshelf";
import SearchLocationBookshelf from "../../forms/bookshelf/searchLocationOption/SearchLocationBookshelf";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utils/security/secreteKey";

const AllBookshelves = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { bookshelves } = useSelector((state) => state.bookshelf);

  // Local state variable
  const [bookshelfId, setBookshelfId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openClickMapBookshelf, setOpenClickMapBookshelf] = useState(false);
  const [openUserLocationBookshelf, setOpenUserLocationBookshelf] =
    useState(false);
  const [openSearchLocationBookshelf, setOpenSearchLocationBookshelf] =
    useState(false);

  useEffect(() => {
    dispatch(fetchAllBookshelves());
  }, [dispatch]);

  const columns = [
    { field: "barcode", headerName: "Barcode", width: 250 },
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value[0] || "NULL"}
          alt={params.row.name}
          style={{ width: "3rem", height: "2rem", objectFit: "contain" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "location",
      headerName: "Location",
      width: 450,
      renderCell: (params) => (
        <span>{`Lat: ${params.value.coordinates[0]}, Lon: ${params.value.coordinates[1]}`}</span>
      ),
    },
    { field: "street", headerName: "Street", width: 200 },
    { field: "zipCode", headerName: "Zip Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "openingTime", headerName: "Opening Time", width: 150 },
    { field: "closingTime", headerName: "Closing Time", width: 150 },
    {
      field: "books",
      headerName: "Books",
      width: 150,
      renderCell: (params) => <span>{params.value.length}</span>,
    },
    {
      field: "donatedBooks",
      headerName: "Donated Books",
      width: 150,
      renderCell: (params) => <span>{params.value.length}</span>,
    },
    {
      field: "borrowedBooks",
      headerName: "Borrowed Books",
      width: 150,
      renderCell: (params) => <span>{params.value.length}</span>,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="action-wrapper">
          <MdEditSquare
            className="edit"
            onClick={() => setOpenClickMapBookshelf(true)}
          />

          <FaTrashAlt
            onClick={() => {
              setBookshelfId(params.id);
              setConfirmDeletion(true);
            }}
            className="delete"
          />
        </div>
      ),
    },
  ];

  const rows = bookshelves.map((bookshelf) => ({
    id: bookshelf._id,
    barcode: bookshelf.barcode,
    image: bookshelf.image,
    name: bookshelf.name,
    location: bookshelf.location,
    street: bookshelf.street,
    zipCode: bookshelf.zipCode,
    city: bookshelf.city,
    state: bookshelf.state,
    country: bookshelf.country,
    openingTime: bookshelf.openingTime,
    closingTime: bookshelf.closingTime,
    books: bookshelf.books,
    donatedBooks: bookshelf.donatedBooks,
    borrowedBooks: bookshelf.borrowedBooks,
  }));

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/bookshelves/${id}`);
      toast.success(data.message);
      dispatch(fetchAllBookshelves());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const downloadRef = useRef(); // Create a reference to the component to download

  const handleDownload = () => {
    const element = downloadRef.current;

    // Configure options for html2pdf
    const options = {
      margin: 0.5,
      filename: "summary-dashboard.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "a4", // Use A4 paper size
        orientation: "landscape", // Set orientation to landscape
      },
    };

    // Create PDF and save it
    html2pdf().from(element).set(options).save();
  };
  return (
    <section
      className="bookshelves-table-container"
      style={{ height: "400px", width: "100%" }}
    >
      <h3 className="bookshelves-table-title"> List of Bookshelves </h3>

      <button onClick={handleDownload} className="download-button">
        Download as PDF
      </button>

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
        ref={downloadRef}
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
              onClick={() => {
                setConfirmDeletion(false);
                handleDelete(bookshelfId);
              }}
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
