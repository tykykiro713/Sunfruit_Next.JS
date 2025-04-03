export default function SampleCTA() {
  return (
    <div id="samples" className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          {/* Hero Content */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="text-2xl md:text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500">
                Not sure which flavor to try? <br />
                Get FREE samples now!
              </h2>
              <p className="mt-4 text-xl/8 text-gray-500">
                We&apos;ll ship you 8 samples for free. Receive 2 stick packs of
                each flavor, just pay $4 shipping.  Samples ship today!
              </p>
              <a
                href="#"
                className="mt-6 inline-block rounded-3xl bg-emeraldgreen-500 px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
              >
                Get FREE Samples*
              </a>
            </div>
            <img
              src="/images/Stick_Packs.png"
              alt="Stick Packs"
              className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}