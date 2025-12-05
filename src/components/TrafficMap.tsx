import { MapPin, Users, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { gymsData, type Gym } from "../data/gyms";
import { RealMap } from "./RealMap";

function getTrafficIcon(traffic: number) {
  if (traffic < 25) return "😎"; // Pusto
  if (traffic < 50) return "🤗"; // Spokojnie
  if (traffic < 75) return "😅"; // Średnio
  return "🥵"; // Tłoczno
}

function getTrafficColor(traffic: number) {
  if (traffic < 25) return "bg-green-500";
  if (traffic < 50) return "bg-blue-500";
  if (traffic < 75) return "bg-yellow-500";
  return "bg-red-500";
}

function getTrafficLabel(traffic: number) {
  if (traffic < 25) return "Pusto";
  if (traffic < 50) return "Spokojnie";
  if (traffic < 75) return "Średnio";
  return "Tłoczno";
}

export function TrafficMap() {
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [activeGyms, setActiveGyms] = useState(gymsData);

  // Simulate real-time traffic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGyms(prev => prev.map(gym => ({
        ...gym,
        traffic: Math.max(0, Math.min(100, gym.traffic + (Math.random() - 0.5) * 10))
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Real Map */}
      <div className="relative">
        <RealMap 
          gyms={activeGyms} 
          selectedGym={selectedGym} 
          onSelectGym={setSelectedGym}
        />
      </div>

      {/* Gym List */}
      <div className="space-y-4">
        <h3>Siłownie w Trójmieście</h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {activeGyms.map((gym) => (
            <Card
              key={gym.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedGym?.id === gym.id ? "ring-2 ring-[#FF6F00]" : ""
              }`}
              onClick={() => setSelectedGym(gym)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getTrafficIcon(gym.traffic)}</span>
                    <h4 className="text-sm">{gym.name}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{gym.address}, {gym.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Otwarte do {gym.openUntil}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={gym.traffic > 75 ? "destructive" : "secondary"} className="mb-2">
                    {getTrafficLabel(gym.traffic)}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs">
                    <Users className="h-3 w-3" />
                    <span>{Math.round(gym.traffic)}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${getTrafficColor(gym.traffic)} transition-all duration-500`}
                  style={{ width: `${gym.traffic}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
