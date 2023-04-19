export const PlayerInfo = ({ player }) => {
    if (Object.keys(player).length === 0) {
      return null;
    }
  
    return (
      <div>
        <h2>{player.name}</h2>
        <p>ID: {player.id}</p>
        <img src={player.image} alt={`${player.name} photo`} />
        <p>Image src: {player.image}</p>
        <p>{player.position}</p>
        <p>Date of birth: {player.date_of_birth}</p>
        <p>Wiki Link: <a target="_" href={`https://en.wikipedia.org/wiki/${player.wiki_link}`}>Wikipedia</a></p>
      </div>
    );
  };
