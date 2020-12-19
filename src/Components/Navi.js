import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

export default class Navi extends Component {
  render() {
    return (
      <div className="navigation">
        <Navbar className="container">
          <NavbarBrand href="/" onClick= {this.props.changeWorld}>
            <img
              src="https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo-1.png"
              alt=""
            />
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
