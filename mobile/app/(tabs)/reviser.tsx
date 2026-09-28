import { useMemo, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResourceCard, SectionTitle } from '../../src/components';
import { levels } from '../../src/content';
import { useResources } from '../../src/resources';
import { COLORS } from '../../src/theme';

export default function ReviseScreen() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<string>('Tous');
  const { resources, loading, error, refresh } = useResources();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return resources.filter((item) => {
      const matchesLevel = level === 'Tous' || item.level === level;
      const matchesQuery =
        !q ||
        [item.title, item.chapter, item.subject, item.description]
          .join(' ')
          .toLowerCase()
          .includes(q);

      return matchesLevel && matchesQuery;
    });
  }, [query, level, resources]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.page}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
      >
        <SectionTitle eyebrow="Réviser" title="Trouve rapidement ton cours" />

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Ex. loi d’Ohm, combustion, Newton…"
          placeholderTextColor="#98A2B3"
          style={styles.search}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {['Tous', ...levels].map((item) => {
            const active = level === item;
            return (
              <Pressable
                key={item}
                onPress={() => setLevel(item)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.resultLine}>
          <Text style={styles.count}>
            {filtered.length} ressource{filtered.length > 1 ? 's' : ''}
          </Text>
          <Text style={styles.live}>Synchronisé avec Xam Xam Academy</Text>
        </View>

        {error ? <Text style={styles.offline}>{error}</Text> : null}

        <View style={{ gap: 14 }}>
          {filtered.map((item) => (
            <ResourceCard item={item} key={item.slug} />
          ))}
          {filtered.length === 0 && !loading ? (
            <Text style={styles.empty}>
              Aucune ressource ne correspond à cette recherche pour le moment.
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { paddingHorizontal: 18, paddingBottom: 40, gap: 16 },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    color: COLORS.text,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
  },
  chips: { gap: 8, paddingRight: 18 },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { color: COLORS.text, fontWeight: '700', fontSize: 12 },
  chipTextActive: { color: '#FFFFFF' },
  resultLine: { gap: 2 },
  count: { color: COLORS.muted, fontSize: 12 },
  live: { color: COLORS.blue, fontSize: 11, fontWeight: '700' },
  offline: { color: '#8A6100', fontSize: 12, lineHeight: 18 },
  empty: { color: COLORS.muted, textAlign: 'center', paddingVertical: 30 },
});
