import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

export default class AddCharacter extends Component {
  state = {
    name: "",
    birth_year: "",
    eye_color: "",
    skin_color: "",
    hair_color: "",
    height: "",
    mass: "",
    gender: "",
    homeworld: "",
    homeWorlds: [],
  };

  addCharacter = (e) => {
    e.preventDefault();

    let url = "http://localhost:3000/results";

    if (
      (this.state.name === "",
      this.state.birth_year === "",
      this.state.eye_color === "",
      this.state.skin_color === "",
      this.state.hair_color === "",
      this.state.height === "",
      this.state.mass === "",
      this.state.gender === "",
      this.state.height === "",
      this.state.homeworld === "")
    ) {
      alertify.error("Fill in all inputs.");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((response) => response.json())
        .then((data) => this.props.getCharacters())
        .catch((error) => {
          alertify.success("Saved Successfully.");
          console.log(error);
        });
    }
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount = () => {
    this.addHomeWorldSelect();
  };

  addHomeWorldSelect = () => {
    fetch("http://localhost:3000/homeWorlds")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          homeWorlds: data,
        })
      );
  };

  render() {
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
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter a name"
              value={this.state.name}
              onChange={this.onChangeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="height">Birth Year</Label>
            <Input
              type="text"
              name="birth_year"
              placeholder="Enter a Birth Year"
              value={this.state.birth_year}
              onChange={this.onChangeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="eye_color">Eye Color</Label>
            <Input
              type="text"
              name="eye_color"
              placeholder="Enter a eye color"
              value={this.state.eye_color}
              onChange={this.onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="height">Hair Color</Label>
            <Input
              type="text"
              name="hair_color"
              placeholder="Enter a Hair Color"
              value={this.state.hair_color}
              onChange={this.onChangeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="height">Skin Color</Label>
            <Input
              type="text"
              name="skin_color"
              placeholder="Enter a Skin Color"
              value={this.state.skin_color}
              onChange={this.onChangeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="height">Height</Label>
            <Input
              type="text"
              name="height"
              placeholder="Enter a height"
              value={this.state.height}
              onChange={this.onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="height">Mass</Label>
            <Input
              type="text"
              name="mass"
              placeholder="Enter a Mass"
              value={this.state.mass}
              onChange={this.onChangeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="height">Gender</Label>
            <Input
              type="text"
              name="gender"
              placeholder="Enter a Gender"
              value={this.state.gender}
              onChange={this.onChangeInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Home World</Label>
            <Input
              type="select"
              name="homeworld"
              placeholder="Enter a Home World"
              value={this.state.homeworld}
              onChange={this.onChangeInput}
            >
              {this.state.homeWorlds.map((homeWorld) => (
                <option key={homeWorld.id} value={homeWorld.id}>
                  {homeWorld.worldName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <div className="button-wrapper">
            <button className="btn" type="submit" onClick={this.addCharacter}>
              Add a new character
            </button>
          </div>
        </Form>
      </div>
    );
  }
}
