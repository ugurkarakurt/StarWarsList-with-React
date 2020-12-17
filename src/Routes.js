import React, { Component } from "react";

import Characters from "./Components/Characters";
import AddCharacter from "./Components/AddCharacter";
import NotFound from "./Components/NotFound";
import { Route, Switch } from "react-router-dom";

export default class Routes extends Component {
  render() {
    const { characters, currentWorld, getCharacters, info } = this.props;

    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Characters
                {...props}
                getCharacters={getCharacters}
                currentWorld={currentWorld}
                info={info}
                characters={characters}
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddCharacter {...props} getCharacters={getCharacters} />
            )}
          />
          <Route exact path="/" component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}
