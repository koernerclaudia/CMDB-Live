import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import logo from "../../assets/cmdb-logo.png";
import "../../index.scss";

export const Navigation = ({ user }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Navbar className="navbar navbar-dark" expand="lg">
        <Container>
        <Navbar.Brand>
                    <img src={logo} alt="CMDB" className="logo" />
                  </Navbar.Brand>
           {/* Navbar.Toggle should be placed before Navbar.Collapse to be part of the flex container */}
           <Navbar.Toggle 
            aria-controls="navbar-toggler-right" 
            className="ms-auto"
            style={{ backgroundColor: '#292929', borderColor: '#ffc107'}} // Button color
          />

        <Navbar.Collapse id="navbar-toggler-right" className="justify-content-end"> {/* Added justify-content-end */}
          <Nav className="ms-auto"> {/* Ensure this class is applied for right alignment */}
              {!user && (
                <>
                 <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
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
                 <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
                  <Nav.Link className="nav-link" as={Link} to="/">
                    Browse Movies
                  </Nav.Link>
                  <Nav.Link className="nav-link" as={Link} to="/myprofile">
                    My Profile
                  </Nav.Link>
                  <Nav.Link className="nav-link" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
