import { Mail, Phone, Calendar, User } from "lucide-react";

interface CommitteeMember {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
  joinYear: number;
}

const committeemembers: CommitteeMember[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "President",
    department: "Executive",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "rajesh@levavishwam.org",
    phone: "+91 98765 43210",
    bio: "Community leader with 15+ years of experience",
    joinYear: 2015,
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Vice President",
    department: "Executive",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "priya@levavishwam.org",
    phone: "+91 98765 43211",
    bio: "Education and welfare coordinator",
    joinYear: 2017,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Finance Head",
    department: "Finance",
    image:
      "https://images.pexels.com/photos/2897215/pexels-photo-2897215.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "amit@levavishwam.org",
    phone: "+91 98765 43212",
    bio: "Financial management and planning expert",
    joinYear: 2018,
  },
  {
    id: 4,
    name: "Neha Verma",
    role: "Cultural Head",
    department: "Culture",
    image:
      "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "neha@levavishwam.org",
    phone: "+91 98765 43213",
    bio: "Preserving traditions and cultural values",
    joinYear: 2019,
  },
  {
    id: 5,
    name: "Vikram Sharma",
    role: "Sports Head",
    department: "Sports",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "vikram@levavishwam.org",
    phone: "+91 98765 43214",
    bio: "Youth sports development and fitness programs",
    joinYear: 2020,
  },
  {
    id: 6,
    name: "Deepa Nair",
    role: "Social Head",
    department: "Social",
    image:
      "https://images.pexels.com/photos/2807590/pexels-photo-2807590.jpeg?auto=compress&cs=tinysrgb&w=400",
    email: "deepa@levavishwam.org",
    phone: "+91 98765 43215",
    bio: "Social welfare and community outreach programs",
    joinYear: 2021,
  },
];

function getRoleColor(role: string) {
  const colors: { [key: string]: string } = {
    President: "bg-blue-100 text-blue-800 border border-blue-200",
    "Vice President": "bg-purple-100 text-purple-800 border border-purple-200",
    "Finance Head": "bg-green-100 text-green-800 border border-green-200",
    "Cultural Head": "bg-orange-100 text-orange-800 border border-orange-200",
    "Sports Head": "bg-red-100 text-red-800 border border-red-200",
    "Social Head": "bg-pink-100 text-pink-800 border border-pink-200",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
}

export default function CommitteeSection() {
  return (
    <section id="committee" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Leadership Team
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Committee Members
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated team guiding our community forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {committeemembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getRoleColor(
                      member.role
                    )}`}
                  >
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{member.department}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {member.bio}
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition text-sm"
                  >
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="truncate">{member.email}</span>
                  </a>

                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition text-sm"
                  >
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span>{member.phone}</span>
                  </a>

                  <div className="flex items-center gap-3 text-gray-700 text-sm">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Member since {member.joinYear}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Our committee members are here to serve the community. Feel free to reach out with any questions or concerns.
          </p>
        </div>
      </div>
    </section>
  );
}
