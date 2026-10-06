import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionTitle } from '../../src/components';
import { videos } from '../../src/content';
import { COLORS, SHADOW } from '../../src/theme';

export default function VideosScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.page}>
        <SectionTitle eyebrow="Apprendre autrement" title="Vidéos de cours" />
        <Text style={styles.intro}>
          Retrouve les explications Xam Xam Academy et poursuis la leçon sur YouTube.
        </Text>

        {videos.map((video) => (
          <Pressable
            key={video.id}
            onPress={() => WebBrowser.openBrowserAsync(video.url)}
            style={styles.videoCard}
          >
            <View style={styles.play}>
              <Ionicons name="play" size={28} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.meta}>
                {video.level} · {video.duration}
              </Text>
            </View>
            <Ionicons name="open-outline" size={20} color={COLORS.navy} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { paddingHorizontal: 18, paddingBottom: 40, gap: 16 },
  intro: { color: COLORS.text, lineHeight: 21 },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    ...SHADOW,
  },
  play: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: COLORS.text, fontSize: 16, fontWeight: '800' },
  meta: { color: COLORS.muted, fontSize: 12 },
});
