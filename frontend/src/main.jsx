import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import Store from "./redux/Store.jsx";
import UserLocationProvider from "./context/userLocation/UserLocationProvider.jsx";
import BookshelvesProvider from "./context/bookshelves/BookshelvesProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <HelmetProvider>
        <BrowserRouter>
          <UserLocationProvider>
            <BookshelvesProvider>
              <App />
            </BookshelvesProvider>
          </UserLocationProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
