import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { populationData, countryData, ageDistributionData, urbanRuralData } from '../data/populationData';
import ChartSelector from './ChartSelector';
import StatisticsCards from './StatisticsCards';
import DataInsights from './DataInsights';

const Dashboard = () => {
  const [activeChart, setActiveChart] = useState('line');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const continentColors = {
    world: '#8884d8',
    asia: '#82ca9d',
    europe: '#ffc658',
    africa: '#ff7300',
    northAmerica: '#00ff7f',
    southAmerica: '#ff1493',
    oceania: '#1e90ff'
  };

  const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const chartTypes = [
    { id: 'line', name: 'Line Chart', description: 'Population trends over time' },
    { id: 'bar', name: 'Bar Chart', description: 'Population by countries' },
    { id: 'pie', name: 'Pie Chart', description: 'Age distribution' },
    { id: 'area', name: 'Area Chart', description: 'Continental population growth' },
    { id: 'scatter', name: 'Scatter Plot', description: 'Population vs Density' },
    { id: 'stacked', name: 'Stacked Area', description: 'Urban vs Rural population' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Global Population Trends (2000-2023)</h3>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Regions</option>
                <option value="world">World</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="europe">Europe</option>
                <option value="northAmerica">North America</option>
                <option value="southAmerica">South America</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={populationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${(value / 1e9).toFixed(1)}B`} />
                <Tooltip formatter={(value) => [`${(value / 1e9).toFixed(2)}B`, 'Population']} />
                <Legend />
                {selectedRegion === 'all' ? (
                  Object.keys(continentColors).map(region => (
                    <Line 
                      key={region} 
                      type="monotone" 
                      dataKey={region} 
                      stroke={continentColors[region]} 
                      strokeWidth={region === 'world' ? 3 : 2}
                      name={region.charAt(0).toUpperCase() + region.slice(1).replace(/([A-Z])/g, ' $1')}
                    />
                  ))
                ) : (
                  <Line 
                    type="monotone" 
                    dataKey={selectedRegion} 
                    stroke={continentColors[selectedRegion]} 
                    strokeWidth={3}
                    name={selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1).replace(/([A-Z])/g, ' $1')}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'bar':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Top 10 Countries by Population</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={countryData} margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="country" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  fontSize={12}
                />
                <YAxis tickFormatter={(value) => `${(value / 1e6).toFixed(0)}M`} />
                <Tooltip formatter={(value) => [`${(value / 1e6).toFixed(1)}M`, 'Population']} />
                <Bar dataKey="population" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'pie':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">World Population by Age Group</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={ageDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ ageGroup, percentage }) => `${ageGroup}: ${percentage}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {ageDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'area':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Continental Population Growth</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={populationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${(value / 1e9).toFixed(1)}B`} />
                <Tooltip formatter={(value) => [`${(value / 1e9).toFixed(2)}B`, 'Population']} />
                <Area type="monotone" dataKey="asia" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="africa" stackId="1" stroke="#ff7300" fill="#ff7300" />
                <Area type="monotone" dataKey="europe" stackId="1" stroke="#ffc658" fill="#ffc658" />
                <Area type="monotone" dataKey="northAmerica" stackId="1" stroke="#00ff7f" fill="#00ff7f" />
                <Area type="monotone" dataKey="southAmerica" stackId="1" stroke="#ff1493" fill="#ff1493" />
                <Area type="monotone" dataKey="oceania" stackId="1" stroke="#1e90ff" fill="#1e90ff" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'scatter':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Population vs Population Density</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="population" 
                  name="Population"
                  tickFormatter={(value) => `${(value / 1e6).toFixed(0)}M`}
                />
                <YAxis 
                  type="number" 
                  dataKey="density" 
                  name="Density"
                  tickFormatter={(value) => `${value}/km²`}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value, name) => [
                    name === 'population' ? `${(value / 1e6).toFixed(1)}M` : `${value}/km²`,
                    name === 'population' ? 'Population' : 'Density'
                  ]}
                  labelFormatter={(label, payload) => payload[0]?.payload?.country || ''}
                />
                <Scatter dataKey="density" fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'stacked':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Urban vs Rural Population Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={urbanRuralData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Area type="monotone" dataKey="rural" stackId="1" stroke="#ff7300" fill="#ff7300" />
                <Area type="monotone" dataKey="urban" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Population Data Analysis Dashboard</h1>
          <p className="text-gray-600 mb-8">Interactive visualization of global population trends and demographics</p>
          
          <ChartSelector 
            chartTypes={chartTypes}
            activeChart={activeChart}
            onChartChange={setActiveChart}
          />

          <div className="bg-gray-50 rounded-xl p-6">
            {renderChart()}
          </div>
        </div>

        <StatisticsCards />
        <DataInsights />
      </div>
    </div>
  );
};

export default Dashboard;