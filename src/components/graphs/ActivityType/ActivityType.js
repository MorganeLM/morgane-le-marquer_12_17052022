import { useState, useEffect } from "react";
import UserDataService from "../../../services/UserDataService";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

function ActivityType(props) {
  const [activityType, setActivityType] = useState([]);

  useEffect(() => {
    async function callService(){
      let activityType = await UserDataService.getActivityType(props.userId)
      setActivityType(activityType);
    }
    callService();
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





