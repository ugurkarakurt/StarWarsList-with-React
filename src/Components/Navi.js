import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

export default class Navi extends Component {
  render() {
    return (
      <div className="navigation">
        <Navbar className="container">
          <NavbarBrand href="/">
            <img
              src="https://logos-download.com/wp-content/uploads/2016/09/Star_Wars_logo-1.png"
              alt=""
            />
          </NavbarBrand>
          <Nav>
            <NavItem>
              <input className="form-control" type="text" placeholder="Search a character"/>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
