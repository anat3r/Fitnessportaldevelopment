import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const slides = [
  {
    title: "Trójmiasto, Twoja mapa fitnessu",
    subtitle: "Bez tłumów, tylko efekty!",
    description: "Zobacz natężenie ruchu w siłowniach w czasie rzeczywistym i trenuj bez kolejek",
    gradient: "from-[#FF6F00] to-[#FF9800]"
  },
  {
    title: "Interaktywna mapa siłowni",
    subtitle: "Znajdź idealną siłownię dla siebie",
    description: "Filtruj według lokalizacji, rodzaju treningu i aktualnego obłożenia",
    gradient: "from-[#FF9800] to-[#FF6F00]"
  },
  {
    title: "Rezerwuj online",
    subtitle: "Zaplanuj swój trening z wyprzedzeniem",
    description: "Sprawdź dostępność i zarezerwuj miejsce w swojej ulubionej siłowni",
    gradient: "from-[#FF6F00] to-orange-600"
  }
];

export function HeroSlider({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={`h-full w-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center`}>
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="mb-4">{slide.title}</h1>
              <h2 className="mb-6">{slide.subtitle}</h2>
              <p className="max-w-2xl mx-auto mb-8 opacity-90">
                {slide.description}
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#FF6F00] hover:bg-gray-100" onClick={() => onNavigate('map')}>
                  Zobacz mapę
                </Button>
                <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-[#FF6F00]" onClick={() => onNavigate('about')}>
                  Dowiedz się więcej
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
