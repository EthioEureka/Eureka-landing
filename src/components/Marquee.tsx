"use client";

interface MarqueeProps {
  items?: string[];
  speed?: "normal" | "slow";
  reverse?: boolean;
}

export default function Marquee({
  items = [
    "WEBSITE DESIGN & DEV",
    "BRAND IDENTITY",
    "CONTENT MANAGEMENT",
    "SOCIAL MEDIA STRATEGY",
    "GRAPHIC DESIGN",
    "ETHIOPIA → THE WORLD",
  ],
  speed = "normal",
  reverse = false,
}: MarqueeProps) {
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-border-gray/50 py-4 bg-deep-black/60 backdrop-blur-sm select-none">
      <div
        className={`flex whitespace-nowrap gap-8 ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {marqueeItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-mono text-soft-gray hover:text-eureka-green transition-colors">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-eureka-green/80" />
          </div>
        ))}
      </div>
    </div>
  );
}
