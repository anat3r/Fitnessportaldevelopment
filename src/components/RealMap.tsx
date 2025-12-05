import { useEffect, useRef } from "react";
import { type Gym } from "../data/gyms";

// Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

function getTrafficIcon(traffic: number) {
  if (traffic < 25) return "😎"; // Pusto - Cool, luz
  if (traffic < 50) return "🤗"; // Spokojnie - Przyjemnie
  if (traffic < 75) return "😅"; // Średnio - Trochę się robi
  return "🥵"; // Tłoczno - Gorąco od tłumu
}

function getTrafficColor(traffic: number) {
  if (traffic < 25) return "#22c55e"; // green-500
  if (traffic < 50) return "#3b82f6"; // blue-500
  if (traffic < 75) return "#eab308"; // yellow-500
  return "#ef4444"; // red-500
}

function getTrafficLabel(traffic: number) {
  if (traffic < 25) return "Pusto";
  if (traffic < 50) return "Spokojnie";
  if (traffic < 75) return "Średnio";
  return "Tłoczno";
}

interface RealMapProps {
  gyms: Gym[];
  selectedGym: Gym | null;
  onSelectGym: (gym: Gym | null) => void;
}

export function RealMap({ gyms, selectedGym, onSelectGym }: RealMapProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const isInitializedRef = useRef(false);

  // Initialize map only once
  useEffect(() => {
    if (isInitializedRef.current) return;

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapContainerRef.current || mapRef.current) return;

      const L = window.L;

      // Initialize map centered on Trójmiasto
      const map = L.map(mapContainerRef.current).setView([54.42, 18.58], 11);
      mapRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      isInitializedRef.current = true;
    }

    return () => {
      // Cleanup markers first
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => {
          try {
            if (marker && marker.remove) {
              marker.remove();
            }
          } catch (e) {
            // Ignore errors during cleanup
          }
        });
        markersRef.current = [];
      }
      
      // Then cleanup map
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          // Ignore errors during cleanup
        }
        mapRef.current = null;
      }
      
      isInitializedRef.current = false;
    };
  }, []); // Only run once on mount

  // Update markers when gyms change
  useEffect(() => {
    if (!mapRef.current || !window.L || !isInitializedRef.current) return;

    const L = window.L;

    // Clear existing markers safely
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        try {
          if (marker && marker.remove) {
            marker.remove();
          }
        } catch (e) {
          // Ignore errors during marker removal
        }
      });
      markersRef.current = [];
    }

    // Add new markers
    gyms.forEach((gym) => {
      const color = getTrafficColor(gym.traffic);
      const emoji = getTrafficIcon(gym.traffic);
      const label = getTrafficLabel(gym.traffic);

      // Create custom icon with emoji and color
      const customIcon = L.divIcon({
        html: `
          <div style="
            position: relative;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              position: absolute;
              width: 30px;
              height: 30px;
              background-color: ${color};
              border-radius: 50%;
              opacity: 0.3;
              transform: scale(1.5);
            "></div>
            <div style="
              position: relative;
              width: 30px;
              height: 30px;
              background-color: ${color};
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
            ">${emoji}</div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      try {
        const marker = L.marker([gym.lat, gym.lng], { icon: customIcon })
          .addTo(mapRef.current);

        // Create popup content
        const popupContent = `
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${gym.name}</h4>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
              ${gym.address}<br/>
              ${gym.city}
            </p>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-size: 12px;">
              <span style="
                padding: 2px 8px;
                background-color: ${color};
                color: white;
                border-radius: 4px;
                font-weight: 600;
              ">${label}</span>
              <span>${Math.round(gym.traffic)}% obłożenia</span>
            </div>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">
              🕐 Otwarte do ${gym.openUntil}
            </p>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Handle marker click
        marker.on('click', () => {
          onSelectGym(gym);
        });

        markersRef.current.push(marker);
      } catch (e) {
        console.error('Error creating marker:', e);
      }
    });
  }, [gyms, onSelectGym]);

  // Handle selected gym change
  useEffect(() => {
    if (!mapRef.current || !selectedGym || !isInitializedRef.current) return;

    const gymIndex = gyms.findIndex(g => g.id === selectedGym.id);
    if (gymIndex !== -1 && markersRef.current[gymIndex]) {
      try {
        mapRef.current.setView([selectedGym.lat, selectedGym.lng], 14);
        markersRef.current[gymIndex].openPopup();
      } catch (e) {
        console.error('Error handling selected gym:', e);
      }
    }
  }, [selectedGym, gyms]);

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg z-10">
        <div className="text-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>😎 Pusto (&lt;25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>🤗 Spokojnie (25-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>😅 Średnio (50-75%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>🥵 Tłoczno (&gt;75%)</span>
          </div>
        </div>
      </div>

      {/* Map container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px] relative z-0" />
    </div>
  );
}
