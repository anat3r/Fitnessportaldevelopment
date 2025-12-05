import { HeroSlider } from "./HeroSlider";
import { TrafficMap } from "./TrafficMap";
import { MapPin, TrendingUp, Bell, Star, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-[#FF6F00]" />,
      title: "Interaktywna mapa siłowni",
      description: "Filtruj według lokalizacji i rodzaju treningu. Znajdź idealną siłownię w swojej okolicy."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#FF6F00]" />,
      title: "Natężenie ruchu w czasie rzeczywistym",
      description: "Zobacz ile osób jest teraz w siłowni. Trenuj bez kolejek i tłumów."
    },
    {
      icon: <Bell className="h-8 w-8 text-[#FF6F00]" />,
      title: "Powiadomienia o dostępności",
      description: "Otrzymuj alerty o zmianach w obłożeniu i dostępności ulubionych siłowni."
    },
    {
      icon: <Star className="h-8 w-8 text-[#FF6F00]" />,
      title: "Rekomendacje siłowni",
      description: "Personalizowane sugestie na podstawie Twoich preferencji treningowych."
    },
    {
      icon: <Filter className="h-8 w-8 text-[#FF6F00]" />,
      title: "Opinie użytkowników",
      description: "Sprawdź oceny i opinie innych użytkowników przed wyborem siłowni."
    },
    {
      icon: <Calendar className="h-8 w-8 text-[#FF6F00]" />,
      title: "Rezerwacje online",
      description: "Zaplanuj swój trening i zarezerwuj miejsce z wyprzedzeniem."
    }
  ];

  return (
    <div>
      <HeroSlider onNavigate={onNavigate} />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4">Dlaczego FitTracker?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jedyna platforma w Trójmieście oferująca dane o natężeniu ruchu w siłowniach w czasie rzeczywistym
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Mapa natężenia ruchu - na żywo</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Zobacz aktualne obłożenie siłowni w Trójmieście i zaplanuj swój trening
            </p>
          </div>
          <TrafficMap />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-[#FF6F00] to-[#FF9800] text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-white">Zacznij trenować mądrzej już dziś!</h2>
            <p className="mb-8 opacity-90 max-w-2xl mx-auto">
              Dołącz do tysięcy użytkowników, którzy optymalizują swoje treningi z FitTracker
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-white text-[#FF6F00] hover:bg-gray-100" onClick={() => onNavigate('gyms')}>
                Przeglądaj siłownie
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-[#FF6F00]" onClick={() => onNavigate('map')}>
                Zobacz mapę
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
