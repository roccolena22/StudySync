import React from "react";
import Button from "../../../shared/component/Button";
import UserDetails from "./UserDetails";

export default function SingleUser({
  user,
  addFollowers,
  removeFollow,
  loggedUser,
}) {

  const isLoggedUser = loggedUser.id === user.id

  const isFollowed =
  user.followersIds &&
  loggedUser.followingIds &&
  loggedUser.followingIds.some((element) => user.followersIds.includes(element));


  return (
    <div className="flex justify-between items-center border-b border-zinc-400 w-full py-2">
     <UserDetails user={user}/>
      {
        !isLoggedUser &&
        <>
          {isFollowed ? (
            <Button
              small
              outline
              onClick={() => removeFollow(user.id)}
              name="Unfollow"
            />
          ) : (
            <Button small onClick={() => addFollowers(user.id)} name="Follow" />

          )}
        </>}

    </div>
  );
}
