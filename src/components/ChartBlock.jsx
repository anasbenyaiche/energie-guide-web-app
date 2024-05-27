import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import PropTypes from "prop-types";

const ChartBlock = ({ content }) => {
  return (
    <div>
      <Bar data={content.data} options={content.options} />{" "}
    </div>
  );
};
// ChartBlock.js
ChartBlock.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.object.isRequired, // Assuming data is a structured object for the chart
    options: PropTypes.object.isRequired, // Assuming options is a structured object for chart configuration
  }).isRequired,
};
export default ChartBlock;
