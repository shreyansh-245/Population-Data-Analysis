import React from 'react';
import { globalStats } from '../data/populationData';

const StatisticsCards = () => {
  const formatPopulation = (pop) => {
    return (pop / 1e9).toFixed(2) + 'B';
  };

  const stats = [
    {
      title: 'World Population 2023',
      value: formatPopulation(globalStats.worldPopulation2023),
      subtitle: `+${globalStats.growthRate}% from 2022`,
      color: 'text-blue-600'
    },
    {
      title: 'Most Populous Continent',
      value: globalStats.mostPopulousContinent,
      subtitle: `${globalStats.asiaPercentage}% of world population`,
      color: 'text-green-600'
    },
    {
      title: 'Urban Population',
      value: `${globalStats.urbanPercentage}%`,
      subtitle: '4.62B people',
      color: 'text-purple-600'
    },
    {
      title: 'Growth Rate',
      value: `+${globalStats.growthRate}%`,
      subtitle: 'Annual global rate',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.title}</h3>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;