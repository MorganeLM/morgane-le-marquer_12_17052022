import { useState, useEffect } from "react";
import UserDataService from "../../../services/UserDataService";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from "recharts";


function Score(props) {
  const [score, setScore] = useState([]);

  useEffect(() => {
    async function callService(){
      let userInfos = await UserDataService.getUserInfos(props.userId);
      let rawScoreData = userInfos.todayScore;
      let score = [{
        name: 'Score',
        score: rawScoreData*100
      }];
      setScore(score);
      
    }
    callService();
  }, [props.userId]);

  return (
    <article>
        {score && (
          <RadialBarChart 
          width={300} 
          height={220} 
          innerRadius="0%" 
          outerRadius="100%" 
          data={score} 
          startAngle={360} 
          endAngle={0}
        >
          <RadialBar minAngle={50} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='score' />
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
          <Tooltip />
        </RadialBarChart>
      )}
    </article>
  );
}

export default Score;

