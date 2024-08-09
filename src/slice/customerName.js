import { connect } from "react-redux";
// import "../styleSheet/home.css";
const CustomerName = ({ name }) => {
  return <div className="customerName">{name}</div>;
};

const mapStateToprobs = (state) => {
  return {
    name: state.name.name,
  };
};

export default connect(mapStateToprobs)(CustomerName);
