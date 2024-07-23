import { useState } from "react";
import "./UserProfilePage.scss";
import UserSidebar from "../../../components/user/userSidebar/UserSidebar";
import UpdateProfile from "../../../components/user/updateProfile/UpdateProfile";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const [isActive, setIsActive] = useState(1);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1
          className="user-profile-page-title"
          style={{
            backgroundImage: `url(${currentUser.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {" "}
          User Profile page{" "}
        </h1>
        <figure className="image-container">
          <img
            className="user-image"
            src={currentUser.image}
            alt={currentUser.firstName}
          />
        </figure>

        <div className="user-profile-wrapper">
          <div className="sidebar">
            <UserSidebar isActive={isActive} setIsActive={setIsActive} />
          </div>

          <div className="main">
            <UpdateProfile isActive={isActive} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;
