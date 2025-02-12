export default function HeroSection() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          {/* Hero Content */}
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500">
                Not sure which flavor to try? <br />
                Get FREE samples now!
              </h2>
              <p className="mt-4 text-gray-500">
                We'll ship you 10 samples for free, just pay $4 shipping. Receive 2 stick packs of
                each flavor. Samples ship in 24 hours.
              </p>
              <a
                href="#"
                className="mt-4 inline-block rounded-3xl bg-emeraldgreen-500 px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
              >
                Get FREE Samples*
              </a>
            </div>
            <img
              src="./images/Stick_Packs.png"
              alt="Stick Packs"
              className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="sm:flex lg:block">
              <div className="sm:shrink-0">
                <img
                  className="size-16"
                  src="/icons/icon-shipping-simple.svg"
                  alt="Free shipping icon"
                />
              </div>
              <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-sm font-medium text-gray-900">Free shipping</h3>
                <p className="mt-2 text-sm text-gray-500">
                  It&#039;s not actually free; we just price it into the products. Someone&#039;s
                  paying for it, and it&#039;s not us.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="sm:flex lg:block">
              <div className="sm:shrink-0">
                <img
                  className="size-16"
                  src="/icons/icon-warranty-simple.svg"
                  alt="Warranty icon"
                />
              </div>
              <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-sm font-medium text-gray-900">10-year warranty</h3>
                <p className="mt-2 text-sm text-gray-500">
                  If it breaks in the first 10 years, we&#039;ll replace it. After that, you&#039;re
                  on your own though.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="sm:flex lg:block">
              <div className="sm:shrink-0">
                <img
                  className="size-16"
                  src="/icons/icon-exchange-simple.svg"
                  alt="Exchange icon"
                />
              </div>
              <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-sm font-medium text-gray-900">Exchanges</h3>
                <p className="mt-2 text-sm text-gray-500">
                  If you don&#039;t like it, trade it to one of your friends for something of theirs.
                  Don&#039;t send it here though.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}