import { useState, useEffect } from "react";
import UserDataService from "../../../services/UserDataService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SessionDuration(props) {
  const [sessionDuration, setSessionDuration] = useState([]);

  useEffect(() => {
    async function callService(){
      let sessionDuration = await UserDataService.getSessionDuration(props.userId)
      setSessionDuration(sessionDuration);
    }
    callService();
  }, [props.userId]);

  return (
    <article className="sessionDuration">
      <h3>Durée moyenne des sessions</h3>
      {sessionDuration && sessionDuration.length && (
        <LineChart width={300} height={280} data={sessionDuration} fill="red" margin={{ top: 15, right: 30, left: 20, bottom: 15 }}>
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis  type="number" domain={[-20, 'dataMax']} hide={true} />
          <Tooltip />
          <Line type="natural"
                dataKey="sessionLength"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  stroke: "#fff",
                }} />
        </LineChart>
      )}
    </article>
  );
}
  
export default SessionDuration;