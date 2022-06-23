function Indicator(props) {

  return (
    <div className="indicator">
      <p>{props.value}{props.unit}</p>
      <p className="indicator-type">{props.type}</p>
    </div>
  );
}

export default Indicator;
