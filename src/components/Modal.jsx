import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {doc, updateDoc } from 'firebase/firestore'
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
    let findArr = entries.find(entry => entry.name === nameSelected)
    console.log(findArr);
    //add to picks arr current {teamChosen: selectedTeam, isCorrect: null} and
    findArr.picks.push({
      teamChosen: findTeamAbbrev(selectedTeam),
      isCorrect: null
    })
    const entryRef = doc(db, "Entries", nameSelected);
    await updateDoc(entryRef, {
        picks: findArr.picks
    });
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
