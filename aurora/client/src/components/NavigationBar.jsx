import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AuroraLogo from "../assets/AuroraLogo.svg"
import { logOut } from '../api/calls';

function NavigationBar({ user, setUser }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
      navigate("/", {replace:true});
    } catch (err) {
      console.log("logout error", err)
    }
  }

  return (
    <>
<Row>
  <div className="navbar">
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Nav className="me-auto">
          <Navbar.Brand>
            <img
              src={AuroraLogo}
              alt="Aurora"
              height="36"
              className="aurora-logo"
            />
          </Navbar.Brand>
          <Nav.Link as={Link} to="home">Home</Nav.Link>
          <Nav.Link as={Link} to="backtest">Backtest</Nav.Link>
          <Nav.Link as={Link} to="watchlists">Watchlists</Nav.Link>
          <Nav.Link as={Link} to="about">About</Nav.Link>
        </Nav>
        {user && (
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  </div>
</Row>

    </>
  );
};

export default NavigationBar;