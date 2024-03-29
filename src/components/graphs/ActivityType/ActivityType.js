import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import UserDataService from "../../../services/UserDataService";
import {RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer} from "recharts";
import './ActivityType.css'

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
    <article className="activityType">
      {activityType && activityType.length && (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={80} data={activityType} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="kind" />
          <Radar name="Activity Type" dataKey="value" fill="#FF0101B2" fillOpacity={0.8} />
        </RadarChart>
      </ResponsiveContainer>
      )}
    </article>
  );
}
  
export default ActivityType;

// PropTypes
ActivityType.propTypes = {
  userId: PropTypes.string.isRequired,
}


