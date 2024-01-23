import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import { getListFromDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { setEvents } from "../../../redux/slices/eventsSlice";
import { sortEvents } from "../../Utilities/timeutils";
import Noitems from "../NoItems";
import { fetchEvents } from "../../Utilities/fetchFunctions";

export default function EventList({ events }) {
  const [searchedEvents, setSearchedEvents] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (dataFromSearch) => {
    setSearchedEvents(dataFromSearch);
  };

  useEffect(() => {
    fetchEvents(dispatch);
  }, [events.length]);

  const sortedEvents = sortEvents(events);

  return (
    <div className="bg-white shadow-xl px-6 rounded-b-lg">
      {sortedEvents.length > 0 && (
        <div className="sticky top-20 w-full z-10">
          <SearchBar
            placeholder="Search by event date, title or author"
            data={sortedEvents}
            dataFromSearch={handleSearch}
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
        {(searchedEvents.length > 0 ? searchedEvents : sortedEvents).map(
          (event, index) => (
            <div
              className={
                sortedEvents.length % 2 === 1 && index === 0
                  ? "sm:col-span-2"
                  : "sm:col-span-1"
              }
              key={index}
            >
              <EventCard
                event={event}
              />
            </div>
          )
        )}
      </div>
      {events.length <= 0 && <Noitems text="No events to show." />}
    </div>
  );
}
