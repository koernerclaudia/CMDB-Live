import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.scss";
import logo from "../../assets/cmdb-logo.png";
import { Link } from "react-router-dom";



export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };
    console.log("Sending login request with data:", data);

    fetch("https://cmdb-b8f3cd58963f.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Received response with status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Login response data: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          console.log("Login failed, no user data received");
          alert(
            "Sorry, this user does not exist. Please recheck the username and/or password."
          );
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
        alert("Oh no, something went wrong");
      });
  };

  return (
    <><img src={logo} alt="CMDB" className="logo-large" />
    <Form className="login" onSubmit={handleSubmit}>
      <h4>Login here:</h4>
      <Form.Group controlId="formUsername">
        <Form.Label className="display-8">Username:</Form.Label>
        <Form.Control
          className="margin-bottom input"
          style={{ color: "white" }}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="display-8">Password:</Form.Label>
        <Form.Control
          className="margin-bottom "
          style={{ color: "white" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="info" className="margin-top btn-sm" type="submit">
        Submit
      </Button>
    </Form>
    <div className="fs-6" style={{ color: "white" }}>No account yet? <Link to={`/signup`} className="nav-link">Sign up here</Link></div></>
  );
};