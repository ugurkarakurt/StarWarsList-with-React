import React, { Component } from "react";
import AddCharacter from "../Components/AddCharacter";

export default class Add extends Component {
  render() {
    const { getCharacters } = this.props;
    return (
      <div>
        <AddCharacter getCharacters={getCharacters} />
      </div>
    );
  }
}
