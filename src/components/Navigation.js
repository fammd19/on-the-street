import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

function Navigation () {
  return (
    <Navbar expand="lg" className="navbar-dark">
      <Container className="mx-4">
        <Navbar.Brand href="/">On The Street</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/listings" style={({isActive}) => {
                return {textDecoration:(isActive) ? "bold" : "none"}
              }}>
              Find
            </NavLink>
            <NavLink className="nav-link" to="/share" style={({isActive}) => {
                return {textDecoration:(isActive) ? "bold" : "none"}
              }}>
              Share
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;