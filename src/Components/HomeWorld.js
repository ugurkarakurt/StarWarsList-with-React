import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import alertify from "alertifyjs";


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
      .then((data) => this.setState({ homeWorld: data }))
      .catch((error) => {
        alertify.success("Something went wrong.");
        console.log(error);
      });
  };

  render() {
    return (
      <div className="home-world">
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
