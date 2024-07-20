import { useState } from "react";
import "./UserProfilePage.scss";
import UserSidebar from "../../../components/user/userSidebar/UserSidebar";
import UpdateProfile from "../../../components/user/updateProfile/UpdateProfile";

const UserProfilePage = () => {
  const [isActive, setIsActive] = useState(1);
  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1 className="user-profile-page-title"> User Profile page </h1>

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
