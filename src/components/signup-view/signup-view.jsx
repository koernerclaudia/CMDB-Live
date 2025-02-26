import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../../assets/cmdb-logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
    };

    fetch("https://cmdb-b8f3cd58963f.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.href = '/login';
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Row className="justify-content-center">
    <Col xxl={4} xl={6} lg={6} md={8} sm={8} xs={12}>
      <img src={logo} alt="CMDB" className="logo-large d-block mx-auto mb-3" />
      <Card className="margin-top bg-altdark mb-2 w-100" border="info" style={{ backgroundColor: '#222222'}}>
        <Card.Body>
          <Card.Title className="text-light"><h4>Sign up here:</h4>
          <div className="text-justify mb-4" style={{ color: "white", fontSize: "0.8rem"}}>
       This platform is a dummy app, so you will not receive any emails.
       After signing up, you will be taken to the login page to use your credentials.
        
        </div>
          
          </Card.Title>
    <Form className="signup" onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="margin-bottom input"
            type="text"
             style={{ color: "white" , backgroundColor: '#292929' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Min. 5 characters."
            aria-label="Min. 5 characters."
          />
        </Form.Group>

    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control className="margin-bottom input"
        type="password"
        style={{ color: "white" , backgroundColor: '#292929' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Min. 8 characters, no symbols."
        aria-label="Min. 8 characters, no symbols."
     />
    </Form.Group>
    <Form.Group controlId="formEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email"  style={{ color: "white", backgroundColor: '#292929' }} className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
       placeholder="Enter an email address"
      aria-label="Enter an email address"
      />
    </Form.Group>
    <Button variant="info" className="margin-top btn-sm" type="submit">
        Submit
      </Button>
  </Form>
</Card.Body>
</Card>
<div className="text-center mb-4" style={{ color: "white", fontSize: "0.7rem"}}>
        Feel free to a non-existing email for this form.<br></br>
         You will never be sent an email or contacted in any way.<br></br>
         Head over to the <a href="/about">Disclaimer Section</a> to read more<br></br>
         Thank you!
        
        </div>
</Col>
</Row>
 
  
);
};
