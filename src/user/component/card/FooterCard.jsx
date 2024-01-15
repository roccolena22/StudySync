import React, { useState } from "react";
import Button from "../../../shared/component/Button";
import IconAndName from "../user/IconAndName";
import EditEventForm from "../form/EditEventForm";
import Alert from "../shared/Alert";
import PriorityPopup from "../shared/PriorityPopup";

export default function FooterCard({
  event,
  handleDelete,
  toggleBooking,
  loggedUser,
  fetchEvents,
  userIsBooked
}) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editPriorityPopupIsOpen, setEditPriorityPopupIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showNoValidDateAlert, setShowNoValidDateAlert] = useState(false);

  const currentDate = new Date();
  const proproetaryEvent = loggedUser.id === event.authorId;

  const handleNoValidDateAlert = () => {
    setShowNoValidDateAlert(!showNoValidDateAlert);
  };

  const handleAlert = () => {
    setShowAlert(!showAlert);
  };
  const handleCloseEditPriorityPopup = () => {
    setSelectedEvent(null);
    setEditPriorityPopupIsOpen(false);
  };

  const toggleEditPriorityPopup = () => {
    setSelectedEvent(event);
    setEditPriorityPopupIsOpen(!editPriorityPopupIsOpen);
  };

  const eventIsFinished = new Date(`${event.endDate} ${event.endTime}`) < currentDate
  return (
    <div className="flex space-x-2">
      {proproetaryEvent && (
        <>
          {!eventIsFinished && <IconAndName iconName="edit" label="edit" onClick={toggleEditPriorityPopup} />}
          <IconAndName
            iconName="delete"
            label="delete"
            onClick={() => handleDelete(event)}
            color="text-red-800"
          />
        </>
      )}
      {event.bookingsRecordId && event.bookingsRecordId.length >= event.places ? "" :
        !proproetaryEvent && (
          !userIsBooked &&
          <Button small name="Join" onClick={() => toggleBooking(event.id, true)} />
        )
      }

      {userIsBooked && <Button small outline name="Leave" onClick={() => toggleBooking(event.id, false)} />}

      {editPriorityPopupIsOpen && (
        <PriorityPopup handleClose={handleCloseEditPriorityPopup} title="Edit event">
          {<EditEventForm
            event={selectedEvent}
            loggedUser={loggedUser}
            handleCloseEditPriorityPopup={handleCloseEditPriorityPopup}
            handleAlert={handleAlert}
            handleNoValidDateAlert={handleNoValidDateAlert}
            fetchEvents={fetchEvents} />}
        </PriorityPopup>
      )}
      {showAlert && <Alert type="success" text="Modification successful!" onClose={handleAlert} />}
      {showNoValidDateAlert && <Alert text="Something is wrong with the dates you chose." type="alert" onClose={() => setShowNoValidDateAlert(false)} />}
    </div>
  );
}
