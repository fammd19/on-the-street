# On The Street

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Introduction

In Sydney, thousands of useful items are thrown onto the streets each day. These items are used but often in good working order and end up in landfill. On The Street seeks to reduce this wasteags by allowing people to post items they find or put out themseleves anonymously for other users to search and find.

Users who collect items can then update the listings.

This is the first iteration of the app with future enhancements to include:

- The ability to add photos, and for those photos to be interpreted by AI to reduce manual input of listing out the items
- Address validation

## Installation

To use the app:

1. Clone the repo locally
2. Run `npm i`
3. Obtain an API key and map ID (see note below) for Google Maps and add this to a new .env.local file in the root directory:
   `REACT_APP_GOOGLE_MAPS_API_KEY=XXXXX`
   `REACT_APP_GOOGLE_MAPS_MAP_ID=XXXXX`
4. Run the app using:
   `npm start`
   `npm run server`
   Please see notes below for further details on these commands

## API Keys

The app will run without a Google Maps API key however the listings maps will not be available. To obtain a Google Maps API key, head to https://console.cloud.google.com/google/maps-apis/overview.

The API key is used for geocoding locations and displaying the individual and multi listing map. There is a further map ID key.

## Run the app

`npm start` should be run in the project directory. This will run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The app utilises json-server which can be started with: `npm run server`. This will run the mock server on [http://localhost:4000](http://localhost:4000). `npm run server` is a shortcut for json-server --watch src/db.json --port=4000
