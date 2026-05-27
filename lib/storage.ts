import { FuelSession } from './types';

const STORAGE_KEY = 'napolitrans_sessions';

export function getSessions(): FuelSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as FuelSession[];
    }
    return [];
  } catch {
    return [];
  }
}

export function saveSession(session: FuelSession): void {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  sessions.push(session);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function addSession(session: Omit<FuelSession, 'id'>): FuelSession {
  const newSession: FuelSession = {
    ...session,
    id: Date.now().toString(),
  };
  saveSession(newSession);
  return newSession;
}

export function clearSessions(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
