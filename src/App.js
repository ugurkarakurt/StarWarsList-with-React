import React, { useContext, useEffect } from "react";
import Navi from "./Components/Navi";
import HomeWorld from "./Components/HomeWorld";
import Routes from "./Routes";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";

import { currentWorldContext } from "./Store";
import { charactersContext } from "./Store";

const App = () => {
  const [currentWorld, setCurrentWorld] = useContext(currentWorldContext);
  const [characters, setCharacters] = useContext(charactersContext);

  const changeWorld = (worldName) => {
    setCurrentWorld(worldName.worldName);
    getCharacters(worldName.id);
  };
  const getCharacters = (worldId) => {
    let url = "http://localhost:3000/results";
    if (worldId) {
      url += "?homeworld=" + worldId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => {
        alertify.error("Something went wrong.");
        console.log(error);
      });
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div>
      <Navi changeWorld={changeWorld} />
      <Container>
        <Row>
          <Col xs="3">
            <HomeWorld changeWorld={changeWorld} />
          </Col>
          <Col xs="9">
            <Routes getCharacters={getCharacters} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
