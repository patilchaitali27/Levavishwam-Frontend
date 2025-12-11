import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/homeApi";

interface EventItem {
  id: number;
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description: string;
  imageUrl: string;
  status: string;
}

function getStatusBadge(status: string) {
  const styles = {
    upcoming: "bg-blue-100 text-blue-800 border border-blue-200",
    ongoing: "bg-green-100 text-green-800 border border-green-200",
    past: "bg-gray-100 text-gray-800 border border-gray-200",
  };
  const labels = {
    upcoming: "Upcoming",
    ongoing: "Ongoing",
    past: "Past",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
        styles[status as keyof typeof styles]
      }`}
    >
      {labels[status as keyof typeof labels]}
    </span>
  );
}

export default function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await getEvents();
      setEvents(res);
    };
    load();
  }, []);

  const visibleEvents = showAll ? events : events.slice(0, 2);

  return (
    <section id="events" className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Events</h2>
          <p className="text-gray-600">Upcoming community events and activities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-[350px] flex"
            >
              <div className="w-2/5 h-full relative">
                <div className="absolute top-3 right-3">
                  {getStatusBadge(event.status)}
                </div>

                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-3/5 p-5 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{event.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{event.eventTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                  {event.description}
                </p>

                <Link
                  to={`/events/${event.id}`}
                  state={event}
                  className="mt-4 w-full px-4 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 
                             font-medium rounded-lg transition flex items-center justify-center gap-2"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {events.length > 2 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 
                       font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition"
            >
              {showAll ? "View Less" : "View All Community Events"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
