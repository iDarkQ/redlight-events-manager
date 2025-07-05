import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { EventDto } from "~/lib/api";
import { useEvent } from "~/providers/event";
import { useFilter } from "~/providers/filter";
import { EVENT_CARD_DATE_FORMAT } from "~/utils/date";
import * as turf from "@turf/turf";

export const useEvents = () => {
  const { filter, searchBar } = useFilter();
  const { events } = useEvent();

  const filterEvents = (events: EventDto[]) => {
    return events.filter((event) => {
      // Filter by type
      if (filter.type && filter.type !== "" && event.type !== filter.type) {
        return false;
      }

      // Filter by location
      if (filter.geomtry && filter.geomtry.length > 0) {
        const point = turf.point([event.longitude, event.latitude]);
        const polygon = turf.polygon(filter.geomtry);
        if (!turf.booleanPointInPolygon(point, polygon)) {
          return false;
        }
      }

      const eventDate = new Date(event.date);

      // Filter by dateFrom
      if (filter.dateFrom && filter.dateFrom !== "") {
        const dateFrom = new Date(filter.dateFrom);
        if (eventDate < dateFrom) {
          return false;
        }
      }

      // Filter by dateTo
      if (filter.dateTo && filter.dateTo !== "") {
        const dateTo = new Date(filter.dateTo);
        if (eventDate > dateTo) {
          return false;
        }
      }

      // HACK: This allows for search by event title, date, location, status, and creator name
      const dataString =
        event.title +
        " " +
        event.location +
        " " +
        event.status +
        " " +
        dayjs(event.date).format(EVENT_CARD_DATE_FORMAT) +
        " " +
        event.participants.find((participant) => participant.name === event.creatorId);

      if (!dataString.toLocaleLowerCase().includes(searchBar.toLowerCase())) {
        return false;
      }
      // Only return true if ALL filters pass
      return true;
    });
  };

  const [filteredEvents, setFilteredEvents] = useState<EventDto[]>([]);

  const plannedEvents = filteredEvents.filter((event) => event.status === "PLANNED");
  const cancelledEvents = filteredEvents.filter((event) => event.status === "CANCELLED");
  const completedEvents = filteredEvents.filter((event) => event.status === "COMPLETED");

  useEffect(() => {
    setFilteredEvents(filterEvents(events));
  }, [filter, searchBar, events]);

  return { plannedEvents, cancelledEvents, completedEvents };
};
