# **“Just Say In” app**

![Just-Say-In-logo-wordmark](readme_images/Just-Say-In-logo-wordmark.png)

---

## What is Just Say In?

Just Say In is a translation and communication app that lets the user translate words and phrases into multiple languages at once, and also send out translated messages to one or more contacts. It will start off as a web app, and eventually will have a mobile app counterpart.

## One Sentence Pitch :

Just Say In is a multiple language translator and communication app, like Google Translate with SMS

![gif animation from Giphy.com](https://media.giphy.com/media/d7BJkUCIRjXLuj6lX6/giphy.gif)

![gif animation from Giphy.com](https://media.giphy.com/media/L18x7FDgvpBwHvCRnz/giphy.gif)

# Features

## Milestone 1- MVP (minimum viable product)

1. Web app with multiple languages as target languages
2. Google/Facebook Login
3. Add contacts for messaging
4. Message contacts

## Future milestones

### Milestone 2- Text to speech

5. Create a group
6. Ability to save used words/phrases
7. Text-to-speech functionality
8. Display frequently and recently used words/phrases

### Milestone 3- Mobile app

9. Images
10. Mobile app
11. Choose word context
12. Choose regional variants
13. Learn frequent contexts

### More nice to haves….

- Ability to block words/images
- Ability to select the context for single words (maybe by selecting from two or three synonyms?)
- Ability to pull from other translation sources (Deepl/ Yandex/Microsoft?)and present alternate translations
  - User marks “I don’t understand”
  - App displays an alternate translation
- Visual text recognition
  - OCR functionality?
- Speech to text
  - ability to speak into the app and have the translation go out
  - Ability to train the speech to text module to recognize an individual’s regional dialect and pronunciation pattern
- Offline storage
- Undoable delete

## Tech stack

- HTML
- CSS
- JavaScript
- React
- Node
- Express
- PostgreSQL

### List of API’s to use :

- Google Translate
  - Later versions to use Amazon Translate, Amazon Polly Text to Speech, IBM Watson Speech to Text, and/or Mozilla DeepSpeech APIs
- AuthO login with Facebook and Google
- Twilio API (messaging)

# Installation

Fork and clone the Just Say In repo

## 1. API Keys

Get the following API keys:

- Google Translate
- Twilio

## 2. Put the keys in a .env file:

```
JUST_SAY_IN_APP_GOOGLE_TRANSLATE_API_KEY={Your Google API KEY here}
TWILIO_ACCOUNT_SID={Your Twilio API KEY here}
TWILIO_AUTH_TOKEN={Your Twilio AUTH TOKEN here}
TWILIO_PHONE_NUMBER={Your Twilio PHONE NUMBER here}
```

## 3. Install the dependencies

- CD into the JustSayInApp directory and run `npm install`

- In a separate terminal, CD into the client directory and run `npm install`

## 4. Run the app

- In the JustSayInApp directory, run `npm start`

- In the client directory, run `npm start`

5. Go to the browser, type something in and click the Translate button

## TODO: database files

- The user's info and contacts need to be stored in the database for messaging, so please check back for further instructions. In the meantime, look at the pretty pictures below:

# User Flows

The home page will allow translation regardless of the user’s login status. Logging in will allow the user to manage contacts, groups, and messages.

![Just Say In user flow-homepage login](readme_images/Just_Say_In_user_flow-homepage_login.png)

![Just Say In user flow-translation](readme_images/Just_Say_In_user_flow-translation.png)

![Just Say In user flow-people](readme_images/Just_Say_In_user_flow-people.png)

![Just Say In user flow-groups](readme_images/Just_Say_In_user_flow-groups.png)

![Just Say In user flow-messages](readme_images/Just_Say_In_user_flow-messages.png)

## Data Models:

![Just Say In data models](readme_images/Just_Say_In_data_models.png)
