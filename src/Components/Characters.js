import React, { useState, useContext, useEffect } from "react";
import CharTable from "./CharTable";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

import saber from "./saber.png";
import darth from "./darth.png";

import { currentWorldContext } from "../Store";
import { charactersContext } from "../Store";

export default function Characters() {
  const [currentWorld, setCurrentWorld] = useContext(currentWorldContext);
  const [characters, setCharacters] = useContext(charactersContext);

  const getCharacters = (worldId) => {
    let url = "http://localhost:3000/results";
    if (worldId) {
      url += "?homeworld=" + worldId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => {
        alertify.error("Something went wrong.");
        console.log(error);
      });
  };

  useEffect(() => {
    getCharacters(currentWorld.id);
    return () => {
      getCharacters(currentWorld.id);
    };
  }, []);

  return (
    <div className="section">
      <div className="title-wrapper">
        <h3>Characters / {currentWorld}</h3>
        <Link className="addButton" title="Add New Character" to="add">
          <i className="fab fa-jedi-order"></i>
        </Link>
      </div>
      <main>
        {characters.length === 0 ? (
          <div>
            <img src={darth} alt="" />
            <img src={saber} alt="" />
          </div>
        ) : (
          characters.map((character) => (
            <CharTable key={character.id} character={character} />
          ))
        )}
      </main>
    </div>
  );
}
