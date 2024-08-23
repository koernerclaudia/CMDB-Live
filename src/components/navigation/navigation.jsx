import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import logo from "../../cmdb-logo.png";

export const NavigationBar = ({ user }) => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(); // Refresh the page to trigger logout
      };

    return (


<Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="home"><img src={logo} alt="CMDB" className="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Browse Movie Database
                </Nav.Link>
                <Nav.Link as={Link} to="/myprofile">
                  My Profile
                </Nav.Link>
                {/* <Nav.Link to="/login" onClick={onLoggedOut}>Logout</Nav.Link> */}
                <Nav.Link variant="primary" onClick={handleLogout}>
          Logout
        </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );
    };