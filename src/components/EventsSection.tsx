import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Users,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  image: string;
  status: "upcoming" | "ongoing" | "past";
}

const events: Event[] = [
  {
    id: 1,
    title: "Diwali Celebration",
    date: "December 10, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Community Hall",
    description: "Join us for our grand Diwali celebration with lights, music, and traditional sweets.",
    attendees: 234,
    image:
      "https://images.pexels.com/photos/2097965/pexels-photo-2097965.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Youth Sports Tournament",
    date: "December 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Sports Ground",
    description:
      "Annual inter-community sports tournament with cricket, badminton, and football competitions.",
    attendees: 156,
    image:
      "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Community Health Camp",
    date: "December 20, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Medical Center",
    description:
      "Free health check-up and medical consultation camp for all community members.",
    attendees: 89,
    image:
      "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600",
    status: "upcoming",
  },
];

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
  return (
    <section id="events" className="py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered like NewsSection */}
        <div className="text-center mb-8">
          {/* <div className="inline-block px-4 py-2 bg-green-50 rounded-full mb-4">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              Community Events
            </span>
          </div> */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Events</h2>
          <p className="text-gray-600">
            Upcoming community events and activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    {getStatusBadge(event.status)}
                  </div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{event.attendees} interested</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  {/* Action Button */}
                  <button className="w-full px-4 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button at Bottom */}
        <div className="text-center mt-10">
          <a
            href="#events-all"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 group"
          >
            <span>View All Community Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}