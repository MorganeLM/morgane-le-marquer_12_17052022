import { useState, useEffect } from "react";
import UserDataService from "../../../services/UserDataService";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";
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

  return (
    <article className="sessionDuration">
      <h3 className="sessionDuration-title">Durée moyenne des sessions</h3>
      {sessionDuration && sessionDuration.length && (
        <ResponsiveContainer width="100%" height="100%" className="sessionDuration-graph">
          <LineChart width={300} height={280} fill="red" margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                     data={sessionDuration} 
                     onMouseMove={(e) => {
                      if (e.isTooltipActive) {
                        const divHovered = document.querySelector(".sessionDuration-graph");
                        const windowWidth = divHovered.clientWidth;
                        const withRateHovered = Math.round(
                          (e.activeCoordinate.x / windowWidth) * 100
                        );
                        divHovered.style.background = `linear-gradient(90deg, rgba(255,0,0,1) ${withRateHovered}%, rgba(175,0,0,1.5) ${withRateHovered}%, rgba(175,0,0,1.5) 100%)`;
                      }
                    }}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{fill: '#FFFFFF', opacity: "0.7"}} tickMargin={10} padding={{left: 5, right: 5}} />
            <YAxis  type="number" domain={[-10, 90]} hide={true} />
            <Tooltip cursor={false}content={<CustomTooltip />}/>
            <Line type="natural" // monotoneX is less smooth but do not go under 0
                  dataKey="sessionLength"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    stroke: "#fff",
                  }} />
          </LineChart>
        </ResponsiveContainer>
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