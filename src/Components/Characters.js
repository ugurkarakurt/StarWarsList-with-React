import React, { Component } from "react";
import CharTable from "./CharTable";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
export default class Characters extends Component {
  state = {
    name: "",
    id: "",
    birth_year: "",
    eye_color: "",
    hair_color: "",
    skin_color: "",
    height: "",
    mass: "",
    gender: "",
    element: "",
  };

  removeCharacter = (id) => {
    let url = `http://localhost:3000/results/${id}`;
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(this.state),
    })
      .then((reponse) => {
        alertify.success("Successfully deleted.");
        this.props.getCharacters();
      })
      .catch((error) => {
        alertify.success("Something went wrong.");
        console.log(error);
      });
  };

  updateState = (id, element) => {
    alertify.warning("Click on the line to edit.");
    element.contentEditable = true;

    element.addEventListener("focusin", () => {
      element.style.background =
        "linear-gradient(141deg, #b9bec5 0%, transparent 80%)";
      element.style.fontStyle = "italic";
    });
    element.addEventListener("focusout", () => {
      this.setState({
        name: element.children[7].children[0].innerHTML,
        id: id,
        birth_year: element.children[0].innerHTML,
        eye_color: element.children[1].innerHTML,
        hair_color: element.children[2].innerHTML,
        skin_color: element.children[3].innerHTML,
        height: element.children[4].innerHTML,
        mass: element.children[5].innerHTML,
        gender: element.children[6].innerHTML,
      });

      alertify.success("Saved successfully.");

      element.contentEditable = false;
      element.style.background = null;
      element.style.fontStyle = null;

      let url = `http://localhost:3000/results/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.name,
          birth_year: this.state.birth_year,
          eye_color: this.state.eye_color,
          hair_color: this.state.hair_color,
          skin_color: this.state.skin_color,
          height: this.state.height,
          mass: this.state.mass,
          gender: this.state.gender,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.props.getCharacters();
          alertify.success("Saved successfully.");
        })
        .catch((error) => {
          alertify.success("Something went wrong.");
          console.log(error);
        });
    });
  };

  render() {
    return (
      <div className="section">
        <div className="title-wrapper">
          <h3>
            {this.props.info.title} / {this.props.currentWorld}
          </h3>
          <Link className="addButton" title="Add New Character" to="add">
            <i className="fab fa-jedi-order"></i>
          </Link>
        </div>
        <main>
          {this.props.characters.map((character) => {
            return (
              <CharTable
                removeCharacter={this.removeCharacter}
                updateState={this.updateState}
                key={character.id}
                name={character.name}
                id={character.id}
                birth_year={character.birth_year}
                eye_color={character.eye_color}
                gender={character.gender}
                hair_color={character.hair_color}
                skin_color={character.skin_color}
                height={character.height}
                mass={character.mass}
                homeworld={character.homeworld}
              />
            );
          })}
        </main>
      </div>
    );
  }
}
