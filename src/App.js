import React, { useContext, useEffect } from "react";
import Navi from "./Components/Navi";
import HomeWorld from "./Components/HomeWorld";
import Routes from "./Routes";
import { Container, Row, Col } from "reactstrap";

const App = () => {
  return (
    <div>
      <Navi />
      <Container>
        <Row>
          <Col xs="3">
            <HomeWorld />
          </Col>
          <Col xs="9">
            <Routes />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
