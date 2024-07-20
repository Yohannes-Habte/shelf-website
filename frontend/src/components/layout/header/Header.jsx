import Navbar from "../navbar/Navbar";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="flex">
        <span className="text-green-500 text-3xl">Book.</span>{" "}
        <span className="text-purple-500 text-3xl">Look</span>
      </h1>

      <Navbar />
    </header>
  );
};

export default Header;
