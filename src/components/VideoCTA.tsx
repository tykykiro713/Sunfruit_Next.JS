export default function VideoCTA() {
  return (
    <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center z-10 py-12 md:py-20 min-h-[600px]">
      {/* Video Section - Will show first on mobile, second on desktop */}
      <div className="order-first mb-8 sm:order-last sm:mb-0">
        <video
          className="h-full w-full object-cover sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Lemonade_Creation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Section */}
      <div className="p-8 md:p-12 lg:px-16 lg:py-24 order-last sm:order-first">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Elevate your water with organic flavors
          </h2>

          <p className="mt-6 text-xl/8 text-gray-600">
            Sunfruit combines organic fruits and botanicals to create naturally flavorful water. No sugar, sodium, preservatives, fillers... only the
            good stuff.
          </p>
          <div className="mt-4 md:mt-8">
            <a
              href="#samples"
              className="mt-4 inline-block rounded-3xl bg-emeraldgreen-500 px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
            >
              Get FREE Samples*
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
