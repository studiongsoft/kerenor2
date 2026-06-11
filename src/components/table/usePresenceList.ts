import { useEffect, useRef, useState } from 'react';
import {
  TABLE_ROW_EXIT_MS,
  TABLE_ROW_HIGHLIGHT_MS,
} from './tableRowAnimations';
import type { TableRowPresencePhase } from './tableRowAnimations';

export interface PresenceItem<T> {
  key: string;
  item: T;
  phase: TableRowPresencePhase;
}

export function usePresenceList<T>(items: T[], getKey: (item: T) => string): PresenceItem<T>[] {
  const getKeyRef = useRef(getKey);
  getKeyRef.current = getKey;

  const [presence, setPresence] = useState<PresenceItem<T>[]>(() =>
    items.map((item) => ({
      key: getKeyRef.current(item),
      item,
      phase: 'present' as const,
    })),
  );

  const exitTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const highlightTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const keyFn = getKeyRef.current;
    const nextItemMap = new Map(items.map((item) => [keyFn(item), item]));
    const nextKeys = new Set(nextItemMap.keys());

    setPresence((prev) => {
      const result: PresenceItem<T>[] = [];

      for (const entry of prev) {
        if (nextKeys.has(entry.key)) {
          result.push({
            key: entry.key,
            item: nextItemMap.get(entry.key)!,
            phase: entry.phase === 'exiting' ? 'exiting' : entry.phase,
          });
          continue;
        }

        if (entry.phase !== 'exiting') {
          result.push({ ...entry, phase: 'exiting' });
          continue;
        }

        result.push(entry);
      }

      for (const item of items) {
        const key = keyFn(item);
        if (!prev.some((entry) => entry.key === key)) {
          result.push({ key, item, phase: 'entering' });
        }
      }

      return result;
    });
  }, [items]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPresence((prev) =>
        prev.map((entry) =>
          entry.phase === 'entering' ? { ...entry, phase: 'highlighted' } : entry,
        ),
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [items]);

  useEffect(() => {
    for (const entry of presence) {
      if (entry.phase !== 'highlighted' || highlightTimersRef.current.has(entry.key)) {
        continue;
      }

      const timer = setTimeout(() => {
        highlightTimersRef.current.delete(entry.key);
        setPresence((current) =>
          current.map((item) =>
            item.key === entry.key && item.phase === 'highlighted'
              ? { ...item, phase: 'present' }
              : item,
          ),
        );
      }, TABLE_ROW_HIGHLIGHT_MS);

      highlightTimersRef.current.set(entry.key, timer);
    }
  }, [presence]);

  useEffect(() => {
    for (const entry of presence) {
      if (entry.phase !== 'exiting' || exitTimersRef.current.has(entry.key)) {
        continue;
      }

      const timer = setTimeout(() => {
        exitTimersRef.current.delete(entry.key);
        setPresence((current) => current.filter((item) => item.key !== entry.key));
      }, TABLE_ROW_EXIT_MS);

      exitTimersRef.current.set(entry.key, timer);
    }
  }, [presence]);

  useEffect(
    () => () => {
      exitTimersRef.current.forEach(clearTimeout);
      highlightTimersRef.current.forEach(clearTimeout);
    },
    [],
  );

  return presence;
}
