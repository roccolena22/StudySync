import React, { useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUser from "./SingleUser"; 

export default function UsersList({
  loggedUser,
  users,
  addFollowers,
  removeFollow,
  excludeLogged,
  followers
}) {
  const [searchedUsers, setSearchedUsers] = useState([]);
  
  const usersToSearch = excludeLogged
    ? users.filter((user) => user.email !== loggedUser.email)
    : users;
  
  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
  };
  
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
        {(searchedUsers.length > 0 ? searchedUsers : usersToSearch).map(
          (user, index) => (
            <div key={index}>
              <SingleUser
              followers={followers}
              loggedUser={loggedUser}
                user={user}
                addFollowers={addFollowers}
                removeFollow={removeFollow}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
