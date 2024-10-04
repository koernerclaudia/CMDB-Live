import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../index.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faDatabase,
  faGavel,
  faSection,
  faFaceSmile, faCircleQuestion, faScrewdriverWrench
} from "@fortawesome/free-solid-svg-icons"; // Correct solid icons
import { faReact, faGithub } from "@fortawesome/free-brands-svg-icons"; // Correct brand icon

export const About = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h5 className="text-info text-center mb-4">About this app</h5>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card border="info" className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">
                <FontAwesomeIcon className="text-info" icon={faCircleQuestion} />
                &nbsp;What is this app?
              </Card.Title>
              <Card.Text>
                <p>
                  CMDb (Claudia's Movie Database) is a small movie database I
                  created as part of my Full Stack Web Development training with  <a className="text"
                  href="https://careerfoundry.com/en/courses/become-a-web-developer/" target="_blank">
                   CareerFoundry
                  </a>. The
                  app showcases my skills by allowing users to create accounts,
                  browse movies, and curate a list of favorites. Built with the
                  MERN stack (MongoDB, Express, React, Node.js), it was a
                  valuable learning experience.{" "}
                  <FontAwesomeIcon className="text-light" icon={faFaceSmile} />
                </p>

                <p>
                  <span className="text-info fw-bold">
                    Please note: This is a training project
                  </span>{" "}
                  for demonstration purposes, not a commercial product. Enjoy
                  exploring, but keep in mind—it’s not the next IMDb!
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card border="info" className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">
                <FontAwesomeIcon className="text-info" icon={faFilm} />
                &nbsp;Features
              </Card.Title>
              <Card.Text>
                <p>
                  <span className="text-info fw-bold">
                    User Accounts:&nbsp;
                  </span>
                  You can sign up with a username, password, and an email (feel
                  free to use any email, real or fake). Log in and out to
                  personalize your movie experience.
                </p>
                <p>
                  <span className="text-info fw-bold">
                    Movie Collection:&nbsp;
                  </span>
                  Browse movies by title, actor, genre, and director. Filter
                  movies by genre and sort them alphabetically. View detailed
                  movie information, including cast, director, and similar
                  movies.
                </p>
                <p>
                  <span className="text-info fw-bold">
                    Favorite Movies:&nbsp;
                  </span>
                  Add and remove movies from your personal list of favorites.
                </p>
                <p>
                  <span className="text-info fw-bold">
                    Profile Customisation:&nbsp;
                  </span>
                  Update your username, password, or email from within the app.
                  You can delete your account at any time.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card border="warning" className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">
              <Row>
              <Col className="col-6 d-flex align-items-start">
         <FontAwesomeIcon className="text-warning" icon={faScrewdriverWrench} />
          &nbsp;Backend
          </Col>
          <Col className="col-6 d-flex justify-content-end align-items-end">
           <a className="text" href="https://github.com/koernerclaudia/CMDB" target="_blank">
<Button className="btn-sm" variant="warning">
<FontAwesomeIcon icon={faGithub} />&nbsp; See on GitHub
  </Button></a>
          </Col>
        </Row>
              </Card.Title>
              <Card.Text>
              <p><span className="text-warning fw-bold">Node.js &amp; Express:&nbsp;</span>Web server environment and framework. These tools power the "behind the scenes" part of the app, handling user requests and delivering data, like movie information, to the frontend.</p>
               <p><span className="text-warning fw-bold">MongoDB &amp; Mongoose:&nbsp;</span>Database and object data modeling. The app’s movie and user data are stored in MongoDB, and Mongoose helps organize that data, making it easier to manage.</p>
               <p><span className="text-warning fw-bold">JWT (JSON Web Tokens):&nbsp;</span>For user authentication. This ensures that when users log in, their identity is securely verified so they can safely access their account.</p>
               <p><span className="text-warning fw-bold">Bcrypt:&nbsp;</span>For password hashing. Protects user passwords by encrypting them, making it harder for hackers to steal sensitive information.</p>
               <p><span className="text-warning fw-bold">CORS:&nbsp;</span>Cross-origin resource sharing middleware. Allows the frontend and backend to communicate securely, even if they are hosted on different servers.</p>
               <p><span className="text-warning fw-bold">Heroku &amp; MongoDB Atlas:&nbsp;</span>Hosting the API and database. These are platforms that host the backend and the database, making the app accessible online.</p>
                  <hr className="text-warning"></hr>
                  <Card.Title>
                    <FontAwesomeIcon
                      className="text-warning"
                      icon={faDatabase}
                    />{" "}
                    API Documentation
                  </Card.Title>
                  <p>Documentation regarding all the available API endpoints was set up with Swagger can be found <a className="text"
                  href="https://cmdb-b8f3cd58963f.herokuapp.com/api-docs/" target="_blank">here</a>.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card border="warning" className="mb-4">
            <Card.Body>
            <Card.Title className="mb-4">
            <Row>
              <Col className="col-6 d-flex align-items-start">
         <FontAwesomeIcon className="text-warning" icon={faReact} />
          &nbsp;Frontend
          </Col>
          <Col className="col-6 d-flex justify-content-end align-items-end">
           <a className="text" href="https://github.com/koernerclaudia/CMDB-Live" target="_blank">
<Button className="btn-sm" variant="warning">
<FontAwesomeIcon icon={faGithub} />&nbsp; See on GitHub
  </Button></a>
          </Col>
        </Row>
        </Card.Title>
              <Card.Text>
               <p><span className="text-warning fw-bold">ReactJS:&nbsp;</span>Framework for building the single-page app (SPA). This is the tool used to build the visible part of the app that users interact with, like movie lists and user profiles.</p>
               <p><span className="text-warning fw-bold">React Bootstrap:&nbsp;</span>Styling and UI components. Helps style the app and make it look nice by providing pre-made buttons, layouts, and other design elements.</p>
               <p><span className="text-warning fw-bold">Parcel:&nbsp;</span>Build tool for bundling the app. This tool packages all the code together, optimizing it so the app loads quickly and efficiently.</p>
               <p><span className="text-warning fw-bold">Netlify:&nbsp;</span>Hosting the frontend app. A platform that hosts the frontend of the app, making it available online for users to access from anywhere.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card border="light" className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">
                <FontAwesomeIcon className="text-light" icon={faSection} />
                &nbsp; Disclaimer &amp; Legal Notice
              </Card.Title>
              <Card.Text>
                <p>
                  <span className="text-info fw-bold">
                    For Educational Purposes Only:&nbsp;
                  </span>
                  This app was created as part of a learning project and is not
                  intended for commercial use. All functionalities are aimed at
                  showcasing my Full Stack development skills, and no monetary
                  gains or commercial activities are involved.
                </p>
                <p>
                  <span className="text-info fw-bold">
                    Movie Data & Images used:&nbsp;
                  </span>
                  The movie information (descriptions, genres, etc.) and images
                  (movie posters) are sourced from IMDb and other publicly
                  available data. They are used for non-commercial educational
                  purposes only. If you are the owner of any content displayed
                  and believe it should be removed, please&nbsp;
                  <a className="text"
                  href="mailto:claudia.koerner@gmail.com" target="_blank">
                    contact me
                  </a>
                  , and I will address it promptly.
                </p>

                <p>
                  <span className="text-info fw-bold">
                    No Misuse Intended:&nbsp;
                  </span>
                  The app is not designed for improper use. It does not collect
                  sensitive data beyond what is necessary to demonstrate user
                  login and customization features. No personal emails,
                  communications, or marketing materials will be sent to users.
                </p>
                <p>
                  <span className="text-info fw-bold">
                    User Accounts:&nbsp;
                  </span>
                  You are welcome to create an account using fake or temporary
                  email addresses. No emails or communications will be sent to
                  you.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
          <Card border="light" className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">
                <FontAwesomeIcon className="text-light" icon={faGavel} />
                &nbsp; Legal Stuff
              </Card.Title>
              <Card.Text>
                <p>
                  <span className="text-info fw-bold">Impressum:&nbsp;</span>
                  As this is a non-commercial, educational project, it should not
                  require a formal Impressum. However, if you have any concerns,
                  feel free to reach out to me for clarifications.
                </p>
                <p>
                  <span className="text-info fw-bold">
                    Privacy Policy:&nbsp;
                  </span>
                  No user data is shared with
                third parties. No communications or marketing emails will be
                sent to users, and all data stays within the app for
                demonstration purposes only. Users can delete their account and
                associated data anytime from within the app.
                </p>
                <p>
                  <span className="text-info fw-bold">Terms &amp; Conditions:&nbsp;</span>
                  This app is for demonstration and learning purposes only. By
                using this app, you acknowledge that it is a student project,
                and any data you input is not intended to be used for real-world
                purposes.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
