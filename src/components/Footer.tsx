import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4 text-white" />
            <p className="text-gray-400 text-sm">
              Trójmiasto, Twoja mapa fitnessu – bez tłumów, tylko efekty!
            </p>
          </div>

          <div>
            <h3 className="mb-4">Nawigacja</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#FF6F00]">Strona główna</a></li>
              <li><a href="#" className="hover:text-[#FF6F00]">O nas</a></li>
              <li><a href="#" className="hover:text-[#FF6F00]">Siłownie</a></li>
              <li><a href="#" className="hover:text-[#FF6F00]">Mapa</a></li>
              <li><a href="#" className="hover:text-[#FF6F00]">Pomoc</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Pomoc</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#FF6F00]">FAQ</a></li>
              <li><a href="#" className="hover:text-[#FF6F00]">Kontakt</a></li>
              <li><a href="#" className="hover:text-[#FF6F00]">Instrukcje</a></li>
              <li><a href="#" className="hover:text-[#FF6F00]">Polityka prywatności</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Social Media</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#FF6F00] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6F00] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6F00] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6F00] transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">support@fittracker.pl</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 FitTracker. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
