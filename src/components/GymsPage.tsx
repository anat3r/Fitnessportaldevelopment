import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, MapPin, Clock, Star, Calendar, Users, Dumbbell, Phone, Globe } from "lucide-react";
import { TrafficMap } from "./TrafficMap";
import { gymsData } from "../data/gyms";

export function GymsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredGyms = gymsData.filter(gym => {
    const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || gym.city === selectedCity;
    const matchesType = selectedType === "all" || gym.type === selectedType;
    return matchesSearch && matchesCity && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="mb-4">Siłownie w Trójmieście</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Znajdź idealną siłownię dla siebie i sprawdź aktualne natężenie ruchu
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Szukaj siłowni..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Miasto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie miasta</SelectItem>
                <SelectItem value="Gdańsk">Gdańsk</SelectItem>
                <SelectItem value="Gdynia">Gdynia</SelectItem>
                <SelectItem value="Sopot">Sopot</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Typ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie typy</SelectItem>
                <SelectItem value="Siłownia">Siłownia</SelectItem>
                <SelectItem value="CrossFit">CrossFit</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Pilates">Pilates</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Map Section */}
      <div className="mb-12">
        <h2 className="mb-6">Mapa z natężeniem ruchu</h2>
        <TrafficMap />
      </div>

      {/* Gym List */}
      <div className="mb-8">
        <h2 className="mb-6">Wszystkie siłownie ({filteredGyms.length})</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredGyms.map((gym) => (
            <Card key={gym.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{gym.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{gym.address}, {gym.city}</span>
                      </div>
                    </div>
                  </div>
                  <Badge>{gym.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Traffic */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-1">
                      <span className="text-base">
                        {gym.traffic < 25 ? "😎" : gym.traffic < 50 ? "🤗" : gym.traffic < 75 ? "😅" : "🥵"}
                      </span>
                      Aktualne natężenie ruchu
                    </span>
                    <span className="text-sm flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {gym.traffic}%
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        gym.traffic > 75 ? "bg-red-500" :
                        gym.traffic > 50 ? "bg-yellow-500" :
                        gym.traffic > 25 ? "bg-blue-500" : "bg-green-500"
                      }`}
                      style={{ width: `${gym.traffic}%` }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Otwarte do {gym.openUntil}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{gym.rating} ({gym.reviews})</span>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <Dumbbell className="h-4 w-4 text-[#FF6F00]" />
                    <span>Sprzęt</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {gym.equipment.slice(0, 4).map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                    ))}
                    {gym.equipment.length > 4 && (
                      <Badge variant="secondary" className="text-xs">+{gym.equipment.length - 4}</Badge>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                {(gym.phone || gym.website) && (
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                    {gym.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{gym.phone}</span>
                      </div>
                    )}
                    {gym.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span>{gym.website}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-[#FF6F00]">{gym.price}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Szczegóły
                    </Button>
                    <Button size="sm" className="bg-[#FF6F00] hover:bg-[#FF9800]">
                      <Calendar className="h-4 w-4 mr-1" />
                      Rezerwuj
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
