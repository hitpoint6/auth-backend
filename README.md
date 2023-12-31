# NodeJS Authentication Backend With Minimum Packages

This repo is for education purpose to explore how authentication works under the hood using Nodejs. Use together with [auth-frontend repo](https://github.com/hitpoint6/auth-frontend) in React. 
There will be a plan to build a production version using open source pacakges later.

<img width="300" alt="Screenshot 2023-10-06 at 10 06 00 PM" src="https://github.com/hitpoint6/auth-backend/assets/62563309/f41c92a3-7567-465d-8cba-83ef51dff89d">
<img width="300" alt="Screenshot 2023-10-06 at 10 06 18 PM" src="https://github.com/hitpoint6/auth-backend/assets/62563309/8df705b7-e0be-46ca-a44f-fdff0a036487">

## Packages

    - express: web framework
    - bodyParser: parse incoming request bodies
    - cookie-parser: parse cookie header
    - cors: cross-origin resource sharing
    - JWT: jsonwebtoken
    - bcryptjs: encrypt passwords
    - MongoDB: for user data storage

## JWT Token vs Server Sessions

    - JWT token is more scalable than server session token. It does not require to store sessions in memory and can handle distributed servers better.
    - Token Creation:
        1. JWT libraries first JSON-stringify the header and payload (e.g. userId).
        2. They then encode these JSON strings in Base64Url format.
        3. Finally, they create the signature using the specified hashing algorithm and the secret specified in the backend.
    - A JWT consists of three parts:
        `encodedHeader.encodedPayload.signature`
        1. Header: Contains the type of token and the algorithm used.
        2. Payload: Contains the claims and additional data.
        3. Signature: A cryptographic signature generated from the header, payload, and a secret key.
    - Token Verification:
        1. The library decodes the incoming JWT to retrieve the header and payload.
        2. It then recreates the signature using the same method as during creation.
        3. The recreated signature is compared to the one in the incoming token. If they match, it means the token hasn't been tampered with.
        4. If the JWT also contains an expiration claim (e.g., "exp"), the library checks if the token has expired.

## MVC Architecture

        |- /models
        |- /controllers
        |- /routes
        |- server.js
        |- /utils
        |- config
        |- .env

    - models: Database models like User
    - view: No view as we are using React frontend
    - controllers: Api call execution logic
    - Routes: Divided api routes
    - utils: database connection, encoding...
    - server.js: Entry point to the backend service
    - config: Application settings hard coded here
    - .env: Variables different in local and production environment

## Run locally

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Production Plan

    - Return user data on successful login
    - Set up HTTPS Flag for cookies for production
    - Better error handling
    - Better logging
    - Email confirmation and Password reset
    - Social login
