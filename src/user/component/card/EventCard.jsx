import EventDetails from "./EventDetails";
import FooterCard from "./FooterCard";
import HeaderCard from "./HeaderCard";
import { useEffect, useState } from "react";

export default function EventCard({
  loggedUser,
  event,
  fetchBookings,
  users,
  bookings,
  fetchEvents,
}) {
  const [bookedUsers, setBookedUsers] = useState([]);

  useEffect(() => {
    const idsArray =
      event && event.bookingsRecordId && bookings
        ? bookings
            .filter((booking) => event.bookingsRecordId.includes(booking.id))
            .map((booking) => booking.bookedId)
        : [];
    setBookedUsers(
      (users && users.filter((user) => idsArray.includes(user.id))) || []
    );
  }, [event, users, bookings]);
  const userIsBooked = bookedUsers.find((user) => user.id === loggedUser.id);


  return (
    <>
      <div className="w-full h-96 relative rounded-lg p-3 bg-gray-50 shadow-xl">
        <div
          className={`flex justify-between items-center border-b ${
            event.role && event.role.includes("student")
              ? "border-yellow-400"
              : "border-purple-500"
          } pb-1 rounded-t-lg`}
        >
          <HeaderCard
            event={event}
            fetchBookings={fetchBookings}
            bookedUsers={bookedUsers}
            loggedUser={loggedUser}
            users={users}
          />
        </div>
        <EventDetails event={event} />
        <div className="absolute bottom-2 right-3">
          <FooterCard
            event={event}
            userIsBooked={userIsBooked}
            fetchEvents={fetchEvents}
            fetchBookings={fetchBookings}
            loggedUser={loggedUser}
          />
        </div>
      </div>
    </>
  );
}
