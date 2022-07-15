import { useState, useEffect } from "react";
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
      <h3>Titre</h3>
      {dailyActivity && dailyActivity.length && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              barSize={7}
              barGap={8}
              width={500}
              height={300}
              data={dailyActivity}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis dataKey="Poids (kg)" yAxisId="1" orientation="right" axisLine={false} tickLine={false} />
              <YAxis dataKey="Calories brulées (kCal)" yAxisId="0" orientation="left" />
              <Tooltip />
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
