import React, { Component } from "react";
import { Table } from "reactstrap";
import posed from "react-pose";

export default class CharTable extends Component {
  state = {
    isVisible: false,
  };

  showInfo = (e) => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
    this.state.isVisible
      ? e.target.classList.remove("background")
      : e.target.classList.add("background");
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
      homeworld,
    } = this.props;

    const Animation = posed.div({
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    });

    return (
      <div>
        <div className="card">
          <div onClick={this.showInfo} className="btn card-header p-0">
            <h5 className="text-left mr-0 animate__animated animate__bounce">
              {name}
            </h5>
          </div>
          {this.state.isVisible ? (
            <div className="card-body p-0">
              <Table className="table table-bordered m-0 table-striped">
                <thead>
                  <tr>
                    <th>Birth Year</th>
                    <th>Eye Color</th>
                    <th>Hair Color</th>
                    <th>Skin Color</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Gender</th>
                    <th>Home World</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{birth_year}</td>
                    <td>{eye_color}</td>
                    <td>{hair_color}</td>
                    <td>{skin_color}</td>
                    <td>{height}</td>
                    <td>{mass}</td>
                    <td>{gender}</td>
                    <td>{homeworld}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
