import AreaLineChart from "./AreaLineChart";
import AreaPieChart from "./AreaPieChart";
import ChoroplethMap from "./ChoroplethMap";


const AreaCharts = () => {
  return (
    <section className="content-area-charts">
      {/* Left Column: Bar Chart */}
      <div className="bar-chart">
        <ChoroplethMap />
      </div>

      {/* Right Column: Stacked Progress Charts */}
      <div className="right-column">
        <div className="chart">
          <AreaLineChart />
        </div>
        <div className="chart">
          <AreaPieChart />
        </div>
      </div>
    </section>
  );
};

export default AreaCharts;
