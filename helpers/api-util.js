export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-8b3b7-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const eventsObj = await response.json();
  const events = Object.keys(eventsObj).map((key) => ({
    id: key,
    ...eventsObj[key],
  }));
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  const featuredEvents = allEvents.filter(({ isFeatured }) => isFeatured);
  return featuredEvents;
}

export async function getFeaturedEventIds() {
  const featuredEvents = await getFeaturedEvents();
  const featuredEventId = featuredEvents.map(({ id }) => id);
  return featuredEventId;
}

export async function getEventById(eventId) {
  const allEvents = await getAllEvents();
  const event = allEvents.find(({ id }) => id === eventId);
  return event;
}
export async function getEventsByYearAndMonth(year, month) {
  const allEvents = await getAllEvents();
  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}
