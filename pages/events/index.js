import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { getAllEvents } from "../../helpers/api-util";

function EventsPage(props) {
  const { events } = props;
  const router = useRouter();
  const handleOnSearch = (year, month) => {
    router.push(`events/${year}/${month}`);
  };
  return (
    <Fragment>
      <EventsSearch onSearch={handleOnSearch} />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
    revalidate: 1800,
  };
}
