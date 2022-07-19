import { useState, useEffect } from "react";
import UserDataService from "../../../services/UserDataService";
import {LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";
import './SessionDuration.css';

function SessionDuration(props) {
  const [sessionDuration, setSessionDuration] = useState([]);

  useEffect(() => {
    async function callService(){
      let sessionDuration = await UserDataService.getSessionDuration(props.userId);
      setSessionDuration(sessionDuration);
    }
    callService();
  }, [props.userId]);

  const sessionStyleTooltip = {
    width: "39px",
    hide: "25px",
    color: 'black',
    backgroundColor: 'white',
    fontSize: '7px'
  };

  return (
    <article className="sessionDuration">
      <h3 className="sessionDuration-title">Durée moyenne des sessions</h3>
      {sessionDuration && sessionDuration.length && (
        <LineChart width={300} height={280} data={sessionDuration} fill="red" margin={{ top: 15, right: 30, left: 20, bottom: 15 }}>
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{fill: '#FFFFFF'}} tickMargin={10} padding={{left: 5, right: 5}} />
          <YAxis  type="number" domain={[-13, 80]} hide={true} />
          <Tooltip contentStyle={sessionStyleTooltip} content={<CustomTooltip />}/>
          <Line type="natural"
                dataKey="sessionLength"
                stroke="#ffffff"
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


/**
 * Show custom tooltip
 * @param {Object} params
 * @param {Boolean} params.active
 * @param {Array} params.payload
 * @return {JSX || null}
 */
 const CustomTooltip = ({active, payload}) => active ? (
  <div className="sessionDuration-tooltip">
      <div>{payload[0].value} min</div>
  </div>
) : null