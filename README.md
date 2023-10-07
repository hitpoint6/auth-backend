# NodeJS Authentication Backend

Cookie-based authentication backend for ReactJS frontend repo auth-frontend.

## Packages

    - express: web framework
    - bodyParser: parse incoming request bodies
    - cookie-parser: parse cookie header
    - cors: cross-origin resource sharing
    - JWT: jsonwebtoken
    - bcryptjs: encrypt passwords

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Production Plan

    - Add DB for durable user data storage
    - Return user data on successful login
    - Set up HTTPS Flag for cookies for production
    - Better error handling
    - Better logging
    - Refactor to MVC
    - Email confirmation and Password reset
    - Social login
