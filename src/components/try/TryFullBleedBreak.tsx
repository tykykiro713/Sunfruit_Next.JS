import Image from 'next/image';

export default function TryFullBleedBreak() {
  return (
    <section
      aria-hidden="true"
      className="relative h-[40vh] w-full overflow-hidden bg-chewsyskin-500 sm:h-[55vh] lg:h-[65vh]"
    >
      {/* PLACEHOLDER: full-bleed lifestyle moment — someone pouring Sunfruit into a glass, sunlight, kitchen counter. Final asset goes in /public/images/try/lifestyle-break.jpg */}
      <Image
        src="/images/Kayak.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emeraldgreen-500/30 via-transparent to-transparent" />
      <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-12">
        <p className="max-w-xl font-poppins text-2xl font-semibold leading-tight text-white drop-shadow-lg sm:text-3xl md:text-4xl">
          A daily drink, finally clean enough to drink daily.
        </p>
      </div>
    </section>
  );
}
