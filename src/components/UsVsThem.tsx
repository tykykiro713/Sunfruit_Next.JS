import React from 'react';

export default function ComparisonTable() {
  return (
    <div className="bg-custombeige-500 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-poppins font-semibold text-darkteal-500 sm:text-5xl">Us Vs Them</h2>
          <p className="mt-4 text-gray-700">
            Nuun Sport has the right balance of electrolytes for hydration bliss that fuels your every move. Here's how
            we stack up to other flavored electrolyte powders!
          </p>
        </div>

        {/* Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Nuun Sport Card */}
          <div className="bg-darkteal-500 text-white rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">Sunfruit Organic Drink Mixes</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <span className="text-3xl font-bold">5</span> electrolytes
                </li>
                <li>
                  <span className="text-3xl font-bold">1g</span> sugar
                </li>
                <li>
                  <span className="text-3xl font-bold">300mg</span> sodium
                </li>
                <li>
                  <span className="text-3xl font-bold">10</span> calories
                </li>
              </ul>
            </div>
            <button className="mt-6 px-4 py-2 bg-brightgreen-500 text-white font-bold rounded-full shadow-md hover:bg-brightgreen-600 transition">
              Shop Sunfruit
            </button>
          </div>

          {/* Gatorade Card */}
          <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold">Gatorade Thirst Quencher Powder</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <span className="text-3xl font-bold">3</span> electrolytes
                </li>
                <li>
                  <span className="text-3xl font-bold">32g</span> sugar
                </li>
                <li>
                  <span className="text-3xl font-bold">230mg</span> sodium
                </li>
                <li>
                  <span className="text-3xl font-bold">130</span> calories
                </li>
              </ul>
            </div>
          </div>

          {/* Liquid IV Card (Hidden on Mobile) */}
          <div className="hidden lg:block bg-white text-gray-900 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold">Liquid IV Hydration Multiplier Powder</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-3xl font-bold">3</span> electrolytes
              </li>
              <li>
                <span className="text-3xl font-bold">11g</span> sugar
              </li>
              <li>
                <span className="text-3xl font-bold">490-630mg</span> sodium
              </li>
              <li>
                <span className="text-3xl font-bold">40-50</span> calories
              </li>
            </ul>
          </div>

          {/* LMNT Card (Hidden on Mobile) */}
          <div className="hidden lg:block bg-white text-gray-900 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold">LMNT Electrolyte Powder</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-3xl font-bold">4</span> electrolytes
              </li>
              <li>
                <span className="text-3xl font-bold">0g</span> sugar
              </li>
              <li>
                <span className="text-3xl font-bold">1000mg</span> sodium
              </li>
              <li>
                <span className="text-3xl font-bold">5-10</span> calories
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
