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

## Steps



