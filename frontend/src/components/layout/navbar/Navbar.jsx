import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { useSelector } from "react-redux";
import "./Navbar.scss";
const Navbar = () => {
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = false;

  // Local state variable
  const [open, setOpen] = useState(false);

  // Handle click
  const handleClick = () => {
    setOpen(!open);
  };

  // Styling NavLink
  const navbarNavLink = ({ isActive }) =>
    isActive ? "active-navbar-item" : "passive-navbar-item";

  return (
    <nav className="header-navbar">
      {/* Navigation bar */}
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to={"/"} className={navbarNavLink}>
            Home
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={"/about"} className={navbarNavLink}>
            About
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={"/bookshelves"} className={navbarNavLink}>
            Bookshelves
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={"/FAQs"} className={navbarNavLink}>
            FAQ
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={"/contact"} className={navbarNavLink}>
            Contact
          </NavLink>
        </li>
      </ul>

      {currentUser ? (
        <aside className="logged-in-user-info" onClick={handleClick}>
          <img
            className="logged-in-user-image "
            src={currentUser.image}
            alt={currentUser.firstName}
          />
          <h4 className="logged-in-user-name"> {currentUser.firstName} </h4>
          {open && (
            <ul className="logged-in-user-menu">
              {currentUser && currentUser.role === "admin" && (
                <li className="menu-item">
                  <NavLink to={"/admin/dashboard"} className={"link"}>
                    Admin Dashboard
                  </NavLink>
                </li>
              )}

              {currentUser && currentUser.role === "financeManager" && (
                <li className="menu-item">
                  <NavLink to={"/finance/dashboard"} className={"link"}>
                    Finance Dashboard
                  </NavLink>
                </li>
              )}

              <li className="menu-item">
                <NavLink to={"/user/profile"} className={"link"}>
                  User Profile
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink to={"/login"} className={"link"}>
                  Log Out
                </NavLink>
              </li>
            </ul>
          )}
        </aside>
      ) : (
        <ul className="register-login">
          <li className="navbar-item">
            <NavLink to={"/register"} className="link register">
              Register
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to={"/login"} className="link login">
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
