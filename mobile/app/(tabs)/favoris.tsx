import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ResourceCard, SectionTitle } from '../../src/components';
import { resources } from '../../src/content';
import { useFavorites } from '../../src/favorites';
import { COLORS } from '../../src/theme';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const items = resources.filter((item) => favorites.includes(item.slug));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <SectionTitle eyebrow="Ton espace" title="Favoris" />
        {items.length ? (
          <View style={{ gap: 14 }}>{items.map((item) => <ResourceCard item={item} key={item.slug} />)}</View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Aucun favori pour le moment</Text>
            <Text style={styles.emptyText}>Ouvre une fiche et touche le cœur pour la retrouver ici.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { padding: 18, paddingBottom: 40, gap: 18 },
  empty: { backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: COLORS.line, padding: 24, gap: 6 },
  emptyTitle: { color: COLORS.navy, fontSize: 17, fontWeight: '800' },
  emptyText: { color: COLORS.muted, lineHeight: 20 },
});
