import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Resource } from './types';
import { COLORS, SHADOW } from './theme';

const logo = require('../assets/logo-horizontal.png');

export function BrandHeader() {
  return (
    <View style={styles.brandWrap}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <View style={{ gap: 4 }}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function metaText(item: Resource) {
  return [item.chapter, item.duration].filter(Boolean).join(' · ');
}

export function ResourceCard({ item }: { item: Resource }) {
  const meta = metaText(item);

  return (
    <Link href={{ pathname: '/ressource/[slug]', params: { slug: item.slug } }} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
        <View style={styles.badges}>
          <Text style={styles.badgeGold}>{item.type}</Text>
          <Text style={styles.badge}>{item.level}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {meta ? <Text style={styles.cardMeta}>{meta}</Text> : null}
        {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
        <View style={styles.cardCta}>
          <Text style={styles.cardCtaText}>Ouvrir le cours</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.navy} />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  brandWrap: {
    height: 82,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: { width: 190, height: 54 },
  eyebrow: {
    color: COLORS.blue,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionTitle: { color: COLORS.navy, fontSize: 25, fontWeight: '800' },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 18,
    gap: 10,
    ...SHADOW,
  },
  badges: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
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
  cardTitle: { color: COLORS.text, fontSize: 19, lineHeight: 25, fontWeight: '800' },
  cardMeta: { color: COLORS.muted, fontSize: 12 },
  cardDescription: { color: COLORS.text, fontSize: 14, lineHeight: 21 },
  cardCta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  cardCtaText: { color: COLORS.navy, fontWeight: '800' },
});
