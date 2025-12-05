import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Target, Users, Handshake, Zap } from "lucide-react";

export function AboutPage() {
  const team = [
    { name: "Natalia Kamińska", role: "CEO & CTO", description: "Wizjoner technologii i lider zespołu" },
    { name: "Ruslan Bedychev", role: "Lead Developer & Designer", description: "Architekt rozwiązań i kreator designu" }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-[#FF6F00]" />,
      title: "Nasza misja",
      description: "Umożliwiamy mieszkańcom Trójmiasta optymalizację treningów poprzez dostęp do danych o natężeniu ruchu w siłowniach w czasie rzeczywistym. Chcemy, aby każdy mógł trenować efektywnie, bez stresu związanego z tłumem."
    },
    {
      icon: <Zap className="h-8 w-8 text-[#FF6F00]" />,
      title: "Nasza wizja",
      description: "Być numerem jeden w Trójmieście jeśli chodzi o platformy fitness tech. Rozwijamy się, aby w przyszłości objąć cały kraj i pomóc milionom ludzi w realizacji ich celów treningowych."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="mb-4">O FitTracker</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Jesteśmy pierwszą platformą w Trójmieście oferującą dane o natężeniu ruchu w siłowniach w czasie rzeczywistym
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {values.map((value, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mb-4">{value.icon}</div>
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About Project */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-[#FF6F00]" />
              O projekcie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              FitTracker to innowacyjna platforma łącząca fitness z nowoczesnymi technologiami lokalizacyjnymi. 
              Powstała z potrzeby rozwiązania problemu, z którym boryka się większość osób trenujących - 
              zatłoczone siłownie w godzinach szczytu.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Dzięki integracji z systemami siłowni oraz wykorzystaniu zaawansowanych algorytmów, 
              dostarczamy użytkownikom dane w czasie rzeczywistym o tym, jak wiele osób aktualnie 
              trenuje w danej lokalizacji. To pozwala zaplanować trening w optymalnym czasie i 
              uniknąć frustracji związanej z kolejkami do sprzętu.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Nasza platforma to nie tylko mapa - to kompleksowe narzędzie do zarządzania aktywnością 
              fizyczną, które obejmuje rezerwacje, opinie użytkowników, personalizowane rekomendacje 
              i powiadomienia o zmianach w dostępności.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Team */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="mb-4">Nasz zespół</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Poznaj ludzi, którzy tworzą FitTracker
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-[#FF6F00] to-[#FF9800] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#FF6F00] mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partnerships */}
      <section>
        <Card className="bg-gradient-to-r from-[#FF6F00] to-[#FF9800] text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Handshake className="h-6 w-6" />
              Współprace
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="opacity-90">
              Współpracujemy z ponad 50 siłowniami w Trójmieście, aby dostarczyć Ci najlepsze 
              doświadczenie treningowe. Jesteśmy otwarci na nowe partnerstwa!
            </p>
            <p className="opacity-90">
              Jeśli prowadzisz siłownię i chcesz dołączyć do FitTracker, skontaktuj się z nami. 
              Oferujemy bezpłatną integrację oraz wsparcie marketingowe dla naszych partnerów.
            </p>
            <p className="opacity-90">
              Współpracujemy również z trenerami personalnymi, dietetykami oraz markami fitness, 
              tworząc kompleksowy ekosystem dla aktywnych mieszkańców Trójmiasta.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
