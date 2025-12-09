import { Users, Target, Globe, Award, Calendar, Building } from "lucide-react";

export default function InformationSection() {
  return (
    <section id="information" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
              <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            About Levavishwam
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A dedicated community committed to preserving heritage and fostering unity
          </p>
        </div>

        {/* Simple Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600">Active Members</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">25+</p>
              <p className="text-sm text-gray-600">Years Serving</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600">Annual Events</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* About Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Our Community</h3>
                <p className="text-gray-600">Established in 1995</p>
              </div>
            </div>

            <div className="prose prose-lg text-gray-700 space-y-6">
              <p>
                Levavishwam is a vibrant community organization established in 1995 with a rich history 
                of bringing people together. For over 25 years, we have served as a central hub for 
                cultural preservation, social activities, and community development.
              </p>
              
              <p>
                Our community comprises more than 500 families who actively participate in various 
                programs and initiatives. Throughout the year, we organize more than 50 events including 
                cultural festivals, educational workshops, sports tournaments, and social gatherings 
                that strengthen community bonds.
              </p>
              
              <p>
                The community center serves as our primary venue for activities, providing a space 
                for members to connect, learn, and celebrate together. We are committed to maintaining 
                our cultural heritage while embracing modern values and practices that benefit all 
                community members.
              </p>
              
              <p>
                Levavishwam's activities are managed by a dedicated committee of 12 members who 
                volunteer their time to ensure smooth operations and meaningful engagement for all. 
                Our focus remains on creating an inclusive environment where every member feels 
                valued and connected.
              </p>
            </div>
          </div>

         
          {/* Community Activities */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Community Activities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cultural Events</h4>
                <p className="text-sm text-gray-600">
                  Annual festivals, traditional celebrations, and cultural performances
                </p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Social Programs</h4>
                <p className="text-sm text-gray-600">
                  Community gatherings, youth activities, and family events
                </p>
              </div>
              
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Support</h4>
                <p className="text-sm text-gray-600">
                  Educational assistance, welfare programs, and member support services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}