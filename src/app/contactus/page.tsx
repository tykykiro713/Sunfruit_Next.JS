'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ContactPage() {
  // Updated function to open Zendesk messaging
  const openZendeskMessaging = () => {
    if (window.zE) {
      window.zE('messenger', 'open');
    }
  };

  return (
    <div>
      <Navigation />
      
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
                    Have questions, feedback, or need assistance? <br />We&apos;re here to help!
                    Use the form below to get in touch with our team.
                  </p>
                  
                  <button
                    onClick={openZendeskMessaging}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
                  >
                    Open Contact Form
                  </button>
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