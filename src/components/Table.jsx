import React from 'react'
import Loading from "../components/Loading";

export default function Table(props) {
    const renderWeekColumns = (num) => {
        let arr = []
        for (let i = 2; i < num + 1; i++) {
            arr.push(<th style={{ width: "5%" }}>Week {i}</th>) 
        }
        return arr
    }
  return (
    <table className='data-table'>
    {props.entries ? (
      <tr>
        <th style={{ width: "9%" }}></th>
        {renderWeekColumns(props.week)}
      </tr>
    ) : null}

    {props.entries ? (
      props.entries.map((entry) => (
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
      ))
    ) : (
      <Loading loadingMsg="Loading entries..."/>
    )}
  </table>  )
}
