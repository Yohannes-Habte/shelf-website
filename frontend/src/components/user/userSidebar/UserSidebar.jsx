import { FaUser } from "react-icons/fa";
import "./UserSidebar.scss";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaBook } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import { useEffect } from "react";

const UserSidebar = ({ isActive, setIsActive }) => {
  const navigate = useNavigate();
  // Global state variables
  const { currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/");
    }
  }, [currentUser]);
  const handleLogout = () => {};

  return (
    <section className="user-profile-sidebar-wrapper">
      <h2 className="user-profile-sidebar-title">Dashboard</h2>

      <aside
        onClick={() => setIsActive(1)}
        className="user-profile-sidebar-item"
      >
        <FaUser
          title="User Profile"
          className={isActive === 1 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 1 ? "active-text" : "passive-text"}>
          User Profile
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(2)}
        className="user-profile-sidebar-item"
      >
        <FaBook
          title="User Address"
          className={isActive === 2 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 2 ? "active-text" : "passive-text"}>
          Borrowed Books
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(3)}
        className="user-profile-sidebar-item"
      >
        <FaBook
          title="Change Password"
          className={isActive === 3 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 3 ? "active-text" : "passive-text"}>
          Donated Books
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(4)}
        className="user-profile-sidebar-item"
      >
        <MdOutlineMessage
          title="User Inbox"
          className={isActive === 4 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
          User Inbox
        </h4>
      </aside>

      {currentUser?.role === "admin" && (
        <Link to={"/admin/dashboard"}>
          <aside
            onClick={() => setIsActive(5)}
            className="user-profile-sidebar-item"
          >
            <RiAdminFill
              title="Parish Admin"
              className={isActive === 5 ? "active-icon" : "passive-icon"}
            />

            <h4 className={isActive === 5 ? "active-text" : "passive-text"}>
              Admin
            </h4>
          </aside>
        </Link>
      )}

      {currentUser?.role === "financeManager" && (
        <Link to={"/finance/dashboard"}>
          <aside
            onClick={() => setIsActive(6)}
            className="user-profile-sidebar-item"
          >
            <RiAdminFill
              title="Parish Admin"
              className={isActive === 6 ? "active-icon" : "passive-icon"}
            />

            <h4 className={isActive === 6 ? "active-text" : "passive-text"}>
              Finance Manager
            </h4>
          </aside>
        </Link>
      )}

      <aside onClick={handleLogout} className="user-profile-sidebar-item">
        <IoMdLogOut
          title="Log Out"
          className={isActive === 7 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 7 ? "active-text" : "passive-text"}>
          {loading ? (
            <span className="loading">
              <ButtonLoader /> Loading...
            </span>
          ) : (
            "Log Out"
          )}
        </h4>
      </aside>
    </section>
  );
};

export default UserSidebar;
