import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader, ResourceCard, SectionTitle } from '../../src/components';
import { useResources } from '../../src/resources';
import { COLORS } from '../../src/theme';

export default function HomeScreen() {
  const { resources, loading, error } = useResources();
  const featured = resources[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.page}>
        <BrandHeader />

        <View style={styles.hero}>
          <Text style={styles.kicker}>Comprendre. Progresser. Réussir.</Text>
          <Text style={styles.heroTitle}>La Physique-Chimie, plus claire à chaque étape.</Text>
          <Text style={styles.heroText}>
            Révise tes cours, entraîne-toi avec des exercices corrigés et retrouve rapidement les notions qui te posent problème.
          </Text>

          <Link href="/(tabs)/reviser" style={styles.primaryButton}>
            Commencer à réviser
          </Link>

          <View style={styles.heroStats}>
            <View style={styles.stat}>
              <Ionicons name="book-outline" size={20} color={COLORS.gold} />
              <Text style={styles.statText}>Cours & exercices</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="play-outline" size={20} color={COLORS.gold} />
              <Text style={styles.statText}>Vidéos</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="heart-outline" size={20} color={COLORS.gold} />
              <Text style={styles.statText}>Favoris</Text>
            </View>
          </View>
        </View>

        <Link href="/(tabs)/ia" asChild>
          <Pressable style={styles.aiCard}>
            <View style={styles.aiCardIcon}>
              <Ionicons name="sparkles" size={22} color={COLORS.gold} />
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={styles.aiCardKicker}>NOUVEAU · XAM XAM IA</Text>
              <Text style={styles.aiCardTitle}>Une notion te bloque ? Demande à ton tuteur IA.</Text>
              <Text style={styles.aiCardText}>5 questions offertes par jour dans la version découverte.</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.navy} />
          </Pressable>
        </Link>

        <View style={styles.sectionHeading}>
          <SectionTitle eyebrow="À découvrir" title="Commence par une fiche" />
          {loading ? <Text style={styles.sync}>Synchronisation…</Text> : null}
        </View>

        {featured ? (
          <ResourceCard item={featured} />
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Les premiers cours arrivent bientôt.</Text>
          </View>
        )}

        {error ? <Text style={styles.offline}>{error}</Text> : null}

        <View style={styles.smartCard}>
          <View style={styles.smartIcon}>
            <Ionicons name="sparkles" size={22} color={COLORS.gold} />
          </View>
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={styles.smartTitle}>Bientôt : Diagnostic Xam Xam</Text>
            <Text style={styles.smartText}>
              5 questions pour identifier les notions à revoir et proposer un parcours personnalisé.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { paddingHorizontal: 18, paddingBottom: 40, gap: 22 },
  hero: { backgroundColor: COLORS.navy, borderRadius: 26, padding: 22, gap: 14 },
  kicker: { color: COLORS.gold, fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#FFFFFF', fontSize: 31, lineHeight: 37, fontWeight: '900' },
  heroText: { color: '#D9E4F5', fontSize: 15, lineHeight: 23 },
  primaryButton: {
    backgroundColor: COLORS.gold,
    color: COLORS.navy,
    fontWeight: '900',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 2 },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,.08)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  statText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E5FF',
    borderRadius: 18,
    padding: 15,
  },
  aiCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCardKicker: { color: COLORS.blue, fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
  aiCardTitle: { color: COLORS.navy, fontSize: 14, lineHeight: 18, fontWeight: '900' },
  aiCardText: { color: COLORS.muted, fontSize: 11, lineHeight: 16 },
  sectionHeading: { gap: 4 },
  sync: { color: COLORS.muted, fontSize: 12 },
  offline: { color: COLORS.muted, fontSize: 12, textAlign: 'center' },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 18,
    padding: 20,
  },
  emptyTitle: { color: COLORS.navy, fontWeight: '800' },
  smartCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: '#FFF9E8',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE5A0',
  },
  smartIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartTitle: { color: COLORS.navy, fontWeight: '800', fontSize: 15 },
  smartText: { color: COLORS.text, lineHeight: 19, fontSize: 13 },
});
