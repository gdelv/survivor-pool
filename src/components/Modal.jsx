import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import SelectCard from "./SelectCard";

export default function Modal(props) {
  const [modalArr, setModalArr] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("None");
  const {
    thursdayGame,
    londonGame,
    firstWindowGames,
    secondWindowGames,
    snfGame,
    mnfGame,
    nameSelected,
    entries,
    week,
    allGames,
  } = props;
  let arr = [
    thursdayGame,
    londonGame,
    ...firstWindowGames,
    ...secondWindowGames,
    snfGame,
    mnfGame,
  ];

  const findTeamAbbrev = (teamName) => {
    let cityConversions = [
      {
        city: "N.Y. Jets",
        name: "Jets",
        abbrev: "NYJ",
      },
      {
        city: "N.Y. Giants",
        name: "Giants",
        abbrev: "NYG",
      },
      {
        city: "Buffalo",
        name: "Bills",
        abbrev: "BUF",
      },
      {
        city: "New England",
        name: "Patriots",
        abbrev: "NE",
      },
      {
        city: "San Francisco",
        name: "49ers",
        abbrev: "SF",
      },
      {
        city: "Chicago",
        name: "Bears",
        abbrev: "CHI",
      },
      {
        city: "Cincinnati",
        name: "Bengals",
        abbrev: "CIN",
      },
      {
        city: "Denver",
        name: "Broncos",
        abbrev: "DEN",
      },
      {
        city: "Cleveland",
        name: "Browns",
        abbrev: "CLE",
      },
      {
        city: "Tampa Bay",
        name: "Buccaneers",
        abbrev: "TB",
      },
      {
        city: "Arizona",
        name: "Cardinals",
        abbrev: "ARI",
      },
      {
        city: "L.A. Chargers",
        name: "Chargers",
        abbrev: "LAC",
      },
      {
        city: "Kansas City",
        name: "Chiefs",
        abbrev: "KC",
      },
      {
        city: "Indianapolis",
        name: "Colts",
        abbrev: "IND",
      },
      {
        city: "Washington",
        name: "Commanders",
        abbrev: "WAS",
      },
      {
        city: "Dallas",
        name: "Cowboys",
        abbrev: "DAL",
      },
      {
        city: "Miami",
        name: "Dolphins",
        abbrev: "MIA",
      },
      {
        city: "Philadelphia",
        name: "Eagles",
        abbrev: "PHI",
      },
      {
        city: "Atlanta",
        name: "Falcons",
        abbrev: "ATL",
      },
      {
        city: "Jacksonville",
        name: "Jaguars",
        abbrev: "JAX",
      },
      {
        city: "Detroit",
        name: "Lions",
        abbrev: "DET",
      },
      {
        city: "Green Bay",
        name: "Packers",
        abbrev: "GB",
      },
      {
        city: "Carolina",
        name: "Panthers",
        abbrev: "CAR",
      },
      {
        city: "Las Vegas",
        name: "Raiders",
        abbrev: "LV",
      },
      {
        city: "L.A. Rams",
        name: "Rams",
        abbrev: "LAR",
      },
      {
        city: "Baltimore",
        name: "Ravens",
        abbrev: "BAL",
      },
      {
        city: "New Orleans",
        name: "Saints",
        abbrev: "NO",
      },
      {
        city: "Seattle",
        name: "Seahawks",
        abbrev: "SEA",
      },
      {
        city: "Pittsburgh",
        name: "Steelers",
        abbrev: "PIT",
      },
      {
        city: "Houston",
        name: "Texans",
        abbrev: "HOU",
      },
      {
        city: "Tennessee",
        name: "Titans",
        abbrev: "TEN",
      },
      {
        city: "Minnesota",
        name: "Vikings",
        abbrev: "MIN",
      },
    ];
    let teamFound = cityConversions.find((team) => team.city === teamName);
    return teamFound.abbrev;
  };
  const checkTeam = (arr, game) => {
    // console.log(game, 'this is the game inside checkTeam');
    let homeTeamAbbrev = findTeamAbbrev(game.homeTeam);
    let awayTeamAbbrev = findTeamAbbrev(game.awayTeam);
    arr.forEach((pick) => {
      if (pick.teamChosen === homeTeamAbbrev) {
        game.homeTeamDisabled = true;
        game.awayTeamDisabled = false;
      } else if (pick.teamChosen === awayTeamAbbrev) {
        game.awayTeamDisabled = true;
        game.homeTeamDisabled = false;
      }
      let dayOfTheWeek = new Date().getDay(); // 0=SUNDAY
      // IF today = THURSDAY @ game.time
      //disable amazon game start
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let date = new Date().getDate();
      //If Thursday check for Thursday Game Start Time
      if (dayOfTheWeek === 4) {
        let thursdayExpiredDate = new Date(year, month, date, 20, 15); // 8:15 PM
        let currentDate = new Date();
        if (currentDate > thursdayExpiredDate) {
          if (game.tv === "AMZN") {
            game.awayTeamDisabled = true;
            game.homeTeamDisabled = true;
          }
        }
      }
      // IF today = Friday/Sat (5,6) disable AMZN game
      if (dayOfTheWeek > 4) {
        if (game.tv === "AMZN") {
          game.awayTeamDisabled = true;
          game.homeTeamDisabled = true;
        }
      }
      //disable amazon game end
      // disable sunday games start
      if (dayOfTheWeek === 0) {
        //disable amazon game
        if (game.tv === "AMZN") {
          game.awayTeamDisabled = true;
          game.homeTeamDisabled = true;
        }
        let sundayFirstExpiredDate = new Date(year, month, date, 13, 0); // 1:00 PM
        let sundaySecondExpiredDate = new Date(year, month, date, 16, 5); // 4:05 PM
        let sundayThirdExpiredDate = new Date(year, month, date, 16, 25); // 4:25 PM
        let sundayFourthExpiredDate = new Date(year, month, date, 20, 20); // 8:20 PM
        let currentDate = new Date();
        if (currentDate > sundayFirstExpiredDate) {
          if (game.time === "1:00 pm") {
            //disable all 1pm games after 1:00
            game.awayTeamDisabled = true;
            game.homeTeamDisabled = true;
          }
        } else if (currentDate > sundaySecondExpiredDate) {
          if (game.time === "4:05 pm") {
            //disable all 4:05pm games after 4:05
            game.awayTeamDisabled = true;
            game.homeTeamDisabled = true;
          }
        } else if (currentDate > sundayThirdExpiredDate) {
          if (game.time === "4:25pm") {
            //disable all 4:25pm games after 4:25
            game.awayTeamDisabled = true;
            game.homeTeamDisabled = true;
          }
        } else if (currentDate > sundayFourthExpiredDate) {
          if (game.time === "8:20pm" && game.tv === "NBC") {
            //disable SNF game after 8:20
            game.awayTeamDisabled = true;
            game.homeTeamDisabled = true;
          }
        }
      }
      // disable sunday games end
      // disable sunday 1pm game start
      // disable monday game start
      if (dayOfTheWeek === 1) {
        let mondayExpiredDate = new Date(year, month, date, 20, 15); // 8:15 PM
        let currentDate = new Date();
        if (currentDate > mondayExpiredDate) {
          //disable MNF game after 8:15
          if (game.time === "8:15pm" && game.tv === "ESPN") {
            game.awayTeamDisabled = true;
            game.homeTeamDisabled = true;
          }
        } else if (game.time !== "8:15pm" && game.tv !== "ESPN")  {
            game.awayTeamDisabled = true;
            game.homeTeamDisabled = true;
        }
      }
      // disable monday game end
    });
  };
  const getUpdatedSchedule = () => {
    let currentPicks = entries.find(
      (entry) => entry.name === nameSelected
    ).picks;
    let loopArr = [];
    arr.forEach((game) => {
      if (game.homeTeam) {
        checkTeam(currentPicks, game);
      }
      loopArr.push(game);
    });
    return arr;
  };
  useEffect(() => {
    if (!modalArr.length) {
      let finalArr = getUpdatedSchedule();
      setModalArr(finalArr);
    }
    // eslint-disable-next-line
  }, [modalArr.length]);
  const closeModal = () => {
    setModalArr([]);
    arr.forEach((game) => {
      game.awayTeamDisabled = false;
      game.homeTeamDisabled = false;
    });
    props.toggleModal();
  };
  const selectTeam = (name) => {
    setSelectedTeam(name);
  };
  const saveSelection = async () => {
    console.log(findTeamAbbrev(selectedTeam));
    //get entry of current nameSelected
    let findArr = entries.find((entry) => entry.name === nameSelected);
    console.log(findArr);
    //add to picks arr current {teamChosen: selectedTeam, isCorrect: null} and
    findArr.picks.push({
      teamChosen: findTeamAbbrev(selectedTeam),
      isCorrect: null,
    });
    const entryRef = doc(db, "Entries", nameSelected);
    try {
      await updateDoc(entryRef, {
        picks: findArr.picks,
      });
      closeModal();
    } catch (error) {
      console.log(error);
      alert("Pick Did Not Save - Contact Giusseppe");
    } finally {
      alert("Entry Saved Good Luck!");
    }
  };

  return (
    <div className="modal" id="modal">
      <h2>{nameSelected}'s Pick</h2>
      <div className="content">
        {modalArr.map((game) =>
          game.time ? (
            <SelectCard
              game={game}
              allGames={allGames}
              week={week}
              selectTeam={selectTeam}
            />
          ) : null
        )}
      </div>
      <h1>Selected Team To Win - {selectedTeam}</h1>
      <div className="actions">
        <button className="toggle-button" onClick={() => closeModal()}>
          Close
        </button>
        <button className="toggle-button" onClick={() => saveSelection()}>
          Save
        </button>
      </div>
    </div>
  );
}
