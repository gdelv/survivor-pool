import { useEffect, useState } from "react";
import "./App.css";
import { updatedEntries, weekMapping } from "./data/sfPoolEntries";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ScheduleCard from "./components/ScheduleCard";
import Loading from "./components/Loading";

function App() {
  const [week, setWeek] = useState(null);
  const [thursdayGame, setThursdayGame] = useState({});
  const [londonGame, setLondonGame] = useState({});
  const [mnfGame, setMnfGame] = useState({});
  const [snfGame, setSnfGame] = useState({});
  const [firstWindowGames, setFirstWindowGames] = useState([]);
  const [secondWindowGames, setSecondWindowGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const entries = updatedEntries();
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
      const standingsSnapshot = await getDocs(collection(db, `Standings`));
      const allStandings = standingsSnapshot.docs.map((doc) => doc.data());
      setAllGames(allStandings);
      console.log(allStandings, "hi");
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
          : game.time === "4:25 pm" || game.time === "4:05 pm"
          ? secondGames.push(game)
          : null;
      });
      // console.log('first',firstGames);
      setFirstWindowGames(firstGames);
      setSecondWindowGames(secondGames);
      setIsLoaded(true)
      return allGames;
    };
    if (week === null) {
      getSchedule(); //call getSchedule based on which weekNum it is
    }

    // return () => {
    //   second
    // }
  }, [week, isLoaded]);
  return (
    <div className="App">
      <h1 className="align-center">Week {week}</h1>
      {isLoaded ?  <div className="schedule-container">
        <div>
          <h2>Thursday Game</h2>
          <ScheduleCard game={thursdayGame} allGames={allGames} week={week} />
        </div>
        {/* If 9:30am games show here */}
        {londonGame ? (
          <div>
            <h2>Sunday Morning London Game</h2>
            <ScheduleCard game={londonGame} allGames={allGames} week={week} />
          </div>
        ) : null}
        <h2>1PM Games</h2>
        <div>
          {firstWindowGames.map((game) => {
            return (
              <div key={game.venue}
              className="card-container"
              >
                <ScheduleCard game={game} allGames={allGames} week={week} />
              </div>
            );
          })}
        </div>
        <div>
          <h2>4PM Games</h2>
          {secondWindowGames.map((game) => {
            return (
              <div
                key={game.venue}
                className="card-container"
              >
                <ScheduleCard game={game} allGames={allGames} week={week} />
              </div>
            );
          })}
        </div>
        {snfGame ? (
          <div>
            <h2>Sunday Night Football</h2>
            <ScheduleCard game={snfGame} allGames={allGames} week={week} />
          </div>
        ) : null}
        {mnfGame ? (
          <div>
            <h2>Monday Night Football</h2>
            <ScheduleCard game={mnfGame} allGames={allGames} week={week} />
          </div>
        ) : null}
      </div>:<Loading/>}
     
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
      <table style={{ width: "95%", height: "60vh", margin: "auto" }}>
        <tr>
          <th style={{ width: "6%" }}></th>
          <th style={{ width: "5%" }}>Week 2</th>
          <th style={{ width: "5%" }}>Week 3</th>
          <th style={{ width: "5%" }}>Week 4</th>
          <th style={{ width: "5%" }}>Week 5</th>
        </tr>
        {entries.map((entry) => (
          <tr key={entry.name}>
            <td className={entry.isEliminated ? "eliminated__team" : "cell"}>
              {entry.name}
            </td>
            {entry.picks.map((pick) => (
              <td
                key={pick.teamChosen}
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
