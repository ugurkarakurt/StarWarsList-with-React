import React, { Component } from "react";
import CharTable from "./CharTable";

export default class Characters extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>
          {this.props.info.title} {this.props.currentWorld}
        </h1>
        {this.props.characters.map((character) => {
          return (
            <CharTable
              key={character.id}
              name={character.name}
              id={character.id}
              birth_year={character.birth_year}
              eye_color={character.eye_color}
              gender={character.gender}
              hair_color={character.hair_color}
              skin_color={character.skin_color}
              height={character.height}
              mass={character.mass}
              homeworld={character.homeworld}
            />
          );
        })}
      </div>
    );
  }
}
