import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    <Form className="signup" onSubmit={handleSubmit}>
      <h4>Sign Up:</h4>
    <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control className="margin-bottom"  style={{ color: "white"}}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="3" 
        // placeholder="Choose a Username" - will reapply once I can fix CSS
      />
    </Form.Group>

    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control className="margin-bottom"  style={{ color: "white"}}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        // placeholder="Choose a Password" - will reapply once I can fix CSS
      />
    </Form.Group>
    <Form.Group controlId="formEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control className="margin-bottom"  style={{ color: "white"}}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        // placeholder="Your Email" - will reapply once I can fix CSS
      />
    </Form.Group>
    <Button variant="warning" className="margin-top btn-sm" type="submit">
        Submit
      </Button>
  </Form>
  );
};


