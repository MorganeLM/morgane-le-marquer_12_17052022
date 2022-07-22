import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import UserDataService from "../../../services/UserDataService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import './DailyActivity.css';

function DailyActivity(props) {
  const [dailyActivity, setDailyActivity] = useState([]);

  useEffect(() => {
    async function callService(){
      let activityData = await UserDataService.getDailyActivity(props.userId)
      setDailyActivity(activityData);
    }
    callService();
  }, [props.userId]);

  return (
    <article className="dailyActivity">
      <h3 className="dailyActivity-title">Activité quotidienne</h3>
      {dailyActivity && dailyActivity.length && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              barSize={7}
              barGap={8}
              width={500}
              height={400}
              data={dailyActivity}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis dataKey="Poids (kg)" yAxisId="1" orientation="right" axisLine={false} tickLine={false} />
              <YAxis dataKey="Calories brulées (kCal)" yAxisId="0" orientation="left" />
              <Tooltip content={<CustomTooltip/>}/>
              <Legend  verticalAlign="top" align="end"/>
              <Bar dataKey="Poids (kg)" fill="#282D30" legendType="circle" radius={[10, 10, 0, 0]} />
              <Bar dataKey="Calories brulées (kCal)" fill="#E60000" legendType="circle" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
      )}
    </article>
  );
}


export default DailyActivity;


/**
 * Show custom tooltip
 * @param {Object} params
 * @param {Boolean} params.active
 * @param {Array} params.payload
 * @return {JSX || null}
 */
 const CustomTooltip = ({active, payload}) => active ? (
  <div className="dailyActivity-tooltip">
      <div>{payload[0].value}kg</div>
      <div>{payload[1].value}kCal</div>
  </div>
) : null

// propTypes
DailyActivity.propTypes = {
  userId: PropTypes.string.isRequired,
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
}