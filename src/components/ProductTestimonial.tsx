import React from 'react';

// Define the props interface
interface ProductTestimonialProps {
  image?: string;
  alt?: string;
  quote?: string;
  author?: string;
  location?: string;
  title?: string;
}

export default function ProductTestimonial({
  image = "/images/Testimonial.jpg",
  alt = "Smiling_woman",
  quote = "Our family loves Sunfruit!\nIt tastes great, and helps me\nstay on track with my health goals.\nI also feel good giving it to my kids.",
  author = "Brad R.",
  location = "Maine",
  title = "Taste the difference with Sunfruit Organics"
}: ProductTestimonialProps) {
  
  // Convert newlines in quote to <br /> tags
  const formattedQuote = quote.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < quote.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="bg-gray-50 px-6 py-12 md:py-16 lg:py-24 w-full">
      <div className="max-w-7xl mx-auto lg:max-w-none lg:px-16 xl:px-24">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-poppins font-semibold text-emeraldgreen-500 text-center">
          {title}
        </h2>

        {/* Content Section - Using grid instead of flex */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Image Section */}
          <div className="justify-self-center md:justify-self-end md:pr-4 lg:pr-6">
            <img
              src={image}
              alt={alt}
              className="w-full h-auto rounded-full shadow-lg aspect-square object-cover max-w-lg mx-auto"
            />
          </div>

          {/* Text Section - Added mb-0 for mobile only spacing */}
          <div className="text-center md:text-left md:pl-4 lg:pl-6 mt-8 md:mt-2">
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700">
              &quot;{formattedQuote}&quot; <br />
              <br />
              -{author}, {location}
            </p>
            <p className="mt-4 text-gray-600">
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}