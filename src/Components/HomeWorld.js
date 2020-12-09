import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
// import { ListGroup, ListGroupItem, select } from "reactstrap";

export default class HomeWorld extends Component {
  state = {
    homeWorld: [],
  };

  componentDidMount() {
    this.getHomeWorlds();
  }

  getHomeWorlds = () => {
    fetch("http://localhost:3000/homeWorlds")
      .then((response) => response.json())
      .then((data) => this.setState({ homeWorld: data }));
  };

  render() {
    return (
      <div>
        <h5>{this.props.info.title}</h5>
        <hr />
        <ListGroup>
          {this.state.homeWorld.map((world) => (
            <ListGroupItem
              active={world.worldName === this.props.currentWorld}
              onClick={() => this.props.changeWorld(world)}
              key={world.id}
            >
              {world.worldName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
