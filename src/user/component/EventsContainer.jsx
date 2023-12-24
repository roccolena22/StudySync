import React, { useEffect, useState } from "react";
import EventList from "./card/EventList";
import { deleteRecordFromDatabase, getListFromDatabase } from "../../api/apiRequest";
import { setEvent } from "../../redux/eventsSlice";
import { useDispatch } from "react-redux";

export default function EventsContainer({
  loggedUser,
  indexSection,
  events,
  users,
}) {
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const dispatch = useDispatch();

  const fetchEvents = async () => {
    const eventsFromDatabase = await getListFromDatabase("events");
    const transformArray = (eventsFromDatabase) => {
      return eventsFromDatabase.map((originalObject) => {
        const transformed = { ...originalObject };
        transformed.authorId = originalObject.authorId[0];
        transformed.lastName = originalObject.lastName[0];
        transformed.firstName = originalObject.firstName[0];
        transformed.email = originalObject.email[0];
        transformed.role = originalObject.role[0];
        return transformed;
      });
    };

    const transformedEventsArray = transformArray(eventsFromDatabase);
    const currentDate = new Date();

    const nextEvents = events.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    const pastEvents = events.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
    );

    setNextEvents(nextEvents);
    setPastEvents(pastEvents);

    dispatch(setEvent(transformedEventsArray));
  };

  useEffect(() => {
    fetchEvents(loggedUser, dispatch);
  }, [dispatch, loggedUser]);

  const handleDelete = async (eventId) => {
    await deleteRecordFromDatabase("events", eventId);
    fetchEvents();
  };

  return (
    <div className="w-full">
      {events && (
        <div className="w-full">
          {indexSection === 0 ? (
            <EventList
              loggedUser={loggedUser}
              events={nextEvents}
              users={users}
              handleDelete={handleDelete}
              fetchEvents={fetchEvents}
              indexSection={indexSection}
            />
          ) : (
            <EventList
              loggedUser={loggedUser}
              events={pastEvents}
              users={users}
              handleDelete={handleDelete}
              indexSection={indexSection}
              fetchEvents={fetchEvents}
            />
          )}
        </div>
      )}
    </div>
  );
}
