import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Level } from './types';

const API_URL = 'https://xamxamacademy.com/api/xamxam-ai';
const USAGE_KEY = 'xamxam:ai-usage:v1';

export const FREE_DAILY_LIMIT = 5;

export type AiSubject = 'Physique-Chimie' | 'Physique' | 'Chimie';

type Usage = {
  date: string;
  count: number;
};

type AiResponse = {
  answer?: string;
  error?: string;
  code?: string;
};

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getAiUsage(): Promise<Usage> {
  const today = todayKey();

  try {
    const raw = await AsyncStorage.getItem(USAGE_KEY);
    if (!raw) return { date: today, count: 0 };

    const parsed = JSON.parse(raw) as Usage;
    if (parsed.date !== today) {
      return { date: today, count: 0 };
    }

    return {
      date: today,
      count: Number.isFinite(parsed.count) ? Math.max(0, parsed.count) : 0,
    };
  } catch {
    return { date: today, count: 0 };
  }
}

export async function recordAiUse() {
  const usage = await getAiUsage();
  const next = { ...usage, count: usage.count + 1 };
  await AsyncStorage.setItem(USAGE_KEY, JSON.stringify(next));
  return next;
}

export async function askXamXamAI(
  question: string,
  level: Level,
  subject: AiSubject,
): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, level, subject }),
  });

  const data = (await response.json().catch(() => null)) as AiResponse | null;

  if (!response.ok) {
    throw new Error(
      data?.error ??
        (response.status === 429
          ? 'Trop de demandes en ce moment. Réessaie dans quelques instants.'
          : 'Xam Xam IA est momentanément indisponible.'),
    );
  }

  if (!data?.answer) {
    throw new Error('La réponse reçue est vide. Réessaie en reformulant ta question.');
  }

  return data.answer;
}
