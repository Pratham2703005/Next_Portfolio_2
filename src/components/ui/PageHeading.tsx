interface PageHeadingProps {
  title: string;
  shadowColor?: string;
}

export default function PageHeading({
  title,
  shadowColor = "rgba(168,85,247,0.5)",
}: PageHeadingProps) {
  // Split title by spaces to allow responsive wrapping
  const titleWords = title.split(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
      `}</style>
      <div className="flex items-center gap-5 mb-16">
        <div
          className="hidden sm:flex flex-1 h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))",
          }}
        />
        <h1
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[0.16em] text-white flex flex-wrap justify-center items-center gap-2 sm:gap-3"
          style={{
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {titleWords.map((word, index) => (
            <span
              key={index}
              style={{
                textShadow: `0 0 40px ${shadowColor}`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>
        <div
          className="hidden sm:flex flex-1 h-px"
          style={{
            background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))",
          }}
        />
      </div>
    </>
  );
}
