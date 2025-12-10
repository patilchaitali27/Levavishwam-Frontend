import { useEffect, useState } from "react";
import { getInformation } from "../services/homeApi";

interface InfoItem {
  id: number;
  title: string;
  description: string;
}

export default function InformationSection() {
  const [info, setInfo] = useState<InfoItem | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getInformation();
        if (res.length > 0) setInfo(res[0]);
      } catch {}
    };
    load();
  }, []);

  return (
    <section id="information" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          {info?.title || "About Levavishwam"}
        </h2>

        {/* Decorative Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-10 rounded-full"></div>

        {/* Description */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {info?.description ||
            "Levavishwam is a united community built on culture, values, and togetherness."}
        </p>

      </div>
    </section>
  );
}
