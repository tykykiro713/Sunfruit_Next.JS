import React from 'react';

export default function Circle_Testimonial() {
  return (
    <div className="bg-white px-6 py-12 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-poppins font-semibold text-darkteal-500 text-center">
          What Diabetics Have to Say
        </h2>

        {/* Content Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Image Section */}
          <div className="flex-shrink-0 basis-1/2 max-w-lg">
            <img
              src="./images/Runner.webp" // Replace with your image path
              alt="Runner"
              className="w-full h-auto rounded-full shadow-lg aspect-square object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex-grow basis-1/2 text-center md:text-left max-w-lg">
            <p className="mt-2 text-lg md:text-xl font-semibold text-gray-700">
              <strong>Emma Coburn</strong>
              <br />
              World Champion Runner
              <br />
              <span className="font-semibold">Nuun Sponsored Brand Partner</span>
            </p>
            <p className="mt-4 text-gray-600">
              Not a day goes by that I skip my Nuun Sport, it’s crucial to my performance and recovery! I love all the
              flavors, but Strawberry Lemonade is my fav!
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
              <img
                src="./images/nuun-product.jpg" // Replace with your product image path
                alt="Nuun Sport"
                className="h-16 w-auto"
              />
              <div>
                <p className="text-sm font-medium text-gray-600">Recommends</p>
                <p className="text-indigo-600 font-bold">Nuun Sport</p>
                <p className="text-gray-700">⭐⭐⭐⭐⭐ 5/5</p>
              </div>
            </div>
            <button
              className="mt-6 px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-md hover:bg-pink-700 transition"
            >
              Shop Emma's Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

