import { useState, useEffect } from "react";
import { Type, Contrast, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function AccessibilityControls() {
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'normal' | 'large' | null;
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedHighContrast) setHighContrast(savedHighContrast);
  }, []);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-small', 'text-normal', 'text-large');
    root.classList.add(`text-${fontSize}`);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Apply high contrast to document
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  const resetSettings = () => {
    setFontSize('normal');
    setHighContrast(false);
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
  };

  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    if (fontSize === 'small') setFontSize('normal');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('small');
    if (fontSize === 'large') setFontSize('normal');
  };

  return (
    <TooltipProvider>
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2">
        {/* Toggle button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          variant="outline"
          className="bg-white shadow-lg hover:bg-[#F5F5F5] border-2 border-[#FF6F00] rounded-full w-12 h-12"
          aria-label="Dostępność"
        >
          <Type className="h-5 w-5 text-[#FF6F00]" />
        </Button>

        {/* Controls panel */}
        {isOpen && (
          <div className="bg-white shadow-xl rounded-lg p-4 border-2 border-[#FF6F00] w-64">
            <h3 className="mb-3 text-[#FF6F00]">Ustawienia dostępności</h3>
            
            {/* Font size controls */}
            <div className="mb-4">
              <p className="text-sm text-[#9E9E9E] mb-2">Rozmiar tekstu</p>
              <div className="flex gap-2 justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={decreaseFontSize}
                      size="sm"
                      variant={fontSize === 'small' ? 'default' : 'outline'}
                      disabled={fontSize === 'small'}
                      className={fontSize === 'small' ? 'bg-[#FF6F00] hover:bg-[#FF9800]' : ''}
                      aria-label="Zmniejsz tekst"
                    >
                      <Type className="h-3 w-3" />
                      <span className="ml-1">A-</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zmniejsz tekst</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setFontSize('normal')}
                      size="sm"
                      variant={fontSize === 'normal' ? 'default' : 'outline'}
                      className={fontSize === 'normal' ? 'bg-[#FF6F00] hover:bg-[#FF9800]' : ''}
                      aria-label="Normalny tekst"
                    >
                      <Type className="h-4 w-4" />
                      <span className="ml-1">A</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Normalny tekst</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={increaseFontSize}
                      size="sm"
                      variant={fontSize === 'large' ? 'default' : 'outline'}
                      disabled={fontSize === 'large'}
                      className={fontSize === 'large' ? 'bg-[#FF6F00] hover:bg-[#FF9800]' : ''}
                      aria-label="Zwiększ tekst"
                    >
                      <Type className="h-5 w-5" />
                      <span className="ml-1">A+</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zwiększ tekst</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* High contrast toggle */}
            <div className="mb-4">
              <p className="text-sm text-[#9E9E9E] mb-2">Kontrast</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setHighContrast(!highContrast)}
                    size="sm"
                    variant={highContrast ? 'default' : 'outline'}
                    className={`w-full ${highContrast ? 'bg-[#FF6F00] hover:bg-[#FF9800]' : ''}`}
                    aria-label={highContrast ? 'Wyłącz wysoki kontrast' : 'Włącz wysoki kontrast'}
                  >
                    <Contrast className="h-4 w-4 mr-2" />
                    {highContrast ? 'Wyłącz kontrast' : 'Wysoki kontrast'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {highContrast ? 'Wyłącz wysoki kontrast' : 'Włącz wysoki kontrast'}
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Reset button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={resetSettings}
                  size="sm"
                  variant="outline"
                  className="w-full border-[#9E9E9E] text-[#9E9E9E] hover:bg-[#F5F5F5]"
                  aria-label="Resetuj ustawienia"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Resetuj
                </Button>
              </TooltipTrigger>
              <TooltipContent>Przywróć domyślne ustawienia</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
