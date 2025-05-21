export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  samlConfig: {
    entryPoint: 'https://saml.example.com/sso',
    issuer: 'your-issuer',
    cert: 'your-certificate',
    // additional SAML settings can be added here
  }
};