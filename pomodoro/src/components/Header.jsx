import React from "react";
// import React bootstrap
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Pomodoro Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Created by{" : "}
            <a href="https://github.com/polat-mustafa"> Mustafa Polat </a>{" "}
            <a href="https://www.kodluyoruz.org/">for &#10084; Kodluyoruz</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
