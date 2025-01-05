import React from 'react';
import { Chart } from 'react-google-charts';

const ChoroplethMap = () => {
  // Static data for the Philippine map
  const staticPhilippineData = [
    ['Region', 'Value'], // Header row
    ['PH-00', 200], // NCR (National Capital Region)
    ['PH-01', 150], // Ilocos Region
    ['PH-02', 120], // Cagayan Valley
    ['PH-03', 100], // Central Luzon
    ['PH-04', 80],  // CALABARZON
    ['PH-05', 90],  // Bicol Region
    ['PH-06', 70],  // Western Visayas
    ['PH-07', 60],  // Central Visayas
    ['PH-08', 50],  // Eastern Visayas
    ['PH-09', 40],  // Zamboanga Peninsula
    ['PH-11', 100],  // Davao Region
  ];

  const options = {
    region: 'PH', // Show the map of the Philippines
    displayMode: 'regions', // Highlight regions
    colorAxis: { colors: ['#ffffff', '#3b6394'] }, // Color gradient
    backgroundColor: getComputedStyle(document.documentElement)
      .getPropertyValue('--secondary-color')
      .trim(),
    resolution: 'provinces', // Focus on regions/provinces
    magnifyingGlass: { enable: true, zoomFactor: 2 }, // Enable zooming
    width: '100%',
    height: '800px',
    legend: { position: 'none' }, // Hide legend
  };

  return (
    <div>
      <h3 style={{ color: "var(--xl-text-color)" }}>Diabetic Cases by Region</h3>
      <Chart
        chartType="GeoChart"
        data={staticPhilippineData}
        options={options}
        width="100%"
        height="600px"
      />
    </div>
  );
};

export default ChoroplethMap;
