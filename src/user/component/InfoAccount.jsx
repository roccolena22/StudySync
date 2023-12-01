import { useState } from "react";
import ProfileInfoForm from "./form/ProfileInfoFrom";
import Popup from "./shared/Popup";
import DeleteAccount from "./DeleteAccount";
import EditPasswordForm from "./form/EditPasswordForm";
import TitleSection from "./shared/TitleSection";

export default function InfoAccount({ loggedUser, users }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-6 w-full flex flex-col justify-center">
      <ProfileInfoForm loggedUser={loggedUser} />
      <div className="pt-6">
        <TitleSection title="Edit password" />
        <div className="pt-6">
          <EditPasswordForm loggedUser={loggedUser} users={users}/>
        </div>
        <p
          className="text-red-800 font-semibold cursor-pointer pt-16 text-center"
          onClick={handleClose}
        >
          Delete Account
        </p>
        {isOpen && (
          <Popup handleClose={handleClose}>
            <DeleteAccount />
          </Popup>
        )}
      </div>
    </div>
  );
}
