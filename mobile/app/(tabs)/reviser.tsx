import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { ResourceCard, SectionTitle } from '../../src/components';
import { levels, resources } from '../../src/content';
import { COLORS } from '../../src/theme';

export default function ReviseScreen() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<string>('Tous');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((item) => {
      const matchesLevel = level === 'Tous' || item.level === level;
      const matchesQuery = !q || [item.title, item.chapter, item.subject, item.description].join(' ').toLowerCase().includes(q);
      return matchesLevel && matchesQuery;
    });
  }, [query, level]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <SectionTitle eyebrow="Réviser" title="Trouve rapidement ton cours" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Ex. loi d’Ohm, combustion, Newton…"
          placeholderTextColor="#98A2B3"
          style={styles.search}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {['Tous', ...levels].map((item) => {
            const active = level === item;
            return (
              <Pressable key={item} onPress={() => setLevel(item)} style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.count}>{filtered.length} ressource{filtered.length > 1 ? 's' : ''}</Text>
        <View style={{ gap: 14 }}>
          {filtered.map((item) => <ResourceCard item={item} key={item.slug} />)}
          {filtered.length === 0 ? <Text style={styles.empty}>Aucune ressource ne correspond à cette recherche pour le moment.</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { padding: 18, paddingBottom: 40, gap: 16 },
  search: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.line, color: COLORS.text, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, fontSize: 15 },
  chips: { gap: 8, paddingRight: 18 },
  chip: { borderWidth: 1, borderColor: COLORS.line, backgroundColor: '#FFFFFF', paddingHorizontal: 13, paddingVertical: 8, borderRadius: 999 },
  chipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { color: COLORS.text, fontWeight: '700', fontSize: 12 },
  chipTextActive: { color: '#FFFFFF' },
  count: { color: COLORS.muted, fontSize: 12 },
  empty: { color: COLORS.muted, textAlign: 'center', paddingVertical: 30 },
});
