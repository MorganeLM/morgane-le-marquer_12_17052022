import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Indicator from '../Indicator/Indicator';
import UserDataService from "../../../services/UserDataService";
import './DieteticIndicator.css';

function DieteticIndicator(props) {
  const [indicators, setIndicators] = useState([]);
  
  useEffect(() => {
    async function callService(){
      let keyData = await UserDataService.getKeyData(props.userId)
      setIndicators(keyData);
    }
    callService();
  }, [props.userId]);

  return (
    <article className="indicators">
      {indicators && indicators.length && (
        indicators.map(indicator => <Indicator key={indicator.id} type={indicator.type} value={indicator.value} unit={indicator.unit} icon={indicator.icon} />)
      )}
    </article>
  );
}


export default DieteticIndicator;

// PropTypes
DieteticIndicator.propTypes = {
  userId: PropTypes.string.isRequired,
}
