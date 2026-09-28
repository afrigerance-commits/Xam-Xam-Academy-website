import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fallbackResources } from './content';
import type { Resource } from './types';

const SITE_URL = 'https://xamxamacademy.com';
const API_URL = `${SITE_URL}/api/ressources.json`;
const CACHE_KEY = 'xamxam:resources:v1';

type ApiResource = {
  slug: string;
  title: string;
  level: Resource['level'];
  subject: Resource['subject'];
  chapter?: string;
  type: Resource['type'];
  description?: string;
  content?: string;
  date?: string;
  pdfUrl?: string | null;
  url: string;
};

type ApiResponse = {
  version: number;
  count: number;
  resources: ApiResource[];
};

type ResourcesContextValue = {
  resources: Resource[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const ResourcesContext = createContext<ResourcesContextValue | null>(null);

function absoluteUrl(value?: string | null) {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`;
}

function normalizeResource(item: ApiResource): Resource {
  const fallback = fallbackResources.find((resource) => resource.slug === item.slug);

  return {
    slug: item.slug,
    title: item.title,
    level: item.level,
    subject: item.subject,
    chapter: item.chapter ?? '',
    type: item.type,
    description: item.description ?? '',
    content: item.content ?? fallback?.content ?? '',
    date: item.date,
    url: absoluteUrl(item.url) ?? SITE_URL,
    pdfUrl: absoluteUrl(item.pdfUrl),
  };
}

async function fetchResources() {
  const response = await fetch(API_URL, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse;
  return data.resources.map(normalizeResource);
}

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<Resource[]>(fallbackResources);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const remote = await fetchResources();
      setResources(remote);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(remote));
    } catch {
      setError('Impossible de synchroniser les cours pour le moment.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const boot = async () => {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (active && cached) {
          setResources(JSON.parse(cached) as Resource[]);
        }
      } catch {
        // Le cache est facultatif : on continue avec le contenu de secours.
      }

      try {
        const remote = await fetchResources();
        if (active) {
          setResources(remote);
          setError(null);
        }
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(remote));
      } catch {
        if (active) {
          setError('Mode hors connexion : dernière version disponible affichée.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    boot();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({ resources, loading, error, refresh }),
    [resources, loading, error, refresh],
  );

  return <ResourcesContext.Provider value={value}>{children}</ResourcesContext.Provider>;
}

export function useResources() {
  const value = useContext(ResourcesContext);
  if (!value) throw new Error('useResources doit être utilisé dans ResourcesProvider');
  return value;
}
