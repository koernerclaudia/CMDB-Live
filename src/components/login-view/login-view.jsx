import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("https://cmdb-b8f3cd58963f.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert(
            "Sorry, this user does not exist. Please recheck the username and/or password."
          );
        }
      })
      .catch((e) => {
        alert("Oh no, something went wrong");
      });
  };

  return (
    <Form className="login" onSubmit={handleSubmit}>
      <h4>Login here:</h4>
      <Form.Group controlId="formUsername">
        <Form.Label className="display-8" >Username:</Form.Label>
        <Form.Control className="margin-bottom"
          style={{ color: "white"}}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username" // Placeholder text - will reapply once I can fix CSS
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="display-8">Password:</Form.Label>
        <Form.Control className="margin-bottom "
        style={{ color: "white"}}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          // placeholder="Enter your password" - will reapply once I can fix CSS
        />
      </Form.Group>
      <Button variant="warning" className="margin-top btn-sm" type="submit">
        Submit
      </Button>
    </Form>
  );
};
