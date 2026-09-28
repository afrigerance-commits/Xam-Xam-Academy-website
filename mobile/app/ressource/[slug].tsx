import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { resources } from '../../src/content';
import { useFavorites } from '../../src/favorites';
import { COLORS } from '../../src/theme';

export default function ResourceScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const item = resources.find((resource) => resource.slug === slug);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!item) {
    return <SafeAreaView style={styles.safe}><View style={styles.page}><Text>Ressource introuvable.</Text></View></SafeAreaView>;
  }

  const favorite = isFavorite(item.slug);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.badges}>
          <Text style={styles.badgeGold}>{item.type}</Text>
          <Text style={styles.badge}>{item.level}</Text>
          <Text style={styles.badge}>{item.subject}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.meta}>{item.chapter} · {item.duration}</Text>

        <Pressable onPress={() => toggleFavorite(item.slug)} style={styles.favorite}>
          <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={21} color={favorite ? '#D92D20' : COLORS.navy} />
          <Text style={styles.favoriteText}>{favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</Text>
        </Pressable>

        <View style={styles.retain}>
          <Text style={styles.retainLabel}>À RETENIR</Text>
          <Text style={styles.retainText}>La loi d’Ohm relie la tension U, la résistance R et l’intensité I : U = R × I.</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Dans cette fiche</Text>
          {item.highlights.map((text, index) => (
            <View key={text} style={styles.point}>
              <View style={styles.number}><Text style={styles.numberText}>{index + 1}</Text></View>
              <Text style={styles.pointText}>{text}</Text>
            </View>
          ))}
        </View>

        <Pressable onPress={() => WebBrowser.openBrowserAsync(item.url)} style={styles.primary}>
          <Text style={styles.primaryText}>Lire le cours complet</Text>
          <Ionicons name="open-outline" size={19} color={COLORS.navy} />
        </Pressable>

        <Text style={styles.helper}>Le MVP ouvre pour l’instant la fiche complète sur xamxamacademy.com. La prochaine étape sera de synchroniser directement le contenu du CMS dans l’application.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { padding: 18, paddingBottom: 44, gap: 16 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  badge: { backgroundColor: '#EFF3F8', color: COLORS.navy, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 999, fontSize: 11, fontWeight: '700' },
  badgeGold: { backgroundColor: '#FFF5D6', color: '#805A00', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 999, fontSize: 11, fontWeight: '700' },
  title: { color: COLORS.navy, fontSize: 30, lineHeight: 36, fontWeight: '900' },
  description: { color: COLORS.text, fontSize: 15, lineHeight: 23 },
  meta: { color: COLORS.muted, fontSize: 12 },
  favorite: { flexDirection: 'row', gap: 8, alignItems: 'center', alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.line, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, backgroundColor: '#FFFFFF' },
  favoriteText: { color: COLORS.navy, fontWeight: '800' },
  retain: { backgroundColor: '#FFF8E2', borderLeftWidth: 4, borderLeftColor: COLORS.gold, borderRadius: 14, padding: 16, gap: 6 },
  retainLabel: { color: '#765300', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  retainText: { color: COLORS.text, lineHeight: 21 },
  block: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.line, borderRadius: 18, padding: 17, gap: 12 },
  blockTitle: { color: COLORS.navy, fontSize: 17, fontWeight: '900' },
  point: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  number: { width: 28, height: 28, borderRadius: 9, backgroundColor: '#EEF3FF', alignItems: 'center', justifyContent: 'center' },
  numberText: { color: COLORS.blue, fontWeight: '900' },
  pointText: { color: COLORS.text, flex: 1 },
  primary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, backgroundColor: COLORS.gold, borderRadius: 14, padding: 15 },
  primaryText: { color: COLORS.navy, fontWeight: '900', fontSize: 15 },
  helper: { color: COLORS.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
