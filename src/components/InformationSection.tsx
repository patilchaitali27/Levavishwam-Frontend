import { Users, Target, Globe, Award, Calendar, Building } from "lucide-react";

export default function InformationSection() {
  return (
    <section id="information" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-10 bg-purple-600 rounded-full"></div>
            <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            About Levavishwam
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A vibrant and united community preserving heritage, culture, and togetherness
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="flex items-center gap-5 p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600">Active Members</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center">
              <Calendar className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">25+</p>
              <p className="text-sm text-gray-600">Years of Service</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
              <Building className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600">Annual Events</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm hover:shadow-md transition mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <Globe className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900">Our Community</h3>
              <p className="text-gray-600">Established in 1995</p>
            </div>
          </div>

          <div className="prose prose-lg text-gray-700 space-y-6 leading-relaxed">
            <p>
              Levavishwam is a vibrant community organization with a strong sense of unity and cultural heritage.
              Since 1995, we have worked towards creating an environment where families stay connected,
              traditions are preserved, and new generations feel proud of their roots.
            </p>

            <p>
              With more than 500 active members, our community hosts over 50 events each year,
              including festivals, workshops, youth programs, sports competitions, and social gatherings.
              These activities strengthen relationships and bring people closer.
            </p>

            <p>
              Our community center plays a crucial role in hosting programs that inspire learning, bonding,
              and celebration. From cultural events to educational seminars, we ensure that
              every member finds opportunities to grow and participate.
            </p>

            <p>
              Levavishwam is guided by a dedicated committee of 12 members who volunteer their time and effort
              to ensure smooth operations and meaningful engagement for all. We take pride in maintaining
              an inclusive and welcoming environment for everyone.
            </p>
          </div>
        </div>

        {/* Activities Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Community Activities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Activity Card */}
            <div className="p-8 text-center border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Cultural Events
              </h4>
              <p className="text-sm text-gray-600">
                Festivals, traditional celebrations, and special cultural gatherings.
              </p>
            </div>

            <div className="p-8 text-center border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Social Programs
              </h4>
              <p className="text-sm text-gray-600">
                Youth activities, group gatherings, and family engagement programs.
              </p>
            </div>

            <div className="p-8 text-center border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Building className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-lg mb-2">
                Community Support
              </h4>
              <p className="text-sm text-gray-600">
                Assistance programs, welfare activities, and educational support services.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
