import { useState, useEffect } from "react";
import Indicator from '../Indicator/Indicator';
//import UserDataService from "../../../services/UserDataService";
import './DieteticIndicator.css';

function DieteticIndicator(props) {
  const [indicators, setIndicators] = useState([]);
  //const dieteticIndicatorEndPoint = "http://localhost:3000/user/:id/key-data";
  //const dieteticIndicatorMockEndPoint = "http://localhost:3001/user18indicatorsMock.json"

  useEffect(() => {
    // let activityData = await UserDataService.getDailyActivity(props.userId)
    // loadDailyActivity(activityData);
    // console.log(UserDataService.getDailyActivity(props.userId))

    const userInfosEndPoint = "http://localhost:3000/user/" + props.userId;  //+ "/key-data"; -> this route doesn't exist!

    fetch(userInfosEndPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let rawKeyData = data.data.keyData;
        let keyData = mapIndicators(rawKeyData);
        setIndicators(keyData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userId]);

  return (
    <article className="indicators">
      {indicators && indicators.length && (
        indicators.map(indicator => <Indicator type={indicator.type} value={indicator.value} unit={indicator.unit} />)
      )}
    </article>
  );

  function mapIndicators(data){
    let transformedData = [];
    for (let [key, value] of Object.entries(data)) {
      transformedData.push({
        type: key.replace('Count', 's'),
        value: value,
        unit: findUnit(key)
      })
    }
    return transformedData;
  }

  function findUnit(type){
      switch(type){
        case 'calorieCount': return 'kCal';
        case 'carbohydrateCount': return 'g';
        case 'lipidCount': return 'g';
        case 'proteinCount': return 'g';
        default: return 'g';
      }
  }

  //todo: function findIcon(type)
}


export default DieteticIndicator;
