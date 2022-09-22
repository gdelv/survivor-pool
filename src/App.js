import "./App.css";
import { entries } from "./data/sfPoolEntries";

function App() {
  // const renderWeeks = (num) => {
  //   console.log("hello")
  //   let element = null;
  //   for (let i = 0; i < num; i++) {
  //     element += <th>Week {i}</th>;
  //   }
  //   return element

  // }
  return (
    <div className="App">
      <h1 className="align-center">Week 3</h1>
      <div class="schedule-container">
        <div class="padding-left">
          <h2>Thursday Game</h2>
          <p><b>Steelers</b> (1-1) @ <b>Browns</b> (1-1)</p>
        </div>
        <div class="padding-left">
          <h2>1PM Games</h2>
          <p><b>Saints</b> (1-1) @ <b>Panthers</b> (0-2)</p>
          <p><b>Texans</b> (0-1-1) @ <b>Bears</b> (1-1)</p>
          <p><b>Chiefs</b> (2-0) @ <b>Colts</b> (0-1-1</p>
          <p><b>Bills</b> (2-0) @ <b>Dolphins</b> (2-0)</p>
          <p><b>Lions</b> (1-1) @ <b>Vikings</b> (1-1</p>
          <p><b>Ravens</b> (1-1) @ <b>Patriots</b> (1-1)</p>
          <p><b>Bengals</b> (0-2) @ <b>Jets</b> (1-1)</p>
          <p><b>Raiders</b> (0-2) @ <b>Titans</b> (1-1)</p>
          <p><b>Eagles</b> (2-0) @ <b>Commanders</b> (1-1)</p>
        </div>
        <div class="padding-left">
          <h2>4PM Games</h2>
          <p><b>Jaguars</b> (1-1) @ <b>Chargers</b> (1-1)</p>
          <p><b>Rams</b> (1-1) @ <b>Cardinals</b> (1-1)</p>
          <p><b>Falcons</b> (0-2) @ <b>Seahawks</b> (1-1)</p>
          <p><b>Packers</b> (1-1) @ <b>Buccaneers</b> (2-0)</p>
        </div>
        <div class="padding-left">
          <h2>Sunday Night Game</h2>
          <p><b>49ers</b> (1-1) @ <b>Broncos</b> (1-1)</p>
        </div>
        <div class="padding-left">
          <h2>Monday Night Game</h2>
          <p><b>Cowboys</b> (1-1) @ <b>Giants</b> (2-0)</p>
        </div>
      </div>

      <table style={{ width: "60%", height: "60vh", margin: "auto" }}>
        <tr>
          <th></th>
          <th>Week 2</th>
          <th>Week 3</th>
          {/* {renderWeeks(6)} */}
        </tr>
        {entries.map((entry) => (
          <tr>
            <td className="cell">{entry.name}</td>
            {entry.picks.map((pick) => (
              <td
                className={
                  pick.isCorrect === null
                    ? "cell"
                    : pick.isCorrect === true
                    ? "green cell"
                    : "red cell"
                }
              >
                {pick.teamChosen}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
