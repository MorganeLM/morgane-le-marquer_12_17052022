import { useState, useEffect } from "react";
import UserDataService from "../../../services/UserDataService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
      {sessionDuration && sessionDuration.length && (
        <LineChart width={300} height={220} data={sessionDuration} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sessionLength" stroke="#8884d8" />
      </LineChart>
      )}
    </article>
  );
}
  
export default SessionDuration;