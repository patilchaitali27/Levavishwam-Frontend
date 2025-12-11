import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { getEventById } from "../services/homeApi";

interface EventItem {
  id: number;
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description: string;
  imageUrl: string;
  status: string;
  content?: string;
}

export default function EventDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState<EventItem | null>(location.state || null);

  useEffect(() => {
    if (!event) {
      const load = async () => {
        const res = await getEventById(Number(id));
        setEvent(res);
      };
      load();
    }
  }, [id]);

  if (!event)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading event details...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 mb-6 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Events
      </Link>

      <div className="bg-white shadow-xl rounded-xl overflow-hidden border">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {event.title}
          </h1>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>{event.eventDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>{event.eventTime}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line mb-6">
            {event.description}
          </p>

          {event.content && (
            <div className="text-gray-800 text-lg whitespace-pre-line">
              {event.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
