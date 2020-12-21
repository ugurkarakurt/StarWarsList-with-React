import React, { useContext } from "react";
import CharTable from "./CharTable";
import { Link } from "react-router-dom";
import saber from "./saber.png";
import darth from "./darth.png";

import { currentWorldContext } from "../Store";
import { charactersContext } from "../Store";

export default function Characters(props) {
  const [currentWorld] = useContext(currentWorldContext);
  const [characters] = useContext(charactersContext);
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
            <CharTable
              key={character.id}
              getCharacters={props.getCharacters}
              character={character}
            />
          ))
        )}
      </main>
    </div>
  );
}
