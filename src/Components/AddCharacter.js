import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

export default class AddCharacter extends Component {
  state = {
    name: "",
    eye_color: "",
    height: "",
  };

  addCharacter = (e) => {
    e.preventDefault();

    let url = "http://localhost:3000/results";

    if (
      (this.state.name === "",
      this.state.eye_color === "",
      this.state.height === "")
    ) {
      alert();
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
          alertify.success("Something went wrong.");
          console.log(error);
        });
    }
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Link to="/">
          <button className="back">Back</button>
        </Link>
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

          <Button type="submit" onClick={this.addCharacter}></Button>
        </Form>
      </div>
    );
  }
}
