export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="relative">
        <span className="text-black">Fit</span>
        <span className="text-[#FF6F00]">Tracker</span>
        <div className="absolute -top-1 -right-2 w-2 h-2 bg-[#FF6F00] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
