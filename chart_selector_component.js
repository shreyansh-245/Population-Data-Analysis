import React from 'react';

const ChartSelector = ({ chartTypes, activeChart, onChartChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {chartTypes.map((chart) => (
        <button
          key={chart.id}
          onClick={() => onChartChange(chart.id)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
            activeChart === chart.id
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <div className="font-semibold text-sm">{chart.name}</div>
          <div className="text-xs text-gray-500 mt-1">{chart.description}</div>
        </button>
      ))}
    </div>
  );
};

export default ChartSelector;