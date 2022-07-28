import { useState, useEffect } from "react";
import UserDataService from "../../../services/UserDataService";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import "./Score.css"


function Score(props) {
  const [scoreForGraph, setScoreForGraph] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function callService(){
      let userInfos = await UserDataService.getUserInfos(props.userId);
      let rawScoreData = userInfos.todayScore ?  userInfos.todayScore :  userInfos.score ? userInfos.score : 0;
      let score = rawScoreData*100;
      let scoreData = [
        {
          name: 'score',
          data: score,
          fill: "#FF0000",
        },
        {
          name: 'reference',
          data: 100 - score,
          fill: "#fbfbfb",
        }
      ];
      console.log(scoreData)
      setScoreForGraph(scoreData);
      setScore(score)
    }
    callService();
  }, [props.userId]);

  const renderLegend = () => {
    return (
      <div className="score-legend">
        <div className="score-legend-title">{score} %</div>
        <div>de votre</div>
        <div>objectif</div>
      </div>
    );
  };

  return (
    <article className="score">
      <h3 className="score-title">Score</h3>
        {scoreForGraph && (
          <ResponsiveContainer width="100%" height="100%">
           <PieChart>
              <Pie  cx="50%" cy="50%"
                    startAngle={90} endAngle={450}
                    innerRadius={'90%'} outerRadius={'100%'}
                    cornerRadius={'50%'}
                    dataKey="data"
                    data={scoreForGraph}>
                  <Cell fill="#E60000" stroke="#E60000"/>
                  <Cell fill="transparent" stroke="transparent"/>
              </Pie>
              <Pie  cx="50%" cy="50%"
                    outerRadius={'90%'}
                    fill="#FFFFFF"
                    data={[{name: 'ring', value: 100}]}
                    dataKey="value" />
              <Legend verticalAlign="middle"
                      align="center"
                      content={renderLegend}
              />
        </PieChart>
      </ResponsiveContainer>
      )}
    </article>
  );
}

export default Score;

