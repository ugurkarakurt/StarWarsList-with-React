import React, { Component } from "react";
import { Table } from "reactstrap";
import posed from "react-pose";

const Animation = posed.div({
  visible: { height: "auto", opacity: 1, applyAtStart: { display: "block" } },
  hidden: { height: 0, opacity: 0, applyAtEnd: { display: "none" } },
});
export default class CharTable extends Component {
  state = {
    isVisible: false,
  };

  showInfo = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
    if (this.state.isVisible) {
      e.target.classList.remove("titleActive");
    } else {
      e.target.classList.add("titleActive");
    }
  };

  render() {
    const {
      name,
      id,
      birth_year,
      eye_color,
      gender,
      hair_color,
      skin_color,
      height,
      mass,
      removeCharacter,
      updateState,
    } = this.props;

    return (
      <div className="card">
        <div onClick={this.showInfo} className="card-header">
          <h5>
            {name} &nbsp;
            {this.state.isVisible ? null : (
              <i className="fas fa-caret-down"></i>
            )}
          </h5>
        </div>
        <Animation pose={this.state.isVisible ? "visible" : "hidden"}>
          <div className="card-body">
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
                <tr className="editableRow">
                  <td>{birth_year}</td>
                  <td>{eye_color}</td>
                  <td>{hair_color}</td>
                  <td>{skin_color}</td>
                  <td>{height}</td>
                  <td>{mass}</td>
                  <td>{gender}</td>
                  <td>
                    <i style={{ display: "none" }}>{name}</i>
                    <i
                      onClick={(e) => {
                        updateState(id, e.target.parentElement.parentElement);
                      }}
                      className="fas fa-edit"
                    ></i>
                    <i
                      onClick={() => {
                        removeCharacter(id);
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
  }
}
