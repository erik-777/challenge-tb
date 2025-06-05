import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import "./header.css";

function Header() {
  return (
    <Container className="header-bar" >
      <Row className="header-title">React Test App</Row>
    </Container>
  );
}

export default Header;
