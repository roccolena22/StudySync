import React, { useEffect, useState } from "react";
import {
  deleteEventFromLocalStorage,
  updateEventFromLocalStorage,
} from "../hooks/localStorageHooks";
import Popup from "./shared/Popup";
import TitlePage from "./shared/TitlePage";
import EditEventForm from "./form/EditEventForm";
import CardList from "./card/CardList";
import { getUser } from "../hooks/getUser";

export default function EventsListContainer({ loggedUser, indexSection }) {
  const [events, setEvents] = useState([]);
  const [pastEvent, setPastEvent] = useState([]);
  const [nextEvent, setNextEvent] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedEvent, setEditedEvent] = useState(false);
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [partecipantPopupIsOpen, setPartecipantPopupIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const currentUser = getUser(loggedUser.email);
    const currentUserEvents = currentUser ? currentUser.events : [];
    setEvents(currentUserEvents);
    setIsDeleted(false);
    setEditedEvent(false);
  }, [isDeleted, editedEvent, loggedUser]);

  useEffect(() => {
    const currentUser = getUser(loggedUser.email) || { events: [] };
    const currentUserEvents = currentUser.events || [];
    setEvents(currentUserEvents);
    setIsDeleted(false);
    setEditedEvent(false);
  }, [isDeleted, editedEvent, loggedUser]);

  useEffect(() => {
    const now = new Date();

    const past = events
      .filter((event) => event && event.end && event.endTime)
      .filter((event) => {
        const endDate = new Date(event.end);
        const endTime = event.endTime.split(":");
        endDate.setHours(endTime[0], endTime[1], 0, 0);
        return endDate < now;
      });

    const next = events
      .filter((event) => event && event.end && event.endTime)
      .filter((event) => {
        const endDate = new Date(event.end);
        const endTime = event.endTime.split(":");
        endDate.setHours(endTime[0], endTime[1], 0, 0);
        return endDate > now;
      });

    const updatedPast = past.map((event) => ({
      ...event,
      status: "Finished",
    }));
    const updatedNext = next.map((event) => ({ ...event, status: "Active" }));

    setPastEvent(updatedPast);
    setNextEvent(updatedNext);
  }, [events]);

  const handleDelete = (event) => {
    deleteEventFromLocalStorage(loggedUser.email, event.uuid);
    setIsDeleted(true);
  };

  const handleEdit = (editedEvent) => {
    updateEventFromLocalStorage(
      loggedUser.email,
      editedEvent.uuid,
      editedEvent
    );
    setEditedEvent(true);
  };

  const handleUpdatePopup = (event) => {
    setSelectedEvent(event);
    setEditPopupIsOpen(!editPopupIsOpen);
  };

  const handleUpdateClosePopup = () => {
    setSelectedEvent(null);
    setEditPopupIsOpen(false);
  };

  const handlePartecipantPopup = () => {
    setPartecipantPopupIsOpen(!partecipantPopupIsOpen);
  };

  return (
    <div className="w-full">
      {events && (
        <div className="w-full">
          {indexSection === 0 ? (
            <CardList
              loggedUser={loggedUser}
              events={nextEvent}
              handleDelete={handleDelete}
              handleUpdatePopup={handleUpdatePopup}
              handlePartecipantPopup={handlePartecipantPopup}
            />
          ) : (
            <CardList
              loggedUser={loggedUser}
              events={pastEvent}
              handleDelete={handleDelete}
              handleUpdatePopup={handleUpdatePopup}
              handlePartecipantPopup={handlePartecipantPopup}
            />
          )}
        </div>
      )}

      {editPopupIsOpen && (
        <Popup handleClose={handleUpdateClosePopup}>
          <TitlePage title="Edit event" />
          <EditEventForm event={selectedEvent} handleEdit={handleEdit} />
        </Popup>
      )}
    </div>
  );
}
