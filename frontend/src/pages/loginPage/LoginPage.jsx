import { Helmet } from "react-helmet-async";
import "./LoginPage.scss";
import LoginForm from "../../components/forms/login/LoginForm";

const LoginPage = () => {
  return (
    <main className="login-page">
      <Helmet>
        <title>Sign In </title>
      </Helmet>
      <section className="login-page-container">
        <h1 className="login-page-title"> Welcome to your Account </h1>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
