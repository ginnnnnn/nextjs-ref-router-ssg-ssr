import { useRouter } from "next/router";
import { Fragment } from "react";
import EventsList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventsByYearAndMonth } from "../../helpers/api-util";

function FilteredEventsPage({ events, year, month }) {
  const { query } = useRouter();

  console.log(query);
  if (!events.length) {
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
      <ResultsTitle date={new Date(year, +month - 1)} />
      <EventsList items={events} />
    </Fragment>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  const [year, month] = slug;
  const filteredEvents = await getEventsByYearAndMonth(+year, +month);
  return {
    props: { events: filteredEvents, year: +year, month: +month },
  };
}
