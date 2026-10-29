import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import snapshot from './data/resources.json';
import type { Resource } from './types';
import { isResourceList, mergeResources } from './resource-data';

// Sur téléphone : utiliser l'adresse IP du PC, jamais localhost.
const SITE_URL = (process.env.EXPO_PUBLIC_SITE_URL || 'https://xamxamacademy.com').replace(/\/$/, '');
const API_URL = `${SITE_URL}/api/ressources.json`;
const CACHE_KEY = 'xamxam:resources:v2';
const bundled = mergeResources(snapshot.resources as Resource[], [], SITE_URL, 'bundled');

type ResourcesContextValue = {
  resources: Resource[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
const ResourcesContext = createContext<ResourcesContextValue | null>(null);

async function fetchResources(previous: Resource[], signal: AbortSignal) {
  const response = await fetch(API_URL, { headers: { Accept: 'application/json' }, signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (!isResourceList(data?.resources)) throw new Error('Flux de cours invalide');
  return mergeResources(data.resources, previous, SITE_URL, 'synced');
}

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<Resource[]>(bundled);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const current = useRef(bundled);
  const active = useRef(true);
  const request = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    if (request.current) return;
    const controller = new AbortController();
    request.current = controller;
    const timer = setTimeout(() => controller.abort(), 10000);
    setLoading(true);
    setError(null);
    try {
      const remote = await fetchResources(current.current, controller.signal);
      if (!active.current || request.current !== controller) return;
      current.current = remote;
      setResources(remote);
      try {
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(remote));
      } catch {
        if (active.current) setError('Cours actualisés, mais le téléphone n’a pas pu enregistrer le cache.');
      }
    } catch {
      if (active.current && request.current === controller) setError('Synchronisation indisponible. Les cours enregistrés restent accessibles.');
    } finally {
      clearTimeout(timer);
      if (request.current === controller) {
        request.current = null;
        if (active.current) setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    active.current = true;
    const boot = async () => {
      try {
        const raw = await AsyncStorage.getItem(CACHE_KEY);
        const cached: unknown = raw ? JSON.parse(raw) : null;
        if (active.current && isResourceList(cached)) {
          const restored = mergeResources(cached, bundled, SITE_URL);
          current.current = restored;
          setResources(restored);
        }
      } catch { /* Cache endommagé : les cours embarqués restent disponibles. */ }
      if (active.current) await refresh();
    };
    void boot();
    return () => { active.current = false; request.current?.abort(); request.current = null; };
  }, [refresh]);

  const value = useMemo(() => ({ resources, loading, error, refresh }), [resources, loading, error, refresh]);
  return <ResourcesContext.Provider value={value}>{children}</ResourcesContext.Provider>;
}
export function useResources() {
  const value = useContext(ResourcesContext);
  if (!value) throw new Error('useResources doit être utilisé dans ResourcesProvider');
  return value;
}
