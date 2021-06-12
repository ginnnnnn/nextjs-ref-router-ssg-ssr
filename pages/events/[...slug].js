import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import EventsList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";

function FilteredEventsPage() {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { query } = useRouter();
  const { data, error } = useSWR(
    "https://nextjs-course-8b3b7-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  useEffect(() => {
    if (data && query.slug) {
      const [y, m] = query.slug;

      const allEvents = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      const filtered = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === +y && eventDate.getMonth() === +m - 1
        );
      });
      setFilteredEvents(filtered);
    }
  }, [data]);
  if (!data) {
    return <p className="center">loading</p>;
  }

  if (!filteredEvents.length || !query.slug) {
    return (
      <Fragment>
        <ErrorAlert className="center">No matched result</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={new Date(+query.slug[0], +query.slug[1] - 1)} />
      <EventsList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
