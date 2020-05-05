# Little Window
> Little window is a clever little cat chatbot that directs women to the information they are looking for as quickly as possible. Think of it like google search on turbo for all of Chayn’s resources and those provided by our friends too. We want to drastically reduce the time women take to search for information which in many cases can save lives.

**Currently in active development**
[![Build Status](https://travis-ci.org/chaynHQ/soulmedicine.svg?branch=master)](https://travis-ci.org/chaynHQ/little-window)

![LWDemo](https://user-images.githubusercontent.com/24212625/37564932-9ac46b84-2a97-11e8-8087-127b9225db75.gif)

___

## Development

### .env files
You will need to create a .env file in both the root directory and the client directory.

#### Client .env file
- SKIP_PREFLIGHT_CHECK=true

#### Root .env file

- PORT
- DATABASE_URL
- DIALOGFLOW_PROJECT_ID
- DIALOGFLOW_CLIENT_EMAIL
- DIALOGFLOW_PRIVATE_KEY
- ROLLBAR_TOKEN
- STORYBLOK_TOKEN
- CONTENT_PREVIEW_MODE
- kickoffSupportMessageStoryblokId
- freeTextSupportRequestStoryblokId
- radioButtonSupportRequestStoryblokId
- resourceStoryblokId
- additionalResourcesStoryblokId
- anythingElseStoryblokId
- finalMessageStoryblokId

### Running locally
Install dependancies
`npm install`
`cd client && npm install`

Create a postgres server locally and store it's URL in your root .env file.
Migrations to populate the db will automatically run.

Run the server and the client separately, using only the following commands to ensure correct binaries are used.
Server: `npm run start` or `npm run start:dev`
Client: `cd client && npm run start`

### Testing
Server: `npm run test`
Client:  `cd client && npm run test`

### Formatting and Linting
Server: `npm run format` and `npm run lint`
Client: `cd client && npm run lint`

___


## Architecture

### Server
- NestJS
- Typescript
- PostgreSQL
- Typeorm
- DialogFlow for natural language processing
- Storyblok as CMS for conversation content
- Jest for testing

### Client
- React

### Deployment
- Heroku

___


## Conversation Structure
The Little Window conversation is structured into three distinct sections.
1) Setup
All of the questions required to setup the conversation including GDPR & Language settings. These must be set before we can deliver any more content to the user.
2) Support
The bulk of the conversation. This is where Little Window determines what the user wants and sends them relevant resources. Little Window determines what the user wants via either NLP or directly offering a selection of it's knowledge.
3) Feedback
At the end of the conversation we collect feedback to improve Little Window with four questions.

___


# Support Us
Little Window is created by Chayn a global volunteer network with over 400 volunteers from 15 countries. If you like what you see and you want to join our team of volunteers get in touch. Or you can [donate](https://www.paypal.me/chaynhq); all proceeds go to improving Little Window and building more tools and resources at ChaynHQ.
