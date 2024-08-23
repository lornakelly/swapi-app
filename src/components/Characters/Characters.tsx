/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";

function Characters() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "1234567890-SECRET-KEY";

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://swapi.dev/api/people/?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data fetched:", data);
          setData(data.results);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  function RenderList() {
    if (!data) return null;
    return (
      <ul>
        {data.map((character) => (
          <li>
            {character.name}
            <RenderDetails character={character} />
          </li>
        ))}
      </ul>
    );
  }

  function RenderDetails({ character }) {
    return (
      <div>
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>Hair Color: {character.hair_color}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      {loading && <p>Loading...</p>}
      <RenderList />
    </div>
  );
}

export default Characters;
