import { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

function ActivityType(props) {
  const [activityType, setActivityType] = useState([]);
  //const dieteticIndicatorEndPoint = "http://localhost:3000/user/:id/key-data";
  //const dieteticIndicatorMockEndPoint = "http://localhost:3001/user18indicatorsMock.json"

  useEffect(() => {
    // let sessionDuration = await UserDataService.getSessionDuration(props.userId)
    // setSessionDuration(sessionDuration);

    const activityTypeEndPoint = "http://localhost:3000/user/" + props.userId + "/performance"; 

    fetch(activityTypeEndPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let rawActivityTypeKind = data.data.kind;
        let rawActivityTypeData = data.data.data;
        let activityType = mapActivityTypeData(rawActivityTypeData, rawActivityTypeKind)
        console.log(activityType)
        setActivityType(activityType);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userId]);
    return (
      <article>
        {activityType && activityType.length && (
        <RadarChart outerRadius={90} width={300} height={220} data={activityType}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Activity Type" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
        )}
      </article>
    );
  }
  
  export default ActivityType;


  function mapActivityTypeData(data, kinds){
    let activityType = data.map(type => {
      let kind = kinds[type.kind];
      let capitalizedKind = kind[0].toUpperCase() + kind.substring(1);
      return {
        kind: capitalizedKind,
        value: type.value
      }
    })
    return activityType;
  }



