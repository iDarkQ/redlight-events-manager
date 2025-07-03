import { EventCard } from "~/components/event-card";
import { styles } from ".";
import { Button } from "~/components/button";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { routeCreateEvent, routeViewEvent } from "~/utils/routes";
import { defaultEvent, useEvent } from "~/providers/event";
import { useEffect, useState } from "react";
import { useFilter } from "~/providers/filter";
import { EventDto } from "~/lib/api";
import * as turf from "@turf/turf";
import { eventCardDateFormat } from "~/utils/date";

export const Events = () => {
  const navigate = useNavigate();
  const { filter, searchBar } = useFilter();
  const { events, setSelectedEvent } = useEvent();
  const [showRest, setShowRest] = useState(false);

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
        eventCardDateFormat(event.date) +
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

  const createEvent = () => {
    setSelectedEvent(defaultEvent);
    navigate(routeCreateEvent());
  };

  const cancelledAndCompletedEvents = (
    <>
      {completedEvents.length > 0 && (
        <>
          <h3>Completed Events</h3>
          <div className={styles.events}>
            {completedEvents.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onClick={() => {
                  setSelectedEvent(event);
                  navigate(routeViewEvent(event.id));
                }}
                className={styles.card}
              />
            ))}
          </div>
        </>
      )}
      {cancelledEvents.length > 0 && (
        <>
          <h3>Cancelled Events</h3>
          <div className={styles.events}>
            {cancelledEvents.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onClick={() => {
                  setSelectedEvent(event);
                  navigate(routeViewEvent(event.id));
                }}
                className={styles.card}
              />
            ))}
          </div>
        </>
      )}
    </>
  );

  useEffect(() => {
    setFilteredEvents(filterEvents(events));
  }, [filter, searchBar, events]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.planned}>
          <h3>Planned Events</h3>
          <Button onClick={createEvent} color="red">
            Create Event <AiOutlinePlus />
          </Button>
        </div>
        {plannedEvents.length === 0 && (
          <h5>
            No sport events scheduled... Time to finish git commits you tried to avoid ¯\(ツ)/¯
          </h5>
        )}
        <div className={styles.events}>
          {plannedEvents.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onClick={() => {
                setSelectedEvent(event);
                navigate(routeViewEvent(event.id));
              }}
              className={styles.card}
            />
          ))}
        </div>
        {showRest && cancelledAndCompletedEvents}
        {(cancelledEvents.length > 0 || completedEvents.length > 0) && (
          <Button onClick={() => setShowRest((prev) => !prev)}>
            {showRest ? "Hide" : "Load"} {cancelledEvents.length > 0 && "cancelled and "}completed
            events...
          </Button>
        )}
      </section>
    </div>
  );
};
