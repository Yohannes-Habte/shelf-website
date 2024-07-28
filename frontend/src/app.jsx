import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/homePage/HomePage";
import BookshelvesPage from "./pages/bookshelvesPages/bookhelvesPage/BookshelvesPage";
import BookshelfPage from "./pages/bookshelvesPages/bookshelfPage/BookshelfPage";
import ContactPage from "./pages/contactPage/ContactPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LoginPage from "./pages/loginPage/LoginPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import UserProfilePage from "./pages/usersPages/userProfilePage/UserProfilePage";
import AdminDashboardPage from "./pages/dashboardPages/adminDashboardPage/AdminDashboardPage";
import BookPage from "./pages/booksPages/bookPage/BookPage";
import BooksPage from "./pages/booksPages/booksPage/BooksPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="bookshelves">
          <Route index element={<BookshelvesPage />} />
          <Route path=":bookshelfId">
            <Route index element={<BookshelfPage />} />
            <Route path="books">
              <Route index element={<BooksPage />} />
              <Route path=":bookId" element={<BookPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
