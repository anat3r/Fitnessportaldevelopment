import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrafficMap } from "./TrafficMap";
import { Calendar, MapPin, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";

export function MapPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Yoga Marathon Sopot",
      date: "28 Października 2025",
      time: "10:00 - 18:00",
      location: "Yoga Studio Sopot",
      type: "Yoga"
    },
    {
      id: 2,
      title: "CrossFit Competition",
      date: "2 Listopada 2025",
      time: "09:00 - 15:00",
      location: "CrossFit Sopot",
      type: "CrossFit"
    },
    {
      id: 3,
      title: "Trening z mistrzem - Siłownia",
      date: "5 Listopada 2025",
      time: "18:00 - 20:00",
      location: "Power Gym Gdynia",
      type: "Warsztat"
    },
    {
      id: 4,
      title: "Spinning Marathon",
      date: "10 Listopada 2025",
      time: "08:00 - 20:00",
      location: "City Fitness Gdańsk",
      type: "Cardio"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="mb-4">Mapa Trójmiasta</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interaktywna mapa z danymi o natężeniu ruchu w czasie rzeczywistym
        </p>
      </div>

      {/* Main Map */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#FF6F00]" />
            Natężenie ruchu w siłowniach - na żywo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TrafficMap />
        </CardContent>
      </Card>

      {/* Events Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-6 w-6 text-[#FF6F00]" />
          <h2>Nadchodzące wydarzenia i zajęcia</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge>{event.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <Card className="mt-12 bg-gradient-to-r from-[#FF6F00] to-[#FF9800] text-white border-0">
        <CardContent className="p-8">
          <h3 className="mb-4 text-white">Jak korzystać z mapy?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="mb-2 text-white">Kolory na mapie</h4>
              <p className="text-sm opacity-90">
                Zielony = Pusto, Niebieski = Spokojnie, Żółty = Średnio, Czerwony = Tłoczno
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-white">Aktualizacje</h4>
              <p className="text-sm opacity-90">
                Dane są aktualizowane w czasie rzeczywistym co 2-3 minuty
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-white">Szczegóły</h4>
              <p className="text-sm opacity-90">
                Kliknij na pin siłowni aby zobaczyć szczegółowe informacje i zarezerwować
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
