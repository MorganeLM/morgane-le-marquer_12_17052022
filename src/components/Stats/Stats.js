import ActivityType from "../graphs/ActivityType/ActivityType";
import DailyActivity from "../graphs/DailyActivity/DailyActivity";
import DieteticIndicator from "../graphs/DieteticIndicator/DieteticIndicator";
import Score from "../graphs/Score/Score";
import SessionDuration from "../graphs/SessionDuration/SessionDuration";
import './Stats.css';

function Stats(props) {
    return (
      <section className="stats">
          <div className="stats-grid">
              <DailyActivity userId={props.userId} />
              <SessionDuration userId={props.userId} />
              <ActivityType userId={props.userId} />
              <Score userId={props.userId} />
          </div>
          <div>
              
            <DieteticIndicator userId={props.userId} />
          </div>
      </section>
    );
  }
  
  export default Stats;