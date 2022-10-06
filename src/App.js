import { useEffect, useState } from "react";
import "./App.css";
import { entries, weekMapping } from "./data/sfPoolEntries";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [week, setWeek] = useState(null);
  const [thursdayGame, setThursdayGame] = useState({});
  const [londonGame, setLondonGame] = useState({});
  const [mnfGame, setMnfGame] = useState({});
  const [snfGame, setSnfGame] = useState({});
  const [firstWindowGames, setFirstWindowGames] = useState([]);
  const [secondWindowGames, setSecondWindowGames] = useState([]);

  useEffect(() => {
    const getSchedule = async () => {
      const todayDate = new Date();
      let weekNumberFound;
      weekMapping.forEach((week) => {
        if (
          todayDate < new Date(week.endDate) &&
          todayDate >= new Date(week.startDate)
        ) {
          return (weekNumberFound = week.weekNum);
        }
      });
      setWeek(weekNumberFound);
      const notesSnapshot = await getDocs(
        collection(db, `Week-${weekNumberFound}`)
      );
      const allGames = notesSnapshot.docs.map((doc) => doc.data());
      const standingsSnapshot = await getDocs(
        collection(db, `Week-${weekNumberFound}`)
      );
      const allStandings = standingsSnapshot.docs.map((doc) => doc.data());
      console.log(allStandings);
      let firstGames = [];
      let secondGames = [];
      allGames.forEach((game) => {
        return game.tv === "AMZN"
          ? setThursdayGame(game)
          : game.time === "9:30 am"
          ? setLondonGame(game)
          : game.time === "8:20 pm" && game.tv === "NBC"
          ? setSnfGame(game)
          : game.time === "8:15 pm" && game.tv === "ESPN"
          ? setMnfGame(game)
          : game.time === "1:00 pm"
          ? firstGames.push(game)
          : game.time === "4:25 pm" || game.time === "4:05 pm" ? secondGames.push(game):null;
      });
      // console.log('first',firstGames);
      setFirstWindowGames(firstGames);
      setSecondWindowGames(secondGames)
      return allGames;
    };
    if (week === null) {
      getSchedule(); //call getSchedule based on which weekNum it is
    }

    // return () => {
    //   second
    // }
  }, [week]);
  return (
    <div className="App">
      <h1 className="align-center">Week {week}</h1>
      <div class="schedule-container">
        <div class="margin-left">
          <h2>Thursday Game</h2>
          <p>
            <b>{thursdayGame.awayTeam}</b> @ <b>{thursdayGame.homeTeam}</b>
          </p>
          <h6>{thursdayGame.ticketPrices}</h6>
          <h6>
            {thursdayGame.time} ({thursdayGame.tv})
          </h6>
          <h6>{thursdayGame.venue}</h6>
        </div>
        {/* If 9:30am games show here */}
        {londonGame ? (
          <div class="margin-left">
            <h2>Sunday Morning London Game</h2>
            <p>
              <b>{londonGame.awayTeam}</b> @ <b>{londonGame.homeTeam}</b>
            </p>
            <h6>
              {londonGame.ticketPrices !== "-" ? null : londonGame.ticketPrices}
            </h6>
            <h6>
              {londonGame.time} ({londonGame.tv})
            </h6>
            <h6>{londonGame.venue}</h6>
          </div>
        ) : null}
          <h2>1PM Games</h2>
        <div class="margin-left">
        {firstWindowGames.map(game => {
          return (
            <div><p>
            <b>{game.awayTeam}</b> @ <b>{game.homeTeam}</b>
          </p>
          <h6>
            {game.ticketPrices === "-" ? null : game.ticketPrices}
          </h6>
          <h6>
            {game.time} ({game.tv})
          </h6>
          <h6>{game.venue}</h6></div>
          )
        })}
        </div>
        <div class="margin-left">
          <h2>4PM Games</h2>
          {secondWindowGames.map(game => {
          return (
            <><p>
            <b>{game.awayTeam}</b> @ <b>{game.homeTeam}</b>
          </p>
          <h6>
            {game.ticketPrices === "-" ? null : game.ticketPrices}
          </h6>
          <h6>
            {game.time} ({game.tv})
          </h6>
          <h6>{game.venue}</h6></>
          )
        })}
        </div>
        {snfGame ? (
          <div class="margin-left">
            <h2>Sunday Night Football</h2>
            <p>
              <b>{snfGame.awayTeam}</b> @ <b>{snfGame.homeTeam}</b>
            </p>
            <h6>
              {snfGame.ticketPrices === "-" ? null : snfGame.ticketPrices}
            </h6>
            <h6>
              {snfGame.time} ({snfGame.tv})
            </h6>
            <h6>{snfGame.venue}</h6>
          </div>
        ) : null}
        {mnfGame ? (
          <div class="margin-left">
            <h2>Monday Night Football</h2>
            <p>
              <b>{mnfGame.awayTeam}</b> @ <b>{mnfGame.homeTeam}</b>
            </p>
            <h6>
              {mnfGame.ticketPrices === "-" ? null : mnfGame.ticketPrices}
            </h6>
            <h6>
              {mnfGame.time} ({mnfGame.tv})
            </h6>
            <h6>{mnfGame.venue}</h6>
          </div>
        ) : null}
      </div>
      <br></br>
      <h1 className="align-center">Weekly Picks</h1>
      <h2 className="align-center">Rules</h2>
      <p>
        Each pool member chooses one NFL team each week they think will WIN
        their game outright (picks are made 'straight up', not using a point
        spread system).
      </p>
      <p>NFL teams can only be picked once during the season.</p>
      <p>
        If a game your picked team is playing in results in a tie, your pick
        will be correct and your entry will advance.
      </p>
      <p>
        The final pick deadline each week is Sunday at 1pm ET. If you want to
        pick an earlier game you must do so by kickoff of that game.
      </p>
      <table style={{ width: "85%", height: "60vh", margin: "auto" }}>
        <tr>
          <th></th>
          <th>Week 2</th>
          <th>Week 3</th>
          <th>Week 4</th>
        </tr>
        {entries.map((entry) => (
          <tr>
            <td className={entry.isEliminated ? "eliminated__team" :"cell"}>{entry.name}</td>
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
