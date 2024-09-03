import { useSelector } from "react-redux";
import "./AdminSidebar.scss";
import { FaBook, FaUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import ButtonLoader from "../../../utils/loader/buttonLoader/ButtonLoader";
import Logout from "../../../utils/globalFunctions/Logout";

const AdminSidebar = ({ isActive, setIsActive }) => {
  // Global state variables
  const { loading } = useSelector((state) => state.user);
  const { signOut } = Logout();

  // Handle logout
  const handleLogout = async () => {
    await signOut(); 
  };

  return (
    <section className="user-profile-sidebar-wrapper">
      <h2 className="user-profile-sidebar-title">Dashboard</h2>

      <aside
        onClick={() => setIsActive(1)}
        className="user-profile-sidebar-item"
      >
        <MdDashboard
          title="User Profile"
          className={isActive === 1 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 1 ? "active-text" : "passive-text"}>
          Summary 
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(2)}
        className="user-profile-sidebar-item"
      >
        <FaUser
          title="User Profile"
          className={isActive === 2 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 2 ? "active-text" : "passive-text"}>
          Users
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(3)}
        className="user-profile-sidebar-item"
      >
        <GiBookshelf
          title="User Profile"
          className={isActive === 3 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 3 ? "active-text" : "passive-text"}>
          Bookshelves
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(4)}
        className="user-profile-sidebar-item"
      >
        <FaBook
          title="User Address"
          className={isActive === 4 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
          Books
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(5)}
        className="user-profile-sidebar-item"
      >
        <FaBook
          title="Change Password"
          className={isActive === 5 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 5 ? "active-text" : "passive-text"}>
          Donated Books
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(6)}
        className="user-profile-sidebar-item"
      >
        <FaBook
          title="Change Password"
          className={isActive === 6 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 6 ? "active-text" : "passive-text"}>
          Borrowed Books
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(7)}
        className="user-profile-sidebar-item"
      >
        <MdInsertComment
          title="Change Password"
          className={isActive === 7 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 7 ? "active-text" : "passive-text"}>
          Comments
        </h4>
      </aside>

      
      <aside
        onClick={() => setIsActive(8)}
        className="user-profile-sidebar-item"
      >
        <FaStar
          title="Change Password"
          className={isActive === 8 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 8 ? "active-text" : "passive-text"}>
          Ratings
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(9)}
        className="user-profile-sidebar-item"
      >
        <MdCategory
          title="Change Password"
          className={isActive === 9 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 9 ? "active-text" : "passive-text"}>
          Genres
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(10)}
        className="user-profile-sidebar-item"
      >
        <MdOutlineMessage
          title="User Inbox"
          className={isActive === 10 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 10 ? "active-text" : "passive-text"}>
          Admin Inbox
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(11)}
        className="user-profile-sidebar-item"
      >
        <MdOutlineMessage
          title="User Inbox"
          className={isActive === 11 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 11 ? "active-text" : "passive-text"}>
          Subscribers
        </h4>
      </aside>

      <aside onClick={handleLogout} className="user-profile-sidebar-item">
        <IoMdLogOut
          title="Log Out"
          className={isActive === 12 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 12 ? "active-text" : "passive-text"}>
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

export default AdminSidebar;
