# Angular OAuth2 SAML Client

This project is an Angular application that serves as an OAuth2 SAML assertion client. It provides a user interface for logging in and accessing protected resources using SAML authentication.

## Project Structure

The project is organized as follows:

```
angular-oauth2-saml-client
├── src
│   ├── app
│   │   ├── app.component.html       # Main application component template
│   │   ├── app.component.ts         # Main application component logic
│   │   ├── app.module.ts            # Root module of the application
│   │   ├── auth
│   │   │   ├── auth.service.ts      # Authentication service
│   │   │   ├── auth.guard.ts        # Route guard for authentication
│   │   │   └── saml-config.ts       # SAML configuration settings
│   │   ├── components
│   │   │   ├── login
│   │   │   │   ├── login.component.html  # Login component template
│   │   │   │   ├── login.component.ts    # Login component logic
│   │   │   │   └── login.component.css   # Login component styles
│   │   │   └── dashboard
│   │   │       ├── dashboard.component.html  # Dashboard component template
│   │   │       ├── dashboard.component.ts    # Dashboard component logic
│   │   │       └── dashboard.component.css   # Dashboard component styles
│   │   └── services
│   │       └── api.service.ts          # API service for backend communication
│   ├── assets                           # Static assets (images, fonts, etc.)
│   └── environments
│       ├── environment.prod.ts         # Production environment settings
│       └── environment.ts              # Development environment settings
├── angular.json                        # Angular CLI configuration
├── package.json                        # npm configuration
├── tsconfig.json                       # TypeScript configuration
└── README.md                           # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd angular-oauth2-saml-client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application:
   - For development mode:
     ```
     npm run start
     ```
   - For production mode:
     ```
     npm run start:prod
     ```

## Usage

After starting the application, navigate to `http://localhost:4200` in your web browser. You will be presented with a login form. Enter your credentials to authenticate using SAML.

## Support

For any issues or feature requests, please open an issue in the repository. Contributions are welcome!