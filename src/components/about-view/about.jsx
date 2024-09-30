import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../index.scss";
import logo from "../../assets/cmdb-logo.png";
import { Link } from "react-router-dom";

export const About = () => {
  // Sample data for the cards
  const cardData = [
    {
      title: "Our Mission",
      content: [
        "Provide exceptional service.",
        "Innovate continuously.",
        "Build lasting relationships."
      ]
    },
    {
      title: "Our Values",
      content: [
        "Integrity",
        "Teamwork",
        "Excellence",
        "Customer Focus"
      ]
    },
    {
      title: "Contact Us",
      content: [
        "Email: contact@cmdb.com",
        "Phone: (123) 456-7890",
        "Address: 123 Main St, Anytown, USA"
      ]
    }
  ];

  return (
    <>
      <img src={logo} alt="CMDB" className="logo-large" />
      <h1>About Us</h1>
      <Row className="justify-content-md-center">
        {cardData.map((card, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>
                  <ul>
                    {card.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Card.Text>
                <Button variant="primary" as={Link} to="/contact">
                  Contact Us
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
