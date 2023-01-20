import React from "react";

export default function SelectCard(props) {
  const { allGames, week, game, selectTeam } = props;
  const getTeamRecord = (teamStr) => {
    let team = allGames.find((game) => game.teamCity === teamStr);
    if (team) {
      let recordColor =
        week - team.wins < 2
          ? "gold"
          : week - team.wins < 3
          ? "red"
          : week - team.wins < 4
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
  const handleChange = (e) => {
    let team = e.target.value;
    selectTeam(team);
  };
  return (
    <>
      <fieldset>
        <input
          type="radio"
          id={game.awayTeam}
          name="team"
          value={game.awayTeam}
          onChange={handleChange}
          disabled={
            game.awayTeamDisabled !== undefined ? game.awayTeamDisabled : false
          }
        />
        <label htmlFor={game.awayTeam}>
          {game.awayTeam} ({getTeamRecord(game.awayTeam)})
        </label>
        <span> @ </span>
        <input
          type="radio"
          id={game.homeTeam}
          name="team"
          value={game.homeTeam}
          onChange={handleChange}
          disabled={
            game.homeTeamDisabled !== undefined ? game.homeTeamDisabled : false
          }
        />
        <label htmlFor={game.homeTeam}>
          {game.homeTeam} ({getTeamRecord(game.homeTeam)})
        </label>
      </fieldset>
    </>
  );
}
