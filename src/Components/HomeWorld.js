import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import alertify from "alertifyjs";

export default function HomeWorld(props) {
  const [homeWorld, setHomeWorld] = useState([]);

  useEffect(() => {
    getHomeWorlds();
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
          <ListGroupItem
            active={world.worldName === props.currentWorld}
            onClick={() => props.changeWorld(world)}
            key={world.id}
          >
            {world.worldName}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
