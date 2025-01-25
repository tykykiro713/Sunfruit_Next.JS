export default function Perks() {
  return (
    <div className="bg-darkteal-500 relative z-0 lg:z-10">
      <h2 className="sr-only">Our perks</h2>
      <div className="mx-auto max-w-7xl divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-x lg:divide-y-0 lg:py-8">
        {/* Perk 1 */}
        <div className="py-8 lg:w-1/3 lg:flex-none lg:py-0">
          <div className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
            <svg
              className="size-8 shrink-0 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <div className="ml-4 flex flex-auto flex-col-reverse">
              <h3 className="font-medium text-white">10-year all-inclusive warranty</h3>
              <p className="text-sm text-white">We’ll replace it with a new one</p>
            </div>
          </div>
        </div>

        {/* Perk 2 */}
        <div className="py-8 lg:w-1/3 lg:flex-none lg:py-0">
          <div className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
            <svg
              className="size-8 shrink-0 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <div className="ml-4 flex flex-auto flex-col-reverse">
              <h3 className="font-medium text-white">Free shipping on returns</h3>
              <p className="text-sm text-white">Send it back for free</p>
            </div>
          </div>
        </div>

        {/* Perk 3 */}
        <div className="py-8 lg:w-1/3 lg:flex-none lg:py-0">
          <div className="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
            <svg
              className="size-8 shrink-0 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <div className="ml-4 flex flex-auto flex-col-reverse">
              <h3 className="font-medium text-white">Free, contactless delivery</h3>
              <p className="text-sm text-white">The shipping is on us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  