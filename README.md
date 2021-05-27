# Workout Logger

## Log, save and manage your daily running and cycling workouts details on an interactive map.

### How to use this web app

1. Allow location once the page loads. Only then you will be able to see the map and use the application.
2. Click on the map to start adding workouts.
3. Enter your workout infromation then press ENTER.
4. You have succesfully created a workout.
5. Click on newly created workout list item to center the workout location on the map.

### Project Details

CRUD (Create, Read, Update, Delete) operations are the meat of any web application. Implementing CRUD, basically defines the flow of data in the application. 
Workout Logger is a prototype bookmarking application which offers an interactive experience to log information about running and cycling workouts. 
The project uses LeafletJS (a popular javascript mapping library) and Geolocation API for mapping and location services to generate locations based bookmarks, which are then stored in browser’s local storage. 
The app’s logic design is inspired by object-oriented programming practices. Bookmarks can be created by simply clicking on the map, fill out the workout details and submit. 
Once the bookmark is created, it persists on page refreshes and can be edited or deleted via app’s interface.

### Possible Improvements 

* User interface can be redesigned to support smaller screens.
* More mapping options can be provided like tracing workout routes. This can be achieved with some advanced map editing features offered by LeafletJS.
* For a production application, bookmarks should be stored in an external database and a user authentication system must be implemented to manage data access rights.

### To run the project in production mode

In the project directory, you can run:

To install all the project dependencies:

### `npm install`

To start the development server:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
