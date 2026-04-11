interface PageHeadingProps {
  title: string;
  shadowColor?: string;
}

export default function PageHeading({
  title,
  shadowColor = "rgba(168,85,247,0.5)",
}: PageHeadingProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
      `}</style>
      <div className="flex items-center gap-5 mb-16">
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))",
        }}
      />
      <h1
        className="text-3xl sm:text-4xl font-extrabold tracking-[0.16em] text-white whitespace-nowrap"
        style={{
          fontFamily: "'Syne', sans-serif",
          textShadow: `0 0 40px ${shadowColor}`,
        }}
      >
        {title}
      </h1>
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))",
        }}
      />
    </div>
    </>
  );
}
