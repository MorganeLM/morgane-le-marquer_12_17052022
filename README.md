# SPORTSEE Project Documentation

## Context
The goal of this project was to develop an analytical dashboard with React as part of project 12 of the training course "Développeur Front-End" of Openclassroom.

## Prerequisites
 - You need [Git](https://git-scm.com/ "Git") to clone the repositories
 -    You need [NodeJS](https://nodejs.org/en/ "NodeJS") - version 12.18
 -    You should clone and install the Backend API. The repository containing the installation steps are available [here](http:https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard// "here").
 
*We advise you to use the [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code") code editor as we did to develop the application*

## Installation
- First, follow the installation instruction of the Backend API repository to install and run the backend API.

- Clone this repository to your computer
```bash
git clone https://github.com/MorganeLM/morgane-le-marquer_12_17052022.git
```
- Go to project folder and install all dependencies
```bash
npm install
```
- Run the project
```bash
npm start
```
 Open http://localhost:3001/ to view it in the browser.

## Usage

If both projects are already installed, you just need to run the "npm start" command in each project folder.

The back-end uses port http://localhost:3000/ and the front-end uses port http://localhost:3001/.

You can launch the front-end part independently. To do this, assign the value "dev" to the "REACT_APP_ENV" environment variable in the .env file then save and restart the application.
```bash
REACT_APP_ENV=dev
```
For this first version, the data is s imulated for ids 12 and 18 (http://localhost:3001/12 or http://localhost:3001/18).