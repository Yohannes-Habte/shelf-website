import { Helmet } from "react-helmet-async";
import "./RegisterPage.scss";
import RegisterForm from "../../components/forms/register/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="register-page">
      <Helmet>
        <title> Sign Up </title>
      </Helmet>
      <section className="register-page-container">
        <h1 className="register-page-title"> Create an Account for Free </h1>

        <RegisterForm />
      </section>
    </main>
  );
};

export default RegisterPage;
