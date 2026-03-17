# React Native Test Task

Expo-based React Native app that implements:
- onboarding flow
- sign up flow
- account details screen rendered from backend data

## Run

```bash
npm install
npx expo start
```

The app is intended to run in Expo Go on iOS and Android.

## Stack

- Expo
- React Native
- TypeScript
- React Navigation
- Reanimated
- AsyncStorage
- Jest + React Native Testing Library

## Engineering Notes

- `fetch` was used to keep the solution lighter and save implementation time for the test task. In larger production projects I generally prefer `axios`, especially when the app needs interceptors, shared client configuration, and more advanced request handling.
- The chosen feature-based architecture may be a bit more structured than strictly necessary for a task of this size, but I used it intentionally to show the folder organization approach I usually prefer for maintainability and separation of responsibilities.
- Loading and error states can be implemented in multiple ways depending on product priorities and UX direction. Here I aimed for a practical and user-friendly approach, while keeping the main focus on handling those states correctly. In a real product, the exact UX treatment would ideally be validated together with BA, product, and design.

## Architecture

The project uses a `src` folder with feature-based structure:

- `src/features/auth` for onboarding, sign up, auth API, auth hooks, auth components
- `src/features/profile` for account screen, account mappers, profile UI
- `src/shared` for navigation, theme, providers, reusable components
- `src/text` for centralized static UI copy
- `src/tests` for unit and integration tests

I chose feature-based architecture because the app is small, but still has clearly separated domains: auth and profile. This keeps screens, hooks, services, mappers, and local UI close to the feature that owns them.

## Navigation

The task explicitly asked for React Navigation, so the app uses:

- root stack for switching between auth flow and app flow
- auth stack for onboarding and sign up
- app stack for account screen

Routes are typed with enums and param list types in:
- [src/shared/navigation/navigationTypes.ts](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/shared/navigation/navigationTypes.ts)

## State Management

I did not add Redux, Zustand, or another external state manager because the app does not need that complexity.

Current state is handled with:

- local `useState` for form state, loading, UI errors
- `AppSessionProvider` for onboarding/session/account flow
- `AppThemeProvider` for app theme mode

This keeps the solution simpler and matches the scale of the test task.

## API Flow

The backend flow is implemented as:

1. `POST /signup`
2. extract `basicAuthCredentials`
3. `GET /interview/account` with Basic Auth
4. render `My Account` from the account response

This means the account screen is driven by the real backend account payload, not by hardcoded mock account data.

## Data-Driven Account Screen

The account screen is intentionally split into:

- API payload types
- mapper functions that transform backend data into UI rows/items
- presentational components for summary and transactions

Main files:

- [src/features/profile/utils/accountMappers.ts](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/features/profile/utils/accountMappers.ts)
- [src/features/profile/screens/accountScreen.tsx](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/features/profile/screens/accountScreen.tsx)

## Validation

Sign up validation covers:

- name format
- email format
- password length and strength
- accepted terms checkbox

Validation logic:

- [src/features/auth/utils/validateSignup.ts](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/features/auth/utils/validateSignup.ts)

## Styling and Theme

The app uses centralized design tokens for:

- colors
- typography
- spacing
- radius
- shadows

Theme tokens:

- [src/shared/theme/tokens.ts](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/shared/theme/tokens.ts)

This theme layer is intentionally lightweight, but it imitates a fuller production theming setup:

- centralized color palettes for light and dark mode
- centralized typography
- shared spacing, radius, and shadow tokens
- reusable themed components built on top of those tokens

## Texts and Localization

All static UI copy is centralized in:

- [src/text/index.ts](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/text/index.ts)

This is a lightweight localization imitation layer. For the scope of the task I kept a single text object, but the structure is prepared in a way that can later be replaced with a real i18n solution if needed.

## Sensitive Data Note

For the signup flow, the backend returns credentials that are used to fetch account details.

In a production application, sensitive data like this should be stored in a secure storage solution rather than plain app state or regular persistent storage.

For example, on Expo this could be implemented with a secure storage approach such as `expo-secure-store`.

I intentionally did not add that here in order to:

- keep the test task implementation simpler
- avoid increasing app complexity beyond the scope of the assignment
- stay within the expected time estimate

For this task, the credentials are only kept for the flow that fetches account details, but for real-world sensitive data I would treat secure storage as the correct approach.

## Tests

Added bonus tests:

- unit test for form validation
- integration test for sign up error state

I intentionally added one test of each type to demonstrate both:

- focused logic coverage at unit level
- real UI behavior coverage at integration level

Test files:

- [src/tests/auth/validateSignup.test.ts](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/tests/auth/validateSignup.test.ts)
- [src/tests/auth/signupScreen.test.tsx](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/tests/auth/signupScreen.test.tsx)

Run tests:

```bash
npm test -- --runInBand
```

## Notes

- Onboarding is shown only once using AsyncStorage.
- Static UI texts are centralized in [src/text/index.ts](/Users/anatoliyocheretnyi/Documents/KnightPair/test/test_task/src/text/index.ts).
- Error and loading states were implemented for both signup and account fetching.
