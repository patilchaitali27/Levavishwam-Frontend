import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";

export default function EventDetailsPage() {
  const { state: event } = useLocation();

  if (!event)
    return <p className="text-center py-20 text-gray-600">Event details not available.</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Back button */}
        <Link
          to="/#events"
          className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Events
        </Link>

        {/* Banner Image */}
        <img
          src={event.image}
          className="w-full h-80 object-cover rounded-xl shadow mb-10"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            {event.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            {event.location}
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Event</h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-4">{event.description}</p>

          <p className="text-gray-700 leading-relaxed text-lg">
            More detailed event information can be added here such as schedules,
            activities, participation rules, and highlights once backend integrates.
          </p>
        </div>

      </div>
    </section>
  );
}
