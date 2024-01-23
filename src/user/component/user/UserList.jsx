import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Utilities/fetchFunctions";

export default function UsersList({ users }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers(dispatch);
  }, []);

  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
  };

  const sortedUsers = [
    ...(searchedUsers.length > 0 ? searchedUsers : users),
  ].sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);
    return firstNameComparison !== 0
      ? firstNameComparison
      : a.lastName.localeCompare(b.lastName);
  });

  return (
    <div>
      {users.length > 0 && (
        <SearchBar
          placeholder="Search for a user based on their name or email"
          data={users}
          dataFromSearch={handleSearch}
        />
      )}

      <div className="pt-6">
        {(searchedUsers.length > 0 ? searchedUsers : sortedUsers).map(
          (user, index) => (
            <div key={index}>
              <SingleUserInList loggedUser={loggedUser} user={user} />
            </div>
          )
        )}
        {users.length === 0 && (
          <p className="text-lg gray-500">No users to show.</p>
        )}
      </div>
    </div>
  );
}
