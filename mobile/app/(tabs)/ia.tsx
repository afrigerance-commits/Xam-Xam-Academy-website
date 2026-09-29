import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  askXamXamAI,
  FREE_DAILY_LIMIT,
  getAiUsage,
  recordAiUse,
  type AiSubject,
} from '../../src/ai';
import { levels } from '../../src/content';
import { COLORS, SHADOW } from '../../src/theme';
import type { Level } from '../../src/types';

const suggestions = [
  'Explique-moi la loi d’Ohm simplement.',
  'Comment convertir des mA en A ?',
  'Donne-moi un exercice court sur les forces.',
];

const subjects: AiSubject[] = ['Physique-Chimie', 'Physique', 'Chimie'];

export default function AiScreen() {
  const [question, setQuestion] = useState('');
  const [level, setLevel] = useState<Level>('4e');
  const [subject, setSubject] = useState<AiSubject>('Physique-Chimie');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [used, setUsed] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadUsage = useCallback(async () => {
    const usage = await getAiUsage();
    setUsed(usage.count);
  }, []);

  useEffect(() => {
    loadUsage();
  }, [loadUsage]);

  const remaining = Math.max(0, FREE_DAILY_LIMIT - used);
  const canAsk = question.trim().length >= 3 && !loading && remaining > 0;

  const submit = async () => {
    if (!canAsk) return;

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const text = await askXamXamAI(question.trim(), level, subject);
      setAnswer(text);
      const usage = await recordAiUse();
      setUsed(usage.count);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.page}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.aiIcon}>
              <Ionicons name="sparkles" size={25} color={COLORS.gold} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={styles.eyebrow}>XAM XAM IA</Text>
              <Text style={styles.title}>Ton tuteur de Physique-Chimie</Text>
            </View>
          </View>

          <Text style={styles.intro}>
            Pose ta question. Xam Xam IA t’explique la démarche étape par étape en
            s’adaptant à ton niveau.
          </Text>

          <View style={styles.limitCard}>
            <View style={styles.limitTop}>
              <Text style={styles.limitTitle}>Version découverte</Text>
              <Text style={styles.limitNumber}>
                {remaining}/{FREE_DAILY_LIMIT}
              </Text>
            </View>
            <Text style={styles.limitText}>
              question{remaining > 1 ? 's' : ''} restante{remaining > 1 ? 's' : ''} aujourd’hui
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(remaining / FREE_DAILY_LIMIT) * 100}%` },
                ]}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Ton niveau</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              {levels.map((item) => {
                const active = level === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => setLevel(item)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Matière</Text>
            <View style={styles.subjects}>
              {subjects.map((item) => {
                const active = subject === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => setSubject(item)}
                    style={[styles.subject, active && styles.subjectActive]}
                  >
                    <Text
                      numberOfLines={1}
                      style={[styles.subjectText, active && styles.subjectTextActive]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Quelques idées</Text>
            <View style={styles.suggestions}>
              {suggestions.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setQuestion(item)}
                  style={styles.suggestion}
                >
                  <Ionicons name="flash-outline" size={15} color={COLORS.blue} />
                  <Text style={styles.suggestionText}>{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <View style={styles.questionHeader}>
              <Text style={styles.label}>Ta question</Text>
              <Text style={styles.counter}>{question.length}/1500</Text>
            </View>
            <TextInput
              value={question}
              onChangeText={setQuestion}
              maxLength={1500}
              multiline
              textAlignVertical="top"
              placeholder="Ex. Je ne comprends pas pourquoi 50 mA = 0,050 A. Tu peux m’expliquer ?"
              placeholderTextColor="#98A2B3"
              style={styles.input}
            />
          </View>

          <Pressable
            disabled={!canAsk}
            onPress={submit}
            style={({ pressed }) => [
              styles.askButton,
              !canAsk && styles.askButtonDisabled,
              pressed && canAsk && { opacity: 0.9 },
            ]}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.navy} />
            ) : (
              <>
                <Ionicons name="sparkles" size={19} color={COLORS.navy} />
                <Text style={styles.askButtonText}>
                  {remaining > 0 ? 'Demander à Xam Xam IA' : 'Limite du jour atteinte'}
                </Text>
              </>
            )}
          </Pressable>

          {error ? (
            <View style={styles.errorCard}>
              <Ionicons name="alert-circle-outline" size={21} color="#B54708" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {answer ? (
            <View style={styles.answerCard}>
              <View style={styles.answerHeader}>
                <View style={styles.answerIcon}>
                  <Ionicons name="sparkles" size={18} color={COLORS.gold} />
                </View>
                <Text style={styles.answerTitle}>Explication Xam Xam</Text>
              </View>
              <Text selectable style={styles.answerText}>
                {answer}
              </Text>
            </View>
          ) : null}

          <View style={styles.plusCard}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={styles.plusKicker}>XAM XAM+</Text>
              <Text style={styles.plusTitle}>Plus de questions, plus d’entraînement.</Text>
              <Text style={styles.plusText}>
                Les quotas étendus, les quiz personnalisés et le suivi de progression
                feront partie de l’offre premium.
              </Text>
            </View>
            <Ionicons name="diamond-outline" size={30} color={COLORS.gold} />
          </View>

          <Text style={styles.disclaimer}>
            Xam Xam IA est un outil pédagogique. Une IA peut se tromper : pour un devoir,
            un examen ou une expérience, vérifie toujours les données et les consignes de
            ton professeur.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  page: { paddingHorizontal: 18, paddingBottom: 42, gap: 18 },
  hero: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 8 },
  aiIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW,
  },
  eyebrow: { color: COLORS.blue, fontWeight: '900', fontSize: 11, letterSpacing: 1.2 },
  title: { color: COLORS.navy, fontSize: 25, lineHeight: 30, fontWeight: '900' },
  intro: { color: COLORS.text, fontSize: 14, lineHeight: 21 },
  limitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 6,
  },
  limitTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  limitTitle: { color: COLORS.navy, fontSize: 13, fontWeight: '900' },
  limitNumber: { color: COLORS.blue, fontSize: 17, fontWeight: '900' },
  limitText: { color: COLORS.muted, fontSize: 12 },
  progressTrack: {
    height: 6,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: '#EEF1F5',
    marginTop: 3,
  },
  progressFill: { height: 6, borderRadius: 999, backgroundColor: COLORS.gold },
  field: { gap: 9 },
  label: { color: COLORS.navy, fontWeight: '900', fontSize: 13 },
  chips: { gap: 8, paddingRight: 18 },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { color: COLORS.text, fontSize: 12, fontWeight: '700' },
  chipTextActive: { color: '#FFFFFF' },
  subjects: { flexDirection: 'row', gap: 7 },
  subject: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 7,
    alignItems: 'center',
  },
  subjectActive: { backgroundColor: '#EEF4FF', borderColor: '#AFC7FF' },
  subjectText: { color: COLORS.muted, fontSize: 10, fontWeight: '800' },
  subjectTextActive: { color: COLORS.navy },
  suggestions: { gap: 7 },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 12,
    padding: 11,
  },
  suggestionText: { color: COLORS.text, fontSize: 12, flex: 1 },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  counter: { color: COLORS.muted, fontSize: 11 },
  input: {
    minHeight: 125,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 16,
    padding: 14,
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 21,
  },
  askButton: {
    minHeight: 51,
    backgroundColor: COLORS.gold,
    borderRadius: 15,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  askButtonDisabled: { opacity: 0.45 },
  askButtonText: { color: COLORS.navy, fontSize: 14, fontWeight: '900' },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#FFF4E8',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  errorText: { flex: 1, color: '#7C2D12', fontSize: 13, lineHeight: 19 },
  answerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 17,
    borderWidth: 1,
    borderColor: COLORS.line,
    gap: 13,
    ...SHADOW,
  },
  answerHeader: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  answerIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerTitle: { color: COLORS.navy, fontSize: 16, fontWeight: '900' },
  answerText: { color: COLORS.text, fontSize: 14, lineHeight: 22 },
  plusCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: COLORS.navy,
    borderRadius: 19,
    padding: 17,
  },
  plusKicker: { color: COLORS.gold, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  plusTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  plusText: { color: '#D9E4F5', fontSize: 12, lineHeight: 18 },
  disclaimer: { color: COLORS.muted, textAlign: 'center', fontSize: 10, lineHeight: 15 },
});
