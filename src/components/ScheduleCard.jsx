import React from "react";

export default function ScheduleCard(props) {
  const getTeamRecord = (teamStr) => {
    let team = props.allGames.find((game) => game.teamCity === teamStr);
    // console.log(team);
    if (team) {
      let recordColor =
        props.week - team.wins < 2
          ? "gold"
          : props.week - team.wins < 3
          ? "red"
          : props.week - team.wins < 4
          ? "green"
          : "deepskyblue";
      if (team.ties > 0) {
        return (
          <span
            style={{ color: recordColor }}
          >{`${team.wins}-${team.ties}-${team.loss}`}</span>
        );
      } else
        return (
          <span
            style={{ color: recordColor }}
          >{`${team.wins}-${team.loss}`}</span>
        );
    }
  };
//   const getTeamAttribute = (teamStr, property) => {
//     let team = props.allGames.find((game) => game.teamCity === teamStr);
//     let propertyStr =
//       property === "pf"
//         ? "Points For"
//         : property === "pa"
//         ? "Points Against"
//         : property === "streak"
//         ? "Streak"
//         : property === "home"
//         ? "Home Record"
//         : property === "road"
//         ? "Road Record"
//         : null;
//     // console.log(team);
//     if (team) {
//       return <>{`${propertyStr} - ${team[property]}`}</>;
//     }
//   };
  return (
    <>
      <div>
        <p>
          <b>
            {props.game.awayTeam} ({getTeamRecord(props.game.awayTeam)})
          </b>
        </p>
        {/* <p>{getTeamAttribute(props.game.awayTeam, "pf")}</p>
        <p>{getTeamAttribute(props.game.awayTeam, "pa")}</p>
        <p>{getTeamAttribute(props.game.awayTeam, "streak")}</p>
        <p>{getTeamAttribute(props.game.awayTeam, "home")}</p>
        <p>{getTeamAttribute(props.game.awayTeam, "road")}</p> */}
      </div>
      {/* <br></br> */}
      <p>@</p>
      {/* <br></br> */}
     <div>
        <p>
          <b>
            {props.game.homeTeam} ({getTeamRecord(props.game.homeTeam)})
          </b>
        </p>
        {/* <p>{getTeamAttribute(props.game.homeTeam, "pf")}</p>
        <p>{getTeamAttribute(props.game.homeTeam, "pa")}</p>
        <p>{getTeamAttribute(props.game.homeTeam, "streak")}</p>
        <p>{getTeamAttribute(props.game.homeTeam, "home")}</p>
        <p>{getTeamAttribute(props.game.homeTeam, "road")}</p> */}
        <h6>{props.game.ticketPrices}</h6>
        <h6>
          {props.game.time} ({props.game.tv})
        </h6>
        <h6>{props.venue}</h6>
      </div>
    </>
  );
}
