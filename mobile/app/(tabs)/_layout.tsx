import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/theme';

const iconFor = (name: string, focused: boolean) => {
  const map: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: focused ? 'home' : 'home-outline',
    reviser: focused ? 'book' : 'book-outline',
    ia: focused ? 'sparkles' : 'sparkles-outline',
    videos: focused ? 'play-circle' : 'play-circle-outline',
    favoris: focused ? 'heart' : 'heart-outline',
    profil: focused ? 'person-circle' : 'person-circle-outline',
  };
  return map[name] ?? 'ellipse-outline';
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.navy,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopColor: COLORS.line,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={iconFor(route.name, focused)} color={color} size={size} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="reviser" options={{ title: 'Réviser' }} />
      <Tabs.Screen name="ia" options={{ title: 'IA' }} />
      <Tabs.Screen name="videos" options={{ title: 'Vidéos' }} />
      <Tabs.Screen name="favoris" options={{ title: 'Favoris' }} />
      <Tabs.Screen name="profil" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
