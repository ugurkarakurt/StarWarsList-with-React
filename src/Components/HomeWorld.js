import React, { useState, useEffect, useContext } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

import { currentWorldContext } from "../Store";
import { homeWorldContext } from "../Store";

export default function HomeWorld() {
  const [homeWorld, setHomeWorld] = useContext(homeWorldContext);
  const [currentWorld, setCurrentWorld] = useContext(currentWorldContext);

  const changeWorld = (worldName) => {
    setCurrentWorld(worldName.worldName);
  };

  useEffect(() => {
    getHomeWorlds(currentWorld);
  }, []);

  const getHomeWorlds = () => {
    fetch("http://localhost:3000/homeWorlds")
      .then((response) => response.json())
      .then((data) => {
        setHomeWorld(data);
      })
      .catch((error) => {
        alertify.success("Something went wrong.");
        console.log(error);
      });
  };

  return (
    <div className="home-world">
      <h5>Home Worlds</h5>
      <hr />
      <ListGroup>
        {homeWorld.map((world) => (
          <Link to="/" key={world.id}>
            <ListGroupItem
              active={world.worldName === currentWorld.name}
              onClick={() => changeWorld(world)}
            >
              {world.worldName}
            </ListGroupItem>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
}
