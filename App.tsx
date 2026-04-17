// AutoGo - App Entry Point
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to your .env file.'
  );
}

export default function App(): React.JSX.Element {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Provider store={store}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <AppNavigator />
        </Provider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
