import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/homePage/HomePage";
import AboutPage from "./pages/aboutPage/AboutPage";
import BookshelvesPage from "./pages/bookshelvesPages/bookhelvesPage/BookshelvesPage";
import BookshelfPage from "./pages/bookshelvesPages/bookshelfPage/BookshelfPage";
import FAQsPage from "./pages/faqsPage/FAQsPage";
import ContactPage from "./pages/contactPage/ContactPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LoginPage from "./pages/loginPage/LoginPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import UserProfilePage from "./pages/usersPages/userProfilePage/UserProfilePage";
import AdminDashboardPage from "./pages/dashboardPages/adminDashboardPage/AdminDashboardPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bookshelves" element={<BookshelvesPage />} />
        <Route path="/bookshelves/:id" element={<BookshelfPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
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
