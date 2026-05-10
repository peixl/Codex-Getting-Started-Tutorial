export function AuroraBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-[10%] top-[-20%] h-[38rem] w-[38rem] rounded-full bg-[#C5D5FF] opacity-40 blur-[120px] animate-drift" />
      <div className="absolute -right-[10%] top-[20%] h-[32rem] w-[32rem] rounded-full bg-[#FFD7E4] opacity-30 blur-[130px] animate-drift [animation-delay:-8s]" />
      <div className="absolute bottom-[-25%] left-[25%] h-[42rem] w-[42rem] rounded-full bg-[#D8EFFF] opacity-35 blur-[150px] animate-drift [animation-delay:-14s]" />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
