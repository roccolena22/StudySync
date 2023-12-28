import React, { useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";

export default function UsersList({
  loggedUser,
  users,
  excludeLogged,
  toggleFollow
}) {
  const [searchedUsers, setSearchedUsers] = useState([]);

  const usersToSearch = excludeLogged
    ? users.filter((user) => user.email !== loggedUser.email)
    : users;

  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
  };

  const sortedUsers = [...(searchedUsers.length > 0 ? searchedUsers : usersToSearch)].sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);
    return firstNameComparison !== 0 ? firstNameComparison : a.lastName.localeCompare(b.lastName);
  });

  return (
    <div>
      {usersToSearch.length > 1 && (
        <SearchBar
          placeholder="Search for a user based on their name or email"
          data={usersToSearch}
          dataFromSearch={handleSearch}
        />
      )}

      <div className="pt-6">
        {(searchedUsers.length > 0 ? searchedUsers : sortedUsers).map(
          (user, index) => (
            <div key={index}>
              <SingleUserInList
                loggedUser={loggedUser}
                user={user}
                toggleFollow={toggleFollow}               
              />
            </div>
          )
        )}
        {usersToSearch.length === 0 && <p className="text-lg slate-400">No users to show</p>}
      </div>
    </div>
  );
}
