import Container from "react-bootstrap/esm/Container";
import Header from "./header";
import "./main.css";
import Row from "react-bootstrap/esm/Row";

export default function Main({ children }) {
  return (
    
    <Container className="main-container">
      <Row>
        <Header />
      </Row>
      <Row className="main-content">{children}</Row>
    </Container>
  );
}
