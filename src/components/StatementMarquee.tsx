const words = ["Strategy", "Creative", "Media", "Performance", "Growth"];

const colors = ["#8b5cf6", "#a855f7", "#c026d3", "#1a0f24"];

export default function StatementMarquee() {
  const loop = [...words, ...words, ...words];

  return (
    <section
      className="overflow-hidden border-y border-gray-200 bg-white py-10 lg:py-14"
      aria-hidden
    >
      <div className="animate-marquee flex w-max items-center gap-10 lg:gap-16">
        {loop.map((word, i) => {
          const color = colors[i % colors.length];
          const filled = i % 2 === 1;
          return (
            <span
              key={`${word}-${i}`}
              className="flex shrink-0 items-center gap-10 lg:gap-16"
            >
              <span
                className="font-[family-name:var(--font-display)] text-6xl font-bold uppercase leading-none tracking-tight lg:text-8xl"
                style={
                  filled
                    ? { color }
                    : { color: "transparent", WebkitTextStroke: `1.5px ${color}` }
                }
              >
                {word}
              </span>
              <span
                className="h-2 w-2 shrink-0 rounded-full lg:h-3 lg:w-3"
                style={{ backgroundColor: color, opacity: 0.6 }}
              />
            </span>
          );
        })}
      </div>
    </section>
  );
}
