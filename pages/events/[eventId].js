import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getEventById, getFeaturedEventIds } from "../../helpers/api-util";

function EventPage({ event }) {
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventPage;

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;
  const event = await getEventById(eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const featuredEventIds = await getFeaturedEventIds();
  const paths = featuredEventIds.map((id) => ({ params: { eventId: id } }));
  return {
    paths,
    fallback: "blocking",
  };
}
