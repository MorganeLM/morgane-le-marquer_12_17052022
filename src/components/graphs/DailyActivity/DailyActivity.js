import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import UserDataService from "../../../services/UserDataService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
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
            <BarChart barSize={7} barGap={8} 
                      margin={{top: 50, right: 30, left: 20, bottom: 10}}
                      data={dailyActivity} >
              
              <CartesianGrid strokeDasharray="1 1" vertical={false} />
              
              <XAxis dataKey="day"/>
              <YAxis dataKey="kilogram"
                     yAxisId="kgAxis" 
                     orientation="right" 
                     axisLine={false} 
                     tickLine={false} 
                     tickCount={4}
                     domain={["dataMin-1", "dataMax+2"]} />
                     
              <YAxis dataKey="calories"
                     yAxisId="calAxis" 
                     orientation="left" 
                     hide />
              
              <Tooltip content={<CustomTooltip/>} />
              <Legend  verticalAlign="top" align="end" 
                       formatter={(value) => <span className="recharts-legend-item-text">{value}</span>} />

              <Bar yAxisId="kgAxis" dataKey="kilogram" name="Poids (kg)" 
                   fill="#282D30" legendType="circle" radius={[10, 10, 0, 0]} />
              <Bar yAxisId="calAxis" dataKey="calories" name="Calories brûlées (kCal)" 
                   fill="#E60000" legendType="circle" radius={[10, 10, 0, 0]} />

            </BarChart>
          </ResponsiveContainer>
      )}
    </article>
  );
}

export default DailyActivity;


/**
 * Create custom tooltip for daily activity chart
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


// PropTypes
DailyActivity.propTypes = {
  userId: PropTypes.string.isRequired,
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
}
