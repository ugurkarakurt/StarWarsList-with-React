import React, { useContext } from "react";
import CharTable from "./CharTable";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

import { currentWorldContext } from "../Store";
import { charactersContext } from "../Store";

export default function Characters(props) {
  const [currentWorld, setCurrentWorld] = useContext(currentWorldContext);
  const [characters, setCharacters] = useContext(charactersContext);

  return (
    <div className="section">
      <div className="title-wrapper">
        <h3>Characters / {currentWorld}</h3>
        <Link className="addButton" title="Add New Character" to="add">
          <i className="fab fa-jedi-order"></i>
        </Link>
      </div>
      <main>
        {characters.map((character) => (
          <CharTable getCharacters= {props.getCharacters} key={character.id} character={character} />
        ))}
      </main>
    </div>
  );
}
