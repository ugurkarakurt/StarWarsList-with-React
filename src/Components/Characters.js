import React, { Component } from "react";
import CharTable from "./CharTable";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
export default class Characters extends Component {
  state = {
    updateChar: "",
  };

  deleteOrEditCharacter = (e) => {
    if (e.target.className === "fas fa-trash") {
      let url = `http://localhost:3000/results/${e.target.previousElementSibling.previousElementSibling.textContent}`;
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
    } else if (e.target.className === "fas fa-edit") {
      alertify.warning("Click on the line to edit.");
      e.target.parentElement.parentElement.contentEditable = true;
      e.target.parentElement.contentEditable = false;
      this.setState({
        updateChar: e.target.parentElement.parentElement.children,
      });

      e.target.parentElement.parentElement.addEventListener("focusin", () => {
        e.target.parentElement.parentElement.style.background =
          "linear-gradient(141deg, #ffd369 0%, transparent 80%)";
        e.target.parentElement.parentElement.style.fontStyle = "italic";
      });

      e.target.parentElement.parentElement.addEventListener("focusout", () => {
        alertify.success("Saved successfully.");
        let url = `http://localhost:3000/results/${e.target.previousElementSibling.textContent}`;

        console.log(this.state.updateChar);
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.state.updateChar[7].children[0].innerHTML,
            birth_year: this.state.updateChar[0].innerHTML,
            eye_color: this.state.updateChar[1].innerHTML,
            hair_color: this.state.updateChar[2].innerHTML,
            skin_color: this.state.updateChar[3].innerHTML,
            height: this.state.updateChar[4].innerHTML,
            mass: this.state.updateChar[5].innerHTML,
            gender: this.state.updateChar[6].innerHTML,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            e.target.parentElement.parentElement.contentEditable = false;
            console.log(data);
          })
          .catch((error) => {
            alertify.success("Something went wrong.");
            console.log(error);
          });

        e.target.parentElement.parentElement.style.background = null;
        e.target.parentElement.parentElement.style.fontStyle = null;
      });
    }
  };

  render() {
    console.log(this.props);
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
                deleteOrEditCharacter={this.deleteOrEditCharacter}
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
