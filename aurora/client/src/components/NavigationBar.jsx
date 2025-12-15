import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
function NavigationBar() {
  return (
    <>
    <Row>
      <div className="navbar">
        <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
          <Container>
            <Nav activeKey="/">
              <Nav.Link as={ Link } to="/">Home</Nav.Link>
              <Nav.Link as={ Link } to="about">About</Nav.Link>
              <Nav.Link as={ Link } to="backtest">Backtest</Nav.Link>
              <Nav.Link as={ Link } to="watchlists">Watchlists</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </Row>
    </>
  );
};

export default NavigationBar;