# Omnix — React Native Supabase Authentication

Omnix is a React Native authentication prototype built with Supabase. The project covers mobile account creation, email/password sign-in, Google OAuth through an in-app browser, password reset, deep-link handling, session restoration, a protected dashboard, and sign-out.

## Implemented features

- Email/password registration and login
- Google OAuth with a custom mobile redirect URI
- Password-reset email flow
- Supabase session persistence and auth-state listeners
- Deep-link processing after OAuth
- Protected dashboard and logout
- React Navigation screen flow
- Form validation, loading states, and error feedback

## Stack

- React Native 0.80 and React 19
- Supabase Auth
- React Navigation
- React Native App Auth / In-App Browser
- Android Studio and Xcode-compatible native projects

## Run locally

Configure the Supabase client and mobile OAuth redirect for your own project, then run:

```bash
npm install
npm start
npm run android
```

Use `npm run ios` for an iOS build on macOS with Xcode and CocoaPods configured.

## Author

[Joshua Shalim](https://github.com/JoshuaShalim)
