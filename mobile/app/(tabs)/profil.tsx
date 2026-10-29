import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader, SectionTitle } from '../../src/components';
import { COLORS } from '../../src/theme';

const links = [
  {
    label: 'Site officiel',
    value: 'xamxamacademy.com',
    icon: 'globe-outline' as const,
    url: 'https://xamxamacademy.com',
  },
  {
    label: 'WhatsApp',
    value: '+221 71 171 53 59',
    icon: 'logo-whatsapp' as const,
    url: 'https://wa.me/221711715359',
  },
  {
    label: 'YouTube',
    value: '@XamXamAcademia',
    icon: 'logo-youtube' as const,
    url: 'https://www.youtube.com/@XamXamAcademia',
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.page}>
        <BrandHeader />
        <SectionTitle eyebrow="Xam Xam Academy" title="Ton accompagnement" />
        <Text style={styles.intro}>
          Cours de Physique-Chimie, exercices corrigés, méthodologie et accompagnement à
          Dakar, Thiès et en ligne.
        </Text>

        <View style={{ gap: 10 }}>
          {links.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => WebBrowser.openBrowserAsync(item.url)}
              style={styles.row}
            >
              <Ionicons name={item.icon} size={23} color={COLORS.navy} />
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </Pressable>
          ))}
        </View>

        <View style={styles.note}>
          <Text style={styles.noteTitle}>Application Xam Xam Academy</Text>
          <Text style={styles.noteText}>
            Les cours publiés sur le site sont maintenant synchronisés automatiquement
            dans l’application.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { paddingHorizontal: 18, paddingBottom: 40, gap: 18 },
  intro: { color: COLORS.text, lineHeight: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    padding: 15,
  },
  label: { color: COLORS.navy, fontSize: 14, fontWeight: '800' },
  value: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  note: { backgroundColor: COLORS.navy, borderRadius: 18, padding: 18, gap: 5 },
  noteTitle: { color: COLORS.gold, fontWeight: '900' },
  noteText: { color: '#E7EEF8', lineHeight: 20 },
});
