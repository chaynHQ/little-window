# Little Window
![logo](https://user-images.githubusercontent.com/24212625/37564924-8fc09424-2a97-11e8-90bf-32a0dc3255e1.png)

The Little Window app is avaliable [here](https://little-window.herokuapp.com)

## User Story
‘Direct users quickly and safely to the correct resource so that users can feel informed and empowered to read further.’

## Our Solution
> A chat bot to help those who have suffered from domestic abuse to access resources quickly and safely

#### The aims of the solution:
- To provide information within a 15 minute window
- To provide effective real-time service
- Ensure a safer digital footprint
- To provide accessible and engaging information
- To raise awareness on domestic abuse

___

### The app

![LWDemo](https://user-images.githubusercontent.com/24212625/37564932-9ac46b84-2a97-11e8-8087-127b9225db75.gif)

___

### What it will look like on the Chayn website

![figma](https://user-images.githubusercontent.com/24212625/37564928-95868bac-2a97-11e8-8e29-636986686a8a.png)

___

### Tech stack
- DialogFlow (Natural Language Processor)
- GoogleSheets API
- React
- Node / Express
- PostgreSQL
- Heroku

___

### Software Architecture
<br>

![architecture](https://user-images.githubusercontent.com/24212625/37564922-8ba64078-2a97-11e8-82c6-172ca3a67a8d.png)

___

### Our Conversation Flow (Divorce Route Example)
<br>

![conversation](https://user-images.githubusercontent.com/24212625/37564925-9256652e-2a97-11e8-84ec-2bbb4637cd8e.png)

## How to run locally
You will need before hand:
- Dialogflow account & key
- Googlesheets API key
- 2 x PostgreSQL Databases

Steps:

1. Clone the repo:
`git clone https://github.com/fac-12/Little-Window.git`
2. Install dependencies
`npm install`
3. Create a `config.env` in the root directory. This will need:
- `DF_KEY = ` [Your Dialogflow client key]  
- `DATABASE_URL = ` [Your PostgreSQL prod DB]
- `HEROKU_POSTGRESQL_MAROON_URL` = [Your PostgreSQL dev DB]
- `HEROKU_POSTGRESQL_OLIVE_URL = ` [Your PostgreSQL test DB]
- `GOOGLE_API_1 = ` https://sheets.googleapis.com/v4/spreadsheets/{your-sheet-id}/values/
- `GOOGLE_API_2 = ` ?key={your-GSheet-apikey}
4. Login  to your prod db and run `db_build.sql`
5. Run the app in dev mode:
`npm run dev`

## Setting up Dialogflow

You can setup your conversation flow in Dialogflow using the following guidelines:
- All intents need to send back a custom payload, even if it's just an empty object

![](https://i.imgur.com/ArbsR5x.png)

- For options buttons, send an `options` property in the custom payload. This is an array of objects for each button, where each object contains a `text` and `postback` key & value. `text` is the value that will appear on the button, `postback` is the actual value that will be sent to Dialogflow - this should map to the utterance of next intent you want to trigger with that button.

![](https://i.imgur.com/IXCBfig.png)

- For resources, a `resources` property needs to be added to the payload. This will be a reference for the server to lookup the correct columns in a Google Sheet.

![](https://i.imgur.com/80TlHdG.png)

![](https://i.imgur.com/UpLSqMy.png)


(More info to come on retriggering)
