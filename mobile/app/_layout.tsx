import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from '../src/favorites';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <StatusBar style="dark" />
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
  );
}
