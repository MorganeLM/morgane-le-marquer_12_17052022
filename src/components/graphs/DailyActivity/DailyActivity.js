import { useState, useEffect } from "react";
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
//import UserDataService from "../../../services/UserDataService";
import './DailyActivity.css';

function DailyActivity(props) {
  const [dailyActivity, setDailyActivity] = useState([]);
  //const dailyActivityEndPoint = "http://localhost:3000/user/:id/activity";
  //const dailyActivityMockEndPoint = "http://localhost:3001/user18activityMock.json"

  useEffect(() => {
    // let activityData = await UserDataService.getDailyActivity(props.userId)
    // loadDailyActivity(activityData);
    // console.log(UserDataService.getDailyActivity(props.userId))

    const userInfosEndPoint =
      "http://localhost:3000/user/" + props.userId + "/activity";

    fetch(userInfosEndPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let rawData = data.data.sessions;
        let dayCount = 1;
        let transformedData = rawData.map((dailyActivity) => {
          return {
            day: dayCount++,
            kilogram: dailyActivity.kilogram,
            calories: dailyActivity.calories,
          };
        });
        setDailyActivity(transformedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userId]);

  // const dailyActivityMock = [
  //   [
  //     {
  //       "day": 1,
  //       "kilogram": 70,
  //       "calories": 240
  //     },
  //     {
  //       "day": 2,
  //       "kilogram": 69,
  //       "calories": 220
  //     },
  //     {
  //       "day": 3,
  //       "kilogram": 70,
  //       "calories": 280
  //     },
  //     {
  //       "day": 4,
  //       "kilogram": 70,
  //       "calories": 500
  //     },
  //     {
  //       "day": 5,
  //       "kilogram": 69,
  //       "calories": 160
  //     },
  //     {
  //       "day": 6,
  //       "kilogram": 69,
  //       "calories": 162
  //     },
  //     {
  //       "day": 7,
  //       "kilogram": 69,
  //       "calories": 390
  //     }
  //   ]
  // ]
  /* <div><pre>{JSON.stringify(dailyActivity, null, 2)}</pre></div> */

  //console.log("dailyActivity", dailyActivity);
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
