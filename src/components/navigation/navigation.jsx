import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./cmdb-logo.png";

export const Navigation = ({ user, onLoggedOut }) => {

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Refresh the page to trigger logout
  };

  
  return (
    <Navbar className="navbar navbar-dark navbar-expand-lg">
      <Container>
        <Navbar.Brand>
        <img src={logo} alt="CMDB" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-toggler-right" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
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
                <Nav.Link className="nav-link" as={Link} to="/">
                  Browse Movies
                </Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/myprofile">
                 My Profile
                </Nav.Link>
                <Nav.Link className="nav-link" onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
