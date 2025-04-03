import React from 'react';

export default function Circle_Testimonial() {
  return (
    <div className="bg-gray-50 px-6 py-12 md:py-16 lg:py-24 w-full">
      <div className="max-w-7xl mx-auto lg:max-w-none lg:px-16 xl:px-24">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-poppins font-semibold text-emeraldgreen-500 text-center">
          Taste the difference with Sunfruit Organics
        </h2>

        {/* Content Section - Using grid instead of flex */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Image Section */}
          <div className="justify-self-center md:justify-self-end md:pr-4 lg:pr-6">
            <img
              src="/images/Happy_Family.png"
              alt="Smiling_woman"
              className="w-full h-auto rounded-full shadow-lg aspect-square object-cover max-w-lg mx-auto"
            />
          </div>

          {/* Text Section - Added mb-0 for mobile only spacing */}
          <div className="text-center md:text-left md:pl-4 lg:pl-6 mt-8 md:mt-2">
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700">
              &quot;Our family loves Sunfruit!<br /> 
              It tastes great, and helps me<br />
              stay on track with my health goals.<br />
              I also feel good giving it to my kids.&quot; <br />
              <br />
              -Brad R., Maine
            </p>
            <p className="mt-4 text-gray-600">
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
