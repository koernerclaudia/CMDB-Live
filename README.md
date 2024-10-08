# CMDb (Claudia's Movie Database)


## Project Details

This is my version of a frontend for a **movie database**; set up during my Full Stack Web Dev Training with [CareerFoundry](https://careerfoundry.com/en/courses/become-a-web-developer/). 

The project is supposed to demonstrate full-stack JavaScript development, including APIs (REST), web server
frameworks, databases, business logic, authentication, data security, and more.

### Tech Stack - MERN - MongoDB, Express, ReactJS, NodeJS

## Backend:

Part 1 of this project dealt with setting up a **database and Rest API** from scratch to use as a backend - [Go here](https://github.com/koernerclaudia/CMDB) to find out more about...

**WIP: API Documentation:** https://cmdb-b8f3cd58963f.herokuapp.com/documentation.html

## Frontend:

The goal was to set up a single page application (SPA) and to build an app using one of the most renowned frameworks and libraries available today:
- **ReactJS** for frontend building in combination with 
- **React Bootstrap** (Sass, Css)
- **ReactRouter**
- **Parcel** - as a build tool

## Features & Components:
- **Signup / Signup Screen:** Users can set up an account and get authenticated (username, password, email info will be necessary)
- **Login / Login Screen:** Users can log in and out; **Logout:** Available in link bar at all times
- **Browse & Search Movies View:** Users can browse movies + search movies by title, actor, director or genre
- **Filter Movies:** Movies can be filtered also according to genre and in alphabetical order
- **Movie Details View:** See more details of all movies including similar movies by genre and same director of favourite movies
- **Favourite a Movie:** A user can favourite a movie on the Browse/Movie Card view and the Movie(Details)View.
- **Un-Favourite a Movie:** Possible on Browse/Movie Card view, Movie(Details)View and from the list of favourited movies within the Profile view.
- **Update Profile/My Profile View:** Users can change their user information (either one: username, password, email address) and also de-register / delete their account completely

*Further features, I hope to implement soon:*
- Build out the MongoDB around genre, directors and actors
- Add more views for genre, directors and actors
- Add an option to make a watchlist (similar to list of favourites)
- Let users share movies with others
- Let users suggest movies to add to the database (provide a form - POST to the API)
- Username and Password reset when logged out.
- or also: Possibly find an adequate open API movie database to connect to (the purpose of our task was to build an API ourselves, so this was not an option.)
- Moving the API documentation to Swagger

## Content Structure

The Database consists of 2 collections:
- Movies (Title, Movie Description, appearing actors; Genre + Description, Director + Year of birth )
- Users (Username, Password, Email)

## Live Project

- hosted on Netlify: https://cmdb2024.netlify.app/login

## API Documentation

- WIP - to be moved to Swagger soon: https://cmdb-b8f3cd58963f.herokuapp.com/


## Deployment

To build this app:

1) Make sure to have NPM and React installed.
1) Download a Zip file form the main branch and extract.
2) Within your preferred code editor's terminal or terminal itself, navigate to the relevant folder location and build the app by running:

```npm run build```

## Tools & resources used

Being new to Javascript (Typescript) I have used ChatGPT and Claude.ai to help build out components and get ideas for concepts.
I have used AI mainly to structure the movie database information and build the JSON files for it.

## Licenses

This project is licensed under the MIT License.

## Training offers at Career Foundry

I am super thankful to have found this **Full Stack Web Dev Training** I am on with **CareerFoundry**. They provide a variety of trainings for digital careers. Go check them out!
https://careerfoundry.com/

