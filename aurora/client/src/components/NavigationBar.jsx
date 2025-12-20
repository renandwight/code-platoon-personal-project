import { logOut } from '../api/auth';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/esm/Row';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import AuroraLogo from "../assets/AuroraLogo.svg";
import { Link, useNavigate } from 'react-router-dom';

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
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {user && <Nav.Link as={Link} to="backtest">Backtest</Nav.Link>}
          {user && <Nav.Link as={Link} to="watchlists">Watchlists</Nav.Link>}
          <Nav.Link as={Link} to="about">About</Nav.Link>
        </Nav>
          <Nav>
            {user ? ( 
              <Nav.Link 
              onClick={handleLogout}>Logout
              </Nav.Link>
            ) : ( 
            <Nav.Link 
            as={Link} 
            to="register">Login
            </Nav.Link> 
          )}
          </Nav>
      </Container>
    </Navbar>
  </div>
</Row>

    </>
  );
};

export default NavigationBar;