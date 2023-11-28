import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/it";
import AddEventForm from "./form/AddEventForm";
import Popup from "./shared/Popup";
import TitleSection from "./shared/TitleSection";

export default function PersonaleCalendar({ loggedUser, followers, events }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const localizer = momentLocalizer(moment);

  const handleSelectSlot = (slotInfo) => {
    const startDateFormatted = moment(slotInfo.start).toDate();
    const startHours = slotInfo.start.getHours();
    const startMinutes = slotInfo.start.getMinutes();
    const startTime = `${startHours % 12 === 0 ? 12 : startHours % 12}:${
      startMinutes < 10 ? "0" : ""
    }${startMinutes}`;
    const endHours = slotInfo.end.getHours();
    const endMinutes = slotInfo.end.getMinutes();
    const endTime = `${endHours % 12 === 0 ? 12 : endHours % 12}:${
      endMinutes < 10 ? "0" : ""
    }${endMinutes}`;
    setStartTime(startTime);
    setEndTime(endTime);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    if (startDateFormatted <= currentDate) {
      alert("You cannot create events in the past tense");
    } else {
      setStartDate(moment(slotInfo.start).format("L"));
      setEndDate(moment(slotInfo.end).format("L"));
      handlePopup();
    }
  };

  const userInCalendar = followers && followers.filter(
    (user) => user.idFrom === loggedUser.id
  );

  const authorIds = userInCalendar.map((item) => item.idTo);
  const newIds = [...authorIds, loggedUser.id];

  const filteredEvents = events ? events.filter((event) => newIds.includes(event.authorId)) : [];

  const formattedEvents = filteredEvents.map((originalEvent) => ({
    id: originalEvent.id,
    title: originalEvent.title,
    start: new Date(originalEvent.startDate + " " + originalEvent.startTime),
    end: new Date(originalEvent.endDate + " " + originalEvent.endTime),
    location: originalEvent.location,
    mode: originalEvent.mode,
    authorFirstName: originalEvent.authorFirstName,
    authorLastName: originalEvent.authorLastName,
    authorId: originalEvent.authorId,
    places: originalEvent.places,
    authorEmail: originalEvent.authorEmail,
  }));

  
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.authorId === loggedUser.id ? '#f43f5e' : '#15803D',
      borderRadius: "4px",
      color: "white",
      borderColor: event.authorId === loggedUser.id ? '#f43f5e' : '#15803D',
      display: "block",
      margin: "2px",
    };
    return {
      style,
    };
  };

  const handlePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <Calendar
          events={formattedEvents}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          defaultView="week"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      {startDate && isPopupOpen && (
        <Popup handleClose={handlePopup}>
          <TitleSection>
            <p>Create a new event</p>
            <div className="flex space-x-2">
              <div>
                <span className="text-green-700">Start:</span>
                <span className="pl-1">{startDate}</span>
              </div>
              <div>
                <span className="text-red-800">End:</span>
                <span className="pl-1">{endDate}</span>
              </div>
            </div>
          </TitleSection>
          <div className="pt-4">
            <AddEventForm
              loggedUser={loggedUser}
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </Popup>
      )}
    </div>
  );
}
