import { Menu, Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

export function Header({ 
  currentPage, 
  onNavigate,
  darkMode,
  toggleDarkMode 
}: { 
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Strona główna" },
    { 
      id: "about", 
      label: "O nas",
      submenu: ["O projekcie", "Misja i wizja", "Zespół", "Współprace"]
    },
    { 
      id: "gyms", 
      label: "Siłownie",
      submenu: ["Wyszukaj siłownię", "Rezerwacje", "Siłownie w Trójmieście"]
    },
    { 
      id: "map", 
      label: "Mapa",
      submenu: ["Mapa Trójmiasta", "Natężenie ruchu", "Wydarzenia i zajęcia"]
    },
    { 
      id: "help", 
      label: "Pomoc",
      submenu: ["FAQ", "Kontakt", "Instrukcje"]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => onNavigate("home")} className="flex items-center">
            <Logo />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 overflow-x-auto">
            {menuItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 transition-colors whitespace-nowrap ${
                    currentPage === item.id
                      ? "text-[#FF6F00]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#FF6F00]"
                  }`}
                >
                  {item.label}
                </button>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem, idx) => (
                      <button
                        key={idx}
                        className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#FF6F00]"
                        onClick={() => onNavigate(item.id)}
                      >
                        {subitem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          onNavigate(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left w-full px-2 py-2 ${
                          currentPage === item.id
                            ? "text-[#FF6F00]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.label}
                      </button>
                      {item.submenu && (
                        <div className="ml-4 mt-2 flex flex-col gap-2">
                          {item.submenu.map((subitem, idx) => (
                            <button
                              key={idx}
                              className="text-left text-gray-600 dark:text-gray-400 hover:text-[#FF6F00]"
                              onClick={() => {
                                onNavigate(item.id);
                                setMobileMenuOpen(false);
                              }}
                            >
                              {subitem}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
