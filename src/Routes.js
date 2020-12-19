import React, { Component } from "react";

import List from "./Containers/List";
import Add from "./Containers/Add";
import NotFound from "./Components/NotFound";
import { Route, Switch } from "react-router-dom";

export default class Routes extends Component {
  render() {
    const { characters, currentWorld, getCharacters } = this.props;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <List
                {...props}
                getCharacters={getCharacters}
                currentWorld={currentWorld}
                characters={characters}
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={(props) => (
              <Add {...props} getCharacters={getCharacters} />
            )}
          />
          <Route exact path="/" component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}
