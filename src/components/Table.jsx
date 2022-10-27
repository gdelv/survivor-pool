import React, { useState } from "react";
import Loading from "../components/Loading";
import Modal from "./Modal";

export default function Table(props) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [nameSelected, setNameSelected] = useState("");
  const {
    entries,
    londonGame,
    thursdayGame,
    firstWindowGames,
    secondWindowGames,
    snfGame,
    mnfGame,
    allGames,
    week,
  } = props;
  const STARTING_SURVIVOR_WEEK = 8; //Starting week 8
  const renderWeekColumns = (num) => {
    let arr = [];
    for (let i = STARTING_SURVIVOR_WEEK; i < num + 1; i++) {
      arr.push(<th style={{ width: "5%" }}>Week {i}</th>);
    }
    return arr;
  };
  const toggleModal = (name) => {
    setisModalOpen(!isModalOpen);
    //pass name of row clicked
    setNameSelected(name);
  };
  const renderModalLink = (arr, isEliminated) => {
    let finalArr = [];
    let currentWeek = week;
    for (let i = STARTING_SURVIVOR_WEEK; i < currentWeek + 1; i++) {
      //current week = 6
      // render 5x
      let pick = arr.picks[i - STARTING_SURVIVOR_WEEK];
      //if pick is found in the entry.picks arr
      if (pick) {
        finalArr.push(
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
        );
      } else if (pick === undefined && !isEliminated) {
        finalArr.push(
          <td>
            <button onClick={() => toggleModal(arr.name)}>Select</button>
          </td>
        );
      } else if (pick && isEliminated) {
        finalArr.push(
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
        );
      }
    }
    return finalArr;
  };
  return (
    <>
      <table className="data-table" id="pick-table">
        {entries ? (
          <tr>
            <th style={{ width: "9%" }}></th>
            {renderWeekColumns(week)}
          </tr>
        ) : null}

        {entries ? (
          entries.map((entry) => (
            <tr key={entry.name}>
              <td className={entry.isEliminated ? "eliminated__team" : "cell"}>
                {entry.name}
              </td>
              {renderModalLink(entry, entry.isEliminated)}
            </tr>
          ))
        ) : (
          <Loading loadingMsg="Loading entries..." />
        )}
      </table>
      {isModalOpen ? (
        <Modal
          toggleModal={() => toggleModal()}
          londonGame={londonGame}
          thursdayGame={thursdayGame}
          firstWindowGames={firstWindowGames}
          secondWindowGames={secondWindowGames}
          snfGame={snfGame}
          mnfGame={mnfGame}
          allGames={allGames}
          week={week}
          entries={entries}
          nameSelected={nameSelected}
        />
      ) : null}
    </>
  );
}
