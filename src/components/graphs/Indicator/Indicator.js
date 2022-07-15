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
