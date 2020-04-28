# Little Window
> Little window is a clever little cat chatbot that directs women to the information they are looking for as quickly as possible. Think of it like google search on turbo for all of Chayn’s resources and those provided by our friends too. We want to drastically reduce the time women take to search for information which in many cases can save lives.

**Currently in active development**
[![Build Status](https://travis-ci.org/chaynHQ/soulmedicine.svg?branch=master)](https://travis-ci.org/chaynHQ/little-window)

![LWDemo](https://user-images.githubusercontent.com/24212625/37564932-9ac46b84-2a97-11e8-8087-127b9225db75.gif)

## Installing / Getting started

### .env files
You will need to create a .env.local file in both the root directory.

## Installing / Getting started
Run the server and the client separately, using only the following commands to ensure correct binaries are used.
Server: `npm run start` or `npm run start:dev`
Client: `cd client && npm run start`



# PREVIOUS VERSION
### Prerequisites
- Dialogflow key
- Googlesheets API key
- PostgreSQL Database

### Quick Start
1. Clone the repo:
`git clone git@github.com:chaynHQ/little-window.git`
2. Move into your newly created folder and install dependencies:
`npm install`
3. Create a `.env` file in the root directory. This will need to include:
- `DATABASE_URL=` [Your PostgreSQL DB URL]
- `GOOGLE_API_1=` https://sheets.googleapis.com/v4/spreadsheets/{your-sheet-id}/values/
- `GOOGLE_API_2=` ?key={your-GSheet-apikey}
- `DIALOGFLOW_PROJECT_ID=`
- `DIALOGFLOW_CLIENT_EMAIL=`
- `DIALOGFLOW_PRIVATE_KEY=`
All of the variables prefixed with DIALOGFLOW_ can be created by following the following instructions to generate a key: [Get Dialogflow key](https://dialogflow.com/docs/reference/v2-auth-setup?utm_source=msa&amp;utm_medium=email&amp;utm_campaign=dialogflow_v1_deprecationauth_setup). Then follow this tutorial to include them in your .env file: [Include in .env file](https://medium.com/@tzahi/how-to-setup-dialogflow-v2-authentication-programmatically-with-node-js-b37fa4815d89).
4. Run the app in dev mode:
`npm run dev`

### Testing
1. Run `npm test` from the root folder to run server tests.
2. Run `cd client` then `npm test` to run React tests.

___

## Architecture
- DialogFlow (Natural Language Processor)
- GoogleSheets API
- React
- Node / Express
- PostgreSQL
- Heroku

![architecture](https://user-images.githubusercontent.com/24212625/37564922-8ba64078-2a97-11e8-82c6-172ca3a67a8d.png)

_

Testing:
1. Run `npm test` in the command line
2. Run `cd client` then `npm test` to run React tests

___

## Dialogflow

You can setup your conversation flow in Dialogflow using the following guidelines:

### Payloads

- All intents need to send back a custom payload, even if it's just an empty object

![](https://user-images.githubusercontent.com/24212625/37565404-c848897e-2aa0-11e8-9c9b-b00698701114.png)

### Option buttons

- For options buttons, send an `options` property in the custom payload. This is an array of objects for each button, where each object contains a `text` and `postback` key & value. `text` is the value that will appear on the button, `postback` is the actual value that will be sent to Dialogflow - this should map to the utterance of next intent you want to trigger with that button.

![](https://user-images.githubusercontent.com/24212625/37565413-f9bf4efc-2aa0-11e8-8233-472d1cb92ced.png)

- If it is intended that by selecting the relevant option that resources will be displayed to the user, the `postback` on the button should also be the reference for the server to lookup the correct columns in a Google Sheet.

![](https://user-images.githubusercontent.com/24212625/37565424-38e4102c-2aa1-11e8-91ad-2d6b7cfa83da.png)

![](https://user-images.githubusercontent.com/24212625/37565637-cb519e5e-2aa4-11e8-96de-1ee97a6c5cee.png)

- The message that is then returned by Dialogflow in response to the postback should contain a value of `"resources": "true"`, which then triggers this lookup:

![](https://user-images.githubusercontent.com/24212625/37565598-02bfa97c-2aa4-11e8-9c74-54365c642d58.png)

### Selecting multiple buttons

- If it is intended that multiple options can be selected for a set of buttons, which are then submitted:

![](https://user-images.githubusercontent.com/24212625/37565312-f5a33fce-2a9e-11e8-9f43-ef0769fb4fe1.png)

- Then the payload should contain a `selectOptions` property which is an array of objects for each option, where each object contains a `text`, `postback` and `lookup` value. However in contrast to the button options, instead of the `postback` being the lookup to the Google Sheet, the `lookup` value should map to the relevant columns in the Google Sheet. The user can then select multiple options before submitting.

![](https://user-images.githubusercontent.com/24212625/37565331-589a60c6-2a9f-11e8-949c-219964f0ccaf.png)

### Multiple messages

- Where multiple messages are to be displayed to the user, without any user input, each message where there should be a followup message from the bot should contain a `retrigger` property for which the value maps to the utterance for the intent for the next message:

![](https://user-images.githubusercontent.com/24212625/37565342-92b8fd44-2a9f-11e8-8f2c-39a534059d82.png)

### Message speed

- As in the above screenshot, each message can be given a `time delay` in the payload of `slow` (5secs) or `superslow` (8secs) to slow down the speed of a given bot response. The standard speed is 1.5secs.

# Support Us
Little Window is created by Chayn a global volunteer network with over 400 volunteers from 15 countries. If you like what you see and you want to join our team of volunteers get in touch. Or you can [donate](https://www.paypal.me/chaynhq); all proceeds go to improving Little Window and building more tools and resources at ChaynHQ.
