import { useEffect, useState } from "react";
import "./AllUsers.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../redux/actions/user/userActions";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllUsers = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  console.log("users =", users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Local state variables
  const [userId, setUserId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt={params.row.firstName}
          style={{ width: "3rem", height: "2rem", objectFit: "contain" }}
        />
      ),
    },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "street", headerName: "Street", width: 150 },
    { field: "zipCode", headerName: "Postal Code", width: 100 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "County", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="action-wrapper">
          <Link to={`/donatedBooks/${params.id}`}>
            <FaEdit className="edit" />
          </Link>
          <FaTrashAlt
            onClick={() => {
              setUserId(params.id);
              setConfirmDeletion(true);
            }}
            className="delete"
          />
        </div>
      ),
    },
  ];

  // Populate rows with user data
  const rows = users.map((user) => ({
    id: user._id,
    image: user?.image,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    role: user?.role,
    street: user?.street || "",
    zipCode: user?.zipCode || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
  }));

  // Handle user deletion
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${API}/users/${userId}`);
      toast.success(data.message);
      dispatch(fetchAllUsers()); // Refresh the list of users
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting the user");
    } finally {
      setConfirmDeletion(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section
      className="user-sidebar-container"
      style={{ height: "400px", width: "100%" }}
    >
      <h3 className="user-sidebar-title"> List of Users </h3>
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
        // Page size options
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
            Are you sure you want to delete this user?
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

export default AllUsers;
