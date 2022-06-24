import { useState, useEffect } from "react";
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
  //const dieteticIndicatorEndPoint = "http://localhost:3000/user/:id/key-data";
  //const dieteticIndicatorMockEndPoint = "http://localhost:3001/user18indicatorsMock.json"

  useEffect(() => {
    // let sessionDuration = await UserDataService.getSessionDuration(props.userId)
    // setSessionDuration(sessionDuration);

    const sessionDurationEndPoint = "http://localhost:3000/user/" + props.userId + "/average-sessions"; 

    fetch(sessionDurationEndPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let rawSessionDuration = data.data.sessions;
        let sessionDuration = mapDaysOfSessions(rawSessionDuration);
        setSessionDuration(sessionDuration);
      })
      .catch((err) => {
        console.log(err);
      });
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

function mapDaysOfSessions(data){
  return data.map(session => {
    return {
      day: transformDay(session.day),
      sessionLength: session.sessionLength
    }
  })
}

function transformDay(day){
  switch(day){
    case 1: return 'L';
    case 2: return 'M';
    case 3: return 'M';
    case 4: return 'J';
    case 5: return 'V';
    case 6: return 'S';
    case 7: return 'D';
    default: return ''
  }
}