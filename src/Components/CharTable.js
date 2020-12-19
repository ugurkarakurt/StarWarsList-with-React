//Necessary import operations
import React, { useState, useContext } from "react";
import { Table } from "reactstrap";
import alertify from "alertifyjs";
import posed from "react-pose";

// To use React hooks, we have to use a functional component.
const Chartable = (props) => {
  //The state required to open the rows
  const [isVisible, setIsVisible] = useState(false);
  //The state required to edit the td
  const [updateRow, setUpdateRow] = useState(0);

  //Animation to show cards
  const Animation = posed.div({
    visible: { height: "auto", opacity: 1, applyAtStart: { display: "block" } },
    hidden: { height: 0, opacity: 0, applyAtEnd: { display: "none" } },
  });

  //this Function showing cards when clicked on the title.
  const showInfo = (e) => {
    setIsVisible(!isVisible);
    if (isVisible) {
      e.target.classList.remove("titleActive");
      alertify.dismissAll();
      setUpdateRow(0);
    } else {
      alertify
        .warning("You can edit it by 'double clicking' the row", 9999)
        .dismissOthers();
      e.target.classList.add("titleActive");
    }
  };
  //The function that makes it editable by clicking on td.
  // (I keep the element with e.target.)
  const updateTD = (e) => {
    if (e.target.tagName === "TD") {
      e.target.contentEditable = true;
      e.target.addEventListener("focusin", () => {
        e.target.style.background =
          "linear-gradient(141deg, #b9bec5 0%, transparent 80%)";
        e.target.style.fontStyle = "italic";
      });
      e.target.addEventListener("focusout", () => {
        e.target.style.borderBottom = "1px solid #d7a809 ";
        e.target.style.background = "transparent";
        e.target.style.fontStyle = "italic";
        setUpdateRow(1);
      });

      if (e.target.className === "action") {
        e.target.contentEditable = false;
      }
    }
  };
  //The function that sends the update request after editing
  const updateState = (char, element) => {
    let url = `http://localhost:3000/results/${char.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: element.children[7].children[1].innerHTML,
        id: char.id,
        birth_year: element.children[0].innerHTML,
        eye_color: element.children[1].innerHTML,
        hair_color: element.children[2].innerHTML,
        skin_color: element.children[3].innerHTML,
        height: element.children[4].innerHTML,
        mass: element.children[5].innerHTML,
        gender: element.children[6].innerHTML,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.getCharacters();
        setUpdateRow(0);
        alertify.success("Saved successfully.");
      })
      .catch((error) => {
        alertify.success("Something went wrong.");
        console.log(error);
      });
  };

  //The function that sends the request to delete
  const removeCharacter = (id) => {
    let url = `http://localhost:3000/results/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((reponse) => {
        props.getCharacters();
        alertify.success("Successfully deleted.").dismissOthers();
      })
      .catch((error) => {
        alertify.success("Something went wrong.").dismissOthers();
        console.log(error);
      });
  };

  return (
    <div className="card animate__animated animate__bounceInUp ">
      <div onClick={showInfo} className="card-header">
        <h5>
          {props.character.name} &nbsp;
          {isVisible ? null : <i className="fas fa-caret-down"></i>}
        </h5>
      </div>
      <Animation pose={isVisible ? "visible" : "hidden"}>
        <div className="card-body ">
          <Table className="table table-borderless">
            <thead>
              <tr>
                <th>Birth Year</th>
                <th>Eye Color</th>
                <th>Hair Color</th>
                <th>Skin Color</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={updateTD}>
                <td>{props.character.birth_year}</td>
                <td>{props.character.eye_color}</td>
                <td>{props.character.hair_color}</td>
                <td>{props.character.skin_color}</td>
                <td>{props.character.height}</td>
                <td>{props.character.mass}</td>
                <td>{props.character.gender}</td>
                <td className="action">
                  <i style={{ display: "none" }}>{props.character.id}</i>
                  <i style={{ display: "none" }}>{props.character.name}</i>
                  {updateRow === 1 ? (
                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        updateState(
                          props.character,
                          e.target.parentElement.parentElement
                        );
                      }}
                      className="fas fa-edit animate__animated animate__bounceIn"
                    ></i>
                  ) : null}
                  <i
                    onClick={() => {
                      removeCharacter(props.character.id);
                    }}
                    className="fas fa-trash"
                  ></i>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Animation>
    </div>
  );
};

export default Chartable;
