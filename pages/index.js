import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function Home({ featuredEvents }) {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: events,
    },
    revalidate: 1800,
  };
}
