# sample-auth-azuread-angular-django

Boilerplate auth implementation using both Django DRF built-in auth and Microsoft Azure AD based SSO. 
Leveraging industry best practices with `JWT`, `Refresh token` and Automated `Blacklisting`.

## Pre-Requisite

- Azure Portal Account ( Could be your personal account )
- Provisioned Azure Active Directory ( Sample )
- Note down the client id , tenant id and redirect uri.
- Create a secret key for Django built-in JWT Auth. ( Not recommended to use the built-in SECRET_KEY )  

## Notes
- Microsoft is much more flexible with the OAuth 2.0 and OIDC protocols so no JS origin needs to be defined.
- Note only single SPA registration will do, don't do duplicate backend registration 
- We'll be using old school code-grant-auth flow. 

## High-Level Steps

### Frontend (Angular)

* Install the MSAL (Microsoft Authentication Library) package and set up its configuration.

* Add the MSAL module to the app.module.ts file and configure it with the settings you defined earlier.

* Update the app-routing.module.ts to include login, register, and dashboard routes. Use the MsalGuard to protect the dashboard route.

* Implement an auth.service.ts to handle authentication. This service should have methods for sign-in, sign-out, and token acquisition using the MSAL service.

* Create a backend-consumer.service.ts to communicate with the Django backend. This service should acquire the token from the auth.service.ts and use it in the Authorization header when making API calls.

* Implement the login.component.ts, register.component.ts, and dashboard.component.ts to handle user actions (login, register, and accessing the dashboard).

### Backend (Django)

* Install the necessary packages, such as Django Rest Framework, Simple JWT, CORS headers, and MSAL.

* Update the settings.py file to include the necessary configurations for the installed packages, such as adding them to INSTALLED_APPS, setting up CORS, and configuring the authentication classes for the Django Rest Framework.

* In the token_backend.py, create a custom token backend class to handle token validation and user authentication. This class should implement the authenticate method and use the MSAL library to validate the access token received from the frontend.

* Register the custom token backend in the Django Rest Framework's DEFAULT_AUTHENTICATION_CLASSES in settings.py.

* Implement views in views.py to handle user registration, login, and other required actions. Ensure these views use the proper authentication classes, such as your custom token backend for protected views.

* Set up your Django app's URLs to include the routes for the views you implemented.

By following these high-level steps, you should be able to create a boilerplate authentication implementation using both Django DRF built-in auth and Microsoft Azure AD based SSO in an Angular and Django application.