import React, { useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../shared/component/Button";
import { EventFormValidator } from "./validator/EventFormValidator";
import Input from "../../../shared/component/Input";
import DropdownMenu from "../shared/DropdownMenu";

export default function EditEventForm({ event, updateEvent }) {
  const [selectedMode, setSelectedMode] = useState(event.mode);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(EventFormValidator),
    defaultValues: {
      title: event.title,
      location: event.location,
      platform: event.platform,
      info: event.info,
      mode: event.mode,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      places: event.places,
    },
  });

  // const formattedStartDate = moment(event.start).format("L");
  // const formattedEndDate = moment(event.end).format("L");

  const onSubmit = (data) => {
    const editedData = {
      ...event,
      title: data.title,
      location: data.location,
      platform: data.platform,
      info: data.info,
      mode: data.mode,
      startDate: data.startDate,
      endDate: data.endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      places: data.places,
      id: event.id
    };
    updateEvent(editedData);
  };

  const modes = ["In person", "Remotely", "Mixed"];

  return (
    <div className="w-full pt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-4">
          <Input
            label="Event name"
            errorMessage={errors.title?.message}
            register={register("title")}
            placeholder="Enter the name of the event?"
          />
          <div className="w-full lg:w-48">
            <Input
              label="Places available"
              errorMessage={errors.location?.message}
              register={register("places")}
              type="number"
              placeholder="Limits of partecipants"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <Input
            label="Start date"
            errorMessage={errors.startDate?.message}
            register={register("startDate")}
          />
          <Input
            label="Start time"
            errorMessage={errors.startTime?.message}
            register={register("startTime")}
          />
        </div>
        <div className="flex space-x-4">
          <Input
            label="End date"
            errorMessage={errors.endDate?.message}
            register={register("endDate")}
          />
          <Input
            label="End time"
            errorMessage={errors.endTime?.message}
            register={register("endTime")}
          />
        </div>

        <DropdownMenu
          label="Mode:"
          register={register("mode")}
          options={modes}
          errorMessage={errors.mode?.message}
          onOptionSelected={(option) => setSelectedMode(option)}
        />
        {selectedMode === "In person" && (
          <Input
            label="Location"
            errorMessage={errors.location?.message}
            register={register("location")}
            placeholder="Where will the event take place, in a physical location?"
          />
        )}

        {selectedMode === "Remotely" && (
          <Input
            label="Platform"
            errorMessage={errors.platform?.message}
            register={register("platform")}
            placeholder="Where will the event take place, on a meeting platform?"
          />
        )}

        {selectedMode === "Mixed" && (
          <div className="flex space-x-4">
            <Input
              label="Location"
              errorMessage={errors.location?.message}
              register={register("location")}
              placeholder="Physical location?"
            />
            <Input
              label="Platform"
              errorMessage={errors.platform?.message}
              register={register("platform")}
              placeholder="Meeting platform?"
            />
          </div>
        )}
        <Input
          label="Info (optional)"
          errorMessage={errors.info?.message}
          register={register("info")}
        />
        <div className="flex justify-end pb-4">
          <Button type="submit" name="Edit" />
        </div>
      </form>
    </div>
  );
}
