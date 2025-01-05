import PropTypes from "prop-types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const AreaCard = ({ cardInfo }) => {

  return (
    <div className="area-card">
        <div className="info-title">{cardInfo.title}</div>
        <div className="info-value">{cardInfo.value}</div>
        <div className="info-text">{cardInfo.text}</div>
    </div>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  cardInfo: PropTypes.object.isRequired,
};
