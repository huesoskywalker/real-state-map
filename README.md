# Real Estate Projects Visualization with Google Map API

## Table of Contents

-   [Description](#description)
-   [Features](#features)
-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the MongoDB Database](#running-the-mongodb-database)
    -   [Inserting Data into the Database](#inserting-data-into-the-database)
    -   [Running the API](#running-the-api)
-   [Testing](#testing)
-   [Contributing](#contributing)

## Description

Propital is a RESTful API that allows clients to explore real estate projects on an interactive map. It provides detailed information about each project, including its name, location, description, and relevant details.

## Features

-   Visualize real estate projects on an interactive map.
-   Get detailed information about each project by clicking on a marker.
-   Search and filter projects by location, property type, price, and more.
-   Interact with the map for navigation and exploration.
-   Data persistence through a MongoDB database.

## Technologies

-   Next.js for building the API.
-   MongoDB for the database.
-   Google Maps API for the interactive map.
-   Cypress for unit testing.

## Getting Started

### Prerequisites

-   Node.js and npm installed on your machine.
-   MongoDB installed and running locally or a connection to a MongoDB cloud service.

### Installation

1. Clone this repository to your local machine:

    ```
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. Navigate to the project folder:

    ```
    cd your-repo-name
    ```

3. Install the dependencies:
    ```
    yarn install
    ```

### Running the MongoDB Database

1. Start the MongoDB service on your machine. In Linux, you can use the following commands:

    ```
    sudo systemctl start mongod
    ```

2. Connect to the MongoDB shell:
    ```
    mongosh
    ```

### Inserting Data into the Database

1. Create a new database named `propitalDb` in the MongoDB shell:

    ```
    use propitalDb
    ```

2. Create a collection named `properties`:

    ```
    db.createCollection('properties')
    ```

3. In the project's `public/data` directory, you will find a `properties.json` file with random data for properties. Copy the data from the `properties.json` file.

4. Insert the data into the `properties` collection in the MongoDB shell:
    ```
    db.properties.insertMany(// paste the data here)
    ```

### Running the API

1. Create a `.env.local` file in the root of the project and add the necessary environment variables:

    ```
    MONGODB_URI=<your-mongodb-uri>
    GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
    ```

    When using the Google maps API key on the .env.local file, I got water marks with Developer only, So placing the API key in the MapComponent directly will work great

2. Start the APP:

    ```
    yarn dev
    ```

3. The APP will now be running at `http://localhost:3000`.

For testing the REST API endpoint, you can run the following commands:

-   To use the Cypress GUI:

    ```
    yarn cypress:open
    ```

-   To run the tests through the terminal:
    ```
    yarn cypress:run
    ```

## Contributing

We welcome contributions from the community. If you find a bug or have an enhancement in mind, please open an issue or submit a pull request.

---
