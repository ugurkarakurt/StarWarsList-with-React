import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import HomeWorld from "./Components/HomeWorld";
import Characters from "./Components/Characters";
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from "react-router-dom";

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
      .then((data) => this.setState({ characters: data }));
  };

  render() {
    let worldInfo = {
      title: "Home Worlds",
    };

    let charsInfo = {
      title: "Characters",
    };

    return (
      <div className="bg-black">
        <Container>
          <Row>
            <Navbar />
          </Row>
          <Row>
            <Col xs="3">
              <HomeWorld
                currentWorld={this.state.currentWorld}
                changeWorld={this.changeWorld}
                info={worldInfo}
              />
            </Col>
            <Col xs="9">
              <Characters
                currentWorld={this.state.currentWorld}
                info={charsInfo}
                characters={this.state.characters}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
