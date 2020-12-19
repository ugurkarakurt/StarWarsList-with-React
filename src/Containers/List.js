import React, { Component } from "react";
import Characters from "../Components/Characters";

export default class List extends Component {
  render() {
    const { getCharacters } = this.props;
    return (
      <div>
       <Characters
          getCharacters={getCharacters}
        />
      </div>
    );
  }
}
