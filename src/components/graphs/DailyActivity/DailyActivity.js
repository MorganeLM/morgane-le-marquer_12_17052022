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
  });

  return (
    <article className="dailyActivity">
      {dailyActivity && dailyActivity.length && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="kilogram" fill="#282D30" />
              <Bar dataKey="calories" fill="#E60000" />
            </BarChart>
          </ResponsiveContainer>
      )}
    </article>
  );
}


export default DailyActivity;
