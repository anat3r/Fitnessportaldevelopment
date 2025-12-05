import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Mail, Phone, MapPin, HelpCircle, Book } from "lucide-react";

export function HelpPage() {
  const faqs = [
    {
      question: "Jak działa śledzenie natężenia ruchu w siłowniach?",
      answer: "Współpracujemy z siłowniami, które udostępniają nam dane z systemów wejścia. Dzięki temu w czasie rzeczywistym możemy pokazać, ile osób aktualnie trenuje w danej lokalizacji. Dane są aktualizowane co kilka minut."
    },
    {
      question: "Czy muszę płacić za korzystanie z FitTracker?",
      answer: "Podstawowe funkcje FitTracker, w tym mapa natężenia ruchu i wyszukiwanie siłowni, są całkowicie darmowe. Oferujemy również wersję Premium z dodatkowymi funkcjami jak zaawansowane powiadomienia i priorytetowe rezerwacje."
    },
    {
      question: "Jak mogę zarezerwować miejsce w siłowni?",
      answer: "Wybierz interesującą Cię siłownię z mapy lub listy, kliknij przycisk 'Rezerwuj', wybierz termin i godzinę. Otrzymasz potwierdzenie rezerwacji na email i w aplikacji."
    },
    {
      question: "Co jeśli dane o natężeniu ruchu są niedokładne?",
      answer: "Jeśli zauważysz rozbieżność, możesz to zgłosić przez formularz kontaktowy. Prosimy też o podanie nazwy siłowni i godziny, w której wystąpiła nieścisłość. Stale pracujemy nad poprawą dokładności danych."
    },
    {
      question: "Czy mogę dodać swoją siłownię do FitTracker?",
      answer: "Tak! Skontaktuj się z nami przez formularz poniżej lub wyślij email na adres partnerships@fittracker.pl. Oferujemy bezpłatną integrację dla nowych partnerów."
    },
    {
      question: "Czy FitTracker ma aplikację mobilną?",
      answer: "Aktualnie pracujemy nad aplikacją mobilną na iOS i Android. Tymczasem nasza strona jest w pełni responsywna i działa świetnie na wszystkich urządzeniach mobilnych."
    },
    {
      question: "Jak mogę włączyć powiadomienia?",
      answer: "W ustawieniach konta możesz skonfigurować powiadomienia email lub push (gdy udostępnimy aplikację). Wybierz swoje ulubione siłownie i określ, o jakich wydarzeniach chcesz być informowany."
    },
    {
      question: "Czy moje dane są bezpieczne?",
      answer: "Tak, bezpieczeństwo danych użytkowników jest dla nas priorytetem. Stosujemy szyfrowanie danych, nie udostępniamy informacji osobowych stronom trzecim i przestrzegamy RODO."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="mb-4">Pomoc i wsparcie</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Znajdź odpowiedzi na najczęściej zadawane pytania lub skontaktuj się z nami
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-[#FF6F00]" />
                Najczęściej zadawane pytania (FAQ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6 text-[#FF6F00]" />
                Instrukcje korzystania z platformy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2">Jak znaleźć siłownię?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Przejdź do zakładki "Mapa" lub "Siłownie", użyj filtrów aby wybrać miasto i typ siłowni. 
                  Możesz również wpisać nazwę lub adres w wyszukiwarce.
                </p>
              </div>
              <div>
                <h4 className="mb-2">Jak sprawdzić natężenie ruchu?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Na mapie siłownie są oznaczone kolorami: zielony = pusto, niebieski = spokojnie, 
                  żółty = średnio, czerwony = tłoczno. Kliknij na siłownię aby zobaczyć dokładny procent obłożenia.
                </p>
              </div>
              <div>
                <h4 className="mb-2">Jak zarezerwować miejsce?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wybierz siłownię, kliknij przycisk "Rezerwuj", wybierz datę i godzinę. 
                  Po zalogowaniu się otrzymasz potwierdzenie rezerwacji.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dane kontaktowe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#FF6F00] mt-1" />
                <div>
                  <p className="text-sm">Email</p>
                  <a href="mailto:support@fittracker.pl" className="text-[#FF6F00] hover:underline">
                    support@fittracker.pl
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#FF6F00] mt-1" />
                <div>
                  <p className="text-sm">Telefon</p>
                  <a href="tel:+48123456789" className="text-[#FF6F00] hover:underline">
                    +48 123 456 789
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#FF6F00] mt-1" />
                <div>
                  <p className="text-sm">Adres</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    ul. Przykładowa 123<br />
                    80-001 Gdańsk
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Formularz kontaktowy</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Twoje imię" />
                </div>
                <div>
                  <Input type="email" placeholder="Twój email" />
                </div>
                <div>
                  <Input placeholder="Temat" />
                </div>
                <div>
                  <Textarea placeholder="Wiadomość" rows={5} />
                </div>
                <Button className="w-full bg-[#FF6F00] hover:bg-[#FF9800]">
                  Wyślij wiadomość
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
