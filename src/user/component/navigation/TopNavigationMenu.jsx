import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import IconAndName from "../user/IconAndName";

export default function TopNavigationMenu({ toggleNavigationMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex space-x-5">
      <div className="hidden md:block md:flex space-x-5">
        <IconAndName
          label="dashboard"
          iconName="dashboard"
          pathname="/"
        />
        <IconAndName
          label="network"
          iconName="network"
          pathname="/network"
        />
        <IconAndName
          label="calendar"
          iconName="calendar"
          pathname="/calendar"
        />
      </div>
      <div className="sm:hidden">
        <IconAndName
          label="menu"
          iconName="menu"
          pathname
          onClick={toggleNavigationMenu}
        />
      </div>

      <div className=" hidden sm:block sm:flex space-x-5">
        <IconAndName
          label="account"
          iconName="account"
          pathname="/account"
        />
        <IconAndName
          label="logout"
          iconName="logout"
          pathname="/login"
          onClick={handleLogout}
        />
      </div>

    </div>
  );
}
