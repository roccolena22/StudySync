import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";

export default function FollowerAndFollowedLists({
  users,
  followingIds,
  followersIds,
  loggedUser,
  indexClicked,
}) {
  const [indexSection, setIndexSection] = useState(indexClicked);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  const loggedUserFollowing =
    users && users.filter((user) => followingIds.includes(user.id));

  const loggedUserFollowers =
    users && users.filter((user) => followersIds.includes(user.id));

  return (
    <div className="pt-2">
      <TabMenu
        firstSectionName="Following"
        secondSectionName="Followers"
        handleSections={handleSections}
        indexClicked={indexClicked}
      />
      {indexSection === 0 ? (
        <UsersList
          users={loggedUserFollowing}
          loggedUser={loggedUser}
        />
      ) : (
        <UsersList
          users={loggedUserFollowers}
          loggedUser={loggedUser}
        />
      )}
    </div>
  );
}