import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../src/favorites';
import { useResources } from '../../src/resources';
import { COLORS } from '../../src/theme';
import { NativeCourseContent } from '../../src/NativeCourseContent';

export default function ResourceScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { resources, loading } = useResources();
  const item = resources.find((resource) => resource.slug === slug);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!item && loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.page}>
          <Text style={styles.loading}>Chargement du cours…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.page}>
          <Text style={styles.loading}>Ressource introuvable.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite(item.slug);
  const meta = [item.chapter, item.date ? new Date(item.date).toLocaleDateString('fr-FR') : null]
    .filter(Boolean)
    .join(' · ');

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.badges}>
          <Text style={styles.badgeGold}>{item.type}</Text>
          <Text style={styles.badge}>{item.level}</Text>
          <Text style={styles.badge}>{item.subject}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}

        <Pressable onPress={() => toggleFavorite(item.slug)} style={styles.favorite}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={21}
            color={favorite ? '#D92D20' : COLORS.navy}
          />
          <Text style={styles.favoriteText}>
            {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </Text>
        </Pressable>

        <View style={styles.syncCard}>
          <Ionicons name="cloud-done-outline" size={25} color={COLORS.blue} />
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={styles.syncTitle}>Cours synchronisé</Text>
            <Text style={styles.syncText}>
              Cette fiche provient directement des contenus publiés depuis Sveltia CMS.
            </Text>
          </View>
        </View>

        {item.highlights?.length ? (
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Dans cette fiche</Text>
            {item.highlights.map((text, index) => (
              <View key={text} style={styles.point}>
                <View style={styles.number}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <Text style={styles.pointText}>{text}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {item.content ? (
          <View style={styles.course}>
            <View style={styles.courseHeader}>
              <Ionicons name="book-outline" size={21} color={COLORS.navy} />
              <Text style={styles.courseTitle}>Cours complet</Text>
            </View>
            <NativeCourseContent markdown={item.content} />
          </View>
        ) : null}

        <Pressable
          onPress={() => WebBrowser.openBrowserAsync(item.url)}
          style={item.content ? styles.secondary : styles.primary}
        >
          <Ionicons
            name="open-outline"
            size={19}
            color={item.content ? COLORS.navy : COLORS.navy}
          />
          <Text style={item.content ? styles.secondaryText : styles.primaryText}>
            {item.content ? 'Ouvrir aussi sur le site' : 'Lire le cours complet'}
          </Text>
        </Pressable>

        {item.pdfUrl ? (
          <Pressable
            onPress={() => WebBrowser.openBrowserAsync(item.pdfUrl!)}
            style={styles.secondary}
          >
            <Ionicons name="document-outline" size={19} color={COLORS.navy} />
            <Text style={styles.secondaryText}>Ouvrir le PDF</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { padding: 18, paddingBottom: 44, gap: 16 },
  loading: { color: COLORS.muted, fontSize: 15 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  badge: {
    backgroundColor: '#EFF3F8',
    color: COLORS.navy,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
  },
  badgeGold: {
    backgroundColor: '#FFF5D6',
    color: '#805A00',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
  },
  title: { color: COLORS.navy, fontSize: 30, lineHeight: 36, fontWeight: '900' },
  description: { color: COLORS.text, fontSize: 15, lineHeight: 23 },
  meta: { color: COLORS.muted, fontSize: 12 },
  favorite: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#FFFFFF',
  },
  favoriteText: { color: COLORS.navy, fontWeight: '800' },
  syncCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#EEF4FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D8E5FF',
  },
  syncTitle: { color: COLORS.navy, fontSize: 15, fontWeight: '900' },
  syncText: { color: COLORS.text, fontSize: 13, lineHeight: 19 },
  block: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 18,
    padding: 17,
    gap: 12,
  },
  blockTitle: { color: COLORS.navy, fontSize: 17, fontWeight: '900' },
  point: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  number: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { color: COLORS.blue, fontWeight: '900' },
  pointText: { color: COLORS.text, flex: 1 },
  course: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 18,
    padding: 17,
    gap: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  courseTitle: { color: COLORS.navy, fontSize: 17, fontWeight: '900' },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: COLORS.gold,
    borderRadius: 14,
    padding: 15,
  },
  primaryText: { color: COLORS.navy, fontWeight: '900', fontSize: 15 },
  secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    padding: 14,
  },
  secondaryText: { color: COLORS.navy, fontWeight: '800', fontSize: 14 },
});
