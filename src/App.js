import { useEffect, useState } from "react";
import "./App.css";
import { weekMapping } from "./data/sfPoolEntries";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ScheduleCard from "./components/ScheduleCard";
import Loading from "./components/Loading";
import Table from "./components/Table";
import Rules from "./components/Rules";

function App() {
  const [week, setWeek] = useState(null);
  const [thursdayGame, setThursdayGame] = useState({});
  const [londonGame, setLondonGame] = useState({});
  const [mnfGame, setMnfGame] = useState({});
  const [snfGame, setSnfGame] = useState({});
  const [firstWindowGames, setFirstWindowGames] = useState([]);
  const [secondWindowGames, setSecondWindowGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [entries, setEntries] = useState(null);
  const checkElimination = (arr) => {
    let count = 0;
    arr.forEach((entry) => {
      if (entry.isCorrect === false) {
        count++;
      }
    });
    return count > 1 ? true : false;
  };
  useEffect(() => {
    const updatedEntries = (arr) => {
      let finalArr = [];
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        element.isEliminated = checkElimination(element.picks);
        finalArr.push(element);
      }
      return finalArr;
    };
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
      setFirstWindowGames(firstGames);
      setSecondWindowGames(secondGames);
      setIsLoaded(true);
      return allGames;
    };
    const getEntries = async () => {
      const entriesSnapshot = await getDocs(collection(db, `Entries`));
      let allEntries = entriesSnapshot.docs.map((doc) => doc.data());
      allEntries = updatedEntries(allEntries);
      console.log(allEntries, 'ENTRIES');
      setEntries(allEntries);
    };
    if (week === null) {
      getSchedule(); //call getSchedule based on which weekNum it is
      getEntries(); //call to retrieve all entries
    }
  }, [week, isLoaded, entries]);
  return (
    <div className="App">
      <h1 className="align-center">Week {week}</h1>
      {isLoaded ? (
        <div className="schedule-container">
          <div>
            <h2>Thursday Game</h2>
            <ScheduleCard game={thursdayGame} allGames={allGames} week={week} />
          </div>
          {/* If 9:30am games show here */}
          {londonGame.length ? (
            <div>
              <h2>Sunday Morning London Game</h2>
              <ScheduleCard game={londonGame} allGames={allGames} week={week} />
            </div>
          ) : (
            <div>No London Game This Week</div>
          )}
          <h2>1PM Games</h2>
          <div>
            {firstWindowGames.map((game) => {
              return (
                <div key={game.venue} className="card-container">
                  <ScheduleCard game={game} allGames={allGames} week={week} />
                </div>
              );
            })}
          </div>
          <div>
            <h2>4PM Games</h2>
            {secondWindowGames.map((game) => {
              return (
                <div key={game.venue} className="card-container">
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
        </div>
      ) : (
        <Loading loadingMsg="Loading schedule..." />
      )}

      <br></br>
      <Rules />
      <h1 className="align-center">Weekly Picks</h1>

      <Table
        entries={entries}
        week={week}
        londonGame={londonGame}
        thursdayGame={thursdayGame}
        firstWindowGames={firstWindowGames}
        secondWindowGames={secondWindowGames}
        snfGame={snfGame}
        mnfGame={mnfGame}
        allGames={allGames}
      />
    </div>
  );
}

export default App;
