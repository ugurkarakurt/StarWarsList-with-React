import React, { Component } from "react";

import List from "./Containers/List";
import Add from "./Containers/Add";
import NotFound from "./Components/NotFound";
import { Route, Switch } from "react-router-dom";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <List />} />
          <Route exact path="/add" render={() => <Add />} />
          <Route exact path="/" component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}
