'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ZendeskButton from '@/components/ZendeskButton';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      {/* Hero section with image background */}
      <div className="w-full relative h-64 sm:h-80 md:h-96 lg:h-[400px]">
        <Image
          src="/images/lemontree.png" 
          alt="Contact Sunfruit"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Get In Touch
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl max-w-3xl drop-shadow-md">
            We&apos;re here to help! Click below to contact us now. 
          </p>
        </div>
      </div>
      
      {/* Contact Us section - using your original implementation but with ZendeskButton */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Updated heading to match the About Us page heading style */}
            <div className="text-left mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-emeraldgreen-500 leading-tight">
                Contact Us
              </h1>
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-8">
                    Have questions, feedback, or need assistance? <br />We&apos;d love to hear from you!
                    Click below to get in touch with our team.
                  </p>
                  
                  {/* Using our reusable ZendeskButton component */}
                  <ZendeskButton>
                    Contact Us
                  </ZendeskButton>
                </div>
                
                <div className="mt-10 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-8">                  
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-medium text-gray-900">Customer Support Hours</h3>
                    <p className="mt-4 text-gray-500">
                      <span className="block">Monday - Friday: 9am to 5pm EST</span>
                      <span className="block">Saturday: 10am to 2pm EST</span>
                      <span className="block">Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}