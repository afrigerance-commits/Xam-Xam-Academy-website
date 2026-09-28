import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../src/favorites';
import { ResourcesProvider } from '../src/resources';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ResourcesProvider>
        <FavoritesProvider>
          <StatusBar style="dark" backgroundColor="#F7F9FC" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#FFFFFF' },
              headerTintColor: '#021F4D',
              headerShadowVisible: false,
              headerTitleStyle: { fontWeight: '700' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="ressource/[slug]" options={{ title: 'Cours' }} />
          </Stack>
        </FavoritesProvider>
      </ResourcesProvider>
    </SafeAreaProvider>
  );
}
