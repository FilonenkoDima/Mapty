# Mapty

## About the Project

Mapty is a web application for tracking workouts on a map. It allows users to record running or cycling activities and visualize their location using Google Maps.

## Purpose

The project was created to:

- Practice object-oriented JavaScript.
- Master the use of external libraries such as Google Maps API for map integration.
- Implement local storage to save and retrieve user data.
- Learn about geolocation and event handling in JavaScript.

## Demo

You can view the live demo of the project here: [Mapty Demo](https://filonenkodima.github.io/Mapty/) \
![](demo.gif)

## Project Setup

To run this project locally, follow these instructions:

1. Clone the repository: `git clone https://github.com/FilonenkoDima/Mapty.git`
2. Navigate to the project directory: `cd Mapty`
3. Open the `index.html` file in your browser. No server setup is required as this is a pure front-end project.

## Project Structure

- `/css/style.css` - All styles for the project
- `/img/` - Project images
- `/js/script.js` - Main JavaScript file handling logic
- `/index.html` - Main HTML file

## OOP

`Workout` Class \
The Workout class is the base class used to represent a generic workout. It contains common properties such as:

- distance: The total distance covered during the workout (in kilometers).
- duration: The duration of the workout (in minutes).
- coords: The GPS coordinates where the workout took place.
- date: The date when the workout was performed.

`Running` and `Cycling` Subclasses
Both Running and Cycling are subclasses of Workout, extending it to represent specific types of workouts.

- Running: Adds properties like cadence and calculates pace (minutes per kilometer).
- Cycling: Adds properties like elevation gain and calculates speed (kilometers per hour).

`App` Class
The App class is the main controller of the application, handling the overall workflow and coordination of the app. This class is responsible for:

- Managing the state: The app keeps track of all workouts, storing them in an array and loading them from local storage when available.
- It listens for user actions such as adding a new workout, displaying the workout on the map, and resetting the application.
- The app manages the map display and places workout markers at the correct GPS locations.
- Upon starting the app, it retrieves the user's current position using the Geolocation API and centers the map on the user's location.

Key Methods of App Class

- \_getPosition(): Uses the Geolocation API to get the user's current location and set up the map.
- \_loadMap(position): Initializes the Google Map centered at the user's position and adds workout markers.
- \_newWorkout(e): Handles the creation of a new workout (either running or cycling) based on the user's input.
- \_renderWorkoutMarker(workout): Places a marker on the map for each workout, showing its location.
- \_renderWorkout(workout): Displays workout information in the UI, including type, distance, duration, and location.
- \_setLocalStorage(): Stores all workout data in the browser's local storage to persist data between sessions.
- \_getLocalStorage(): Retrieves stored workouts from local storage when the app is loaded.

## API and Functionality

- Google Maps API is used to embed the map and track the user's location.
- Local Storage is used to save the user's workout data, ensuring persistence between page reloads.
- Geolocation API is employed to get the user's current location and display it on the map.

## Key Features

- Add and track workouts (running and cycling).
- Save workouts locally to view them later.
- View workouts on the map using Google Maps, with icons differentiating between running and cycling activities.
