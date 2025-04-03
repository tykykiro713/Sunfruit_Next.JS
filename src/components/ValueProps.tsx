import React from 'react';

const valueProps = [
  { text: '100% ORGANIC' },
  { text: 'SUGAR-FREE' },
  { text: 'SODIUM-FREE' },
  { text: 'NON-GMO' },
  { text: 'PREBIOTIC' },
  { text: 'NO PRESERVATIVES' },
];

export default function ValueProps() {
  return (
    <div className="bg-yellow-300 py-8 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-center gap-4">
        {valueProps.map((prop, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap text-gray-900 text-lg font-semibold"
          >
            <span className="text-green-600">&#10003;</span> {/* Check mark */}
            <span>{prop.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


