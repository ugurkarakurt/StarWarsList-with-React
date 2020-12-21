import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import alertify from "alertifyjs";

import { homeWorldContext } from "../Store";

export default function AddCharacter(props) {
  const [homeWorld, setHomeWorld] = useContext(homeWorldContext);

  let history = useHistory();

  const [state, setState] = useState({
    name: "",
    birth_year: "",
    eye_color: "",
    skin_color: "",
    hair_color: "",
    height: "",
    mass: "",
    gender: "",
    homeworld: "",
  });

  const addCharacter = (e) => {
    e.preventDefault();

    let url = "http://localhost:3000/results";

    if (
      state.name &&
      state.birth_year &&
      state.eye_color &&
      state.skin_color &&
      state.hair_color &&
      state.height &&
      state.mass &&
      state.gender &&
      state.height &&
      state.homeworld
    ) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then((data) => {
          setState({
            name: "",
            birth_year: "",
            eye_color: "",
            skin_color: "",
            hair_color: "",
            height: "",
            mass: "",
            gender: "",
            homeworld: "",
          });
          alertify.success("Saved Successfully.");
          props.getCharacters();
          history.push("/");
        })
        .catch((error) => {
          alertify.success("Something went wrong.");
          console.log(error);
        });
    } else {
      alertify.error("Fill in all inputs.");
    }
  };

  const onChangeInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="addCharacter">
      <div className="backBTN">
        <Link to="/">
          <button className="btn">
            <i className="fas fa-arrow-left"></i>
          </button>
        </Link>
      </div>
      <Form>
        <FormGroup>
          <Label className="animate__animated animate__slideInUp" for="name">
            Name
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="text"
            name="name"
            placeholder="Enter a name"
            value={state.name}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label className="animate__animated animate__slideInUp" for="height">
            Birth Year
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="text"
            name="birth_year"
            placeholder="Enter a Birth Year"
            value={state.birth_year}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label
            className="animate__animated animate__slideInUp"
            for="eye_color"
          >
            Eye Color
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="text"
            name="eye_color"
            placeholder="Enter a eye color"
            value={state.eye_color}
            onChange={onChangeInput}
          />
        </FormGroup>

        <FormGroup>
          <Label className="animate__animated animate__slideInUp" for="height">
            Hair Color
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="text"
            name="hair_color"
            placeholder="Enter a Hair Color"
            value={state.hair_color}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label className="animate__animated animate__slideInUp" for="height">
            Skin Color
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="text"
            name="skin_color"
            placeholder="Enter a Skin Color"
            value={state.skin_color}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label className="animate__animated animate__slideInUp" for="height">
            Height
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="number"
            name="height"
            placeholder="Enter a height"
            value={state.height}
            onChange={onChangeInput}
          />
        </FormGroup>

        <FormGroup>
          <Label className="animate__animated animate__slideInUp" for="height">
            Mass
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="number"
            name="mass"
            placeholder="Enter a Mass"
            value={state.mass}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label className="animate__animated animate__slideInUp" for="height">
            Gender
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="text"
            name="gender"
            placeholder="Enter a Gender"
            value={state.gender}
            onChange={onChangeInput}
          />
        </FormGroup>
        <FormGroup>
          <Label
            className="animate__animated animate__slideInUp"
            for="exampleSelect"
          >
            Home World
          </Label>
          <Input
            className="animate__animated animate__slideInUp"
            type="select"
            name="homeworld"
            placeholder="Enter a Home World"
            value={state.homeworld}
            onChange={onChangeInput}
          >
            <option value="-">-</option>
            {homeWorld.map((homeWorld) => (
              <option key={homeWorld.id} value={homeWorld.id}>
                {homeWorld.worldName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <div className="button-wrapper">
          <Link to="/">
            <button
              className="btn"
              onClick={(e) => {
                addCharacter(e);
              }}
            >
              <i className="fab fa-sith"></i>
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
