import UserBorrowedBooks from "../userBorrowedBooks/UserBorrowedBooks";
import UserDonatedBooks from "../userDonatedBooks/UserDonatedBooks";
import UserInbox from "../userInbox/UserInbox";

import "./UpdateProfile.scss";

const UpdateProfile = ({ isActive }) => {
  return (
    <article>
      {isActive === 1 && (
        <section className="update-profile-container">
          <h3 className="update-profile-title"> Update Profile</h3>
        </section>
      )}

      {isActive === 2 && <UserBorrowedBooks />}

      {isActive === 3 && <UserDonatedBooks />}

      {isActive === 4 && <UserInbox />}
    </article>
  );
};

export default UpdateProfile;
