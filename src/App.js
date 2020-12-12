import React, { Component } from "react";

import Navi from "./Components/Navi";
import HomeWorld from "./Components/HomeWorld";
import Characters from "./Components/Characters";
import AddCharacter from "./Components/AddCharacter";
import NotFound from "./Components/NotFound";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import alertify from "alertifyjs";

export default class App extends Component {
  state = {
    currentWorld: "",
    characters: [],
  };

  changeWorld = (worldName) => {
    this.setState({
      currentWorld: worldName.worldName,
    });
    this.getCharacters(worldName.id);
  };

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters = (worldId) => {
    let url = "http://localhost:3000/results";
    if (worldId) {
      url += "?homeworld=" + worldId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          characters: data,
        })
      )
      .catch((error) => {
        alertify.success("Something went wrong.");
        console.log(error);
      });
  };

  render() {
    let worldInfo = {
      title: "Home Worlds",
    };

    let charsInfo = {
      title: "Characters",
    };

    return (
      <div>
        <Navi />
        <Container>
          <Row>
            <Col xs="3">
              <HomeWorld
                currentWorld={this.state.currentWorld}
                changeWorld={this.changeWorld}
                info={worldInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Characters
                      {...props}
                      search={this.state.search}
                      getCharacters={this.getCharacters}
                      currentWorld={this.state.currentWorld}
                      info={charsInfo}
                      characters={this.state.characters}
                    />
                  )}
                />
                <Route
                  exact
                  path="/add"
                  render={(props) => (
                    <AddCharacter
                      {...props}
                      getCharacters={this.getCharacters}
                    />
                  )}
                />
                <Route exact path="/" component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
