import PropTypes from 'prop-types';

function Indicator(props) {
  return (
    <div className="indicator-wrapper">
      <div className="indicator">
        <div className="indicator-img">
          <img src={props.icon} alt='icon' />
        </div>
        <div className="indicator-text">
          <p>{props.value}{props.unit}</p>
          <p className="indicator-type">{props.type}</p>
        </div>
      </div>
    </div>
  );
}

export default Indicator;

// PropTypes
Indicator.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

}