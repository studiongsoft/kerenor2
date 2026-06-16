import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

function sameKeySet(previousKeys: string[], nextKeys: string[]): boolean {
  if (previousKeys.length !== nextKeys.length) {
    return false;
  }

  const previousKeySet = new Set(previousKeys);
  if (previousKeySet.size !== nextKeys.length) {
    return false;
  }

  return nextKeys.every((key) => previousKeySet.has(key));
}

function orderChanged(previousKeys: string[], nextKeys: string[]): boolean {
  return previousKeys.some((key, index) => key !== nextKeys[index]);
}

/** Page swap with no shared rows — skip enter/exit animations. */
function isFullSwap(previousKeys: string[], nextKeys: string[]): boolean {
  if (previousKeys.length === 0 || nextKeys.length === 0) {
    return previousKeys.length !== nextKeys.length;
  }

  const nextKeySet = new Set(nextKeys);
  return !previousKeys.some((key) => nextKeySet.has(key));
}

/** Sort/filter/page overlap — both additions and removals; instant swap avoids blank rows. */
function isMixedChange(previousKeys: string[], nextKeys: string[]): boolean {
  const previousKeySet = new Set(previousKeys);
  const nextKeySet = new Set(nextKeys);
  const hasAdditions = nextKeys.some((key) => !previousKeySet.has(key));
  const hasRemovals = previousKeys.some((key) => !nextKeySet.has(key));
  return hasAdditions && hasRemovals;
}

function shouldInstantSwap(previousKeys: string[], nextKeys: string[]): boolean {
  return (
    sameKeySet(previousKeys, nextKeys) ||
    isFullSwap(previousKeys, nextKeys) ||
    isMixedChange(previousKeys, nextKeys)
  );
}

function toPresentList<T>(items: T[], keyFn: (item: T) => string): PresenceItem<T>[] {
  return items.map((item) => ({
    key: keyFn(item),
    item,
    phase: 'present' as const,
  }));
}

function clearPendingTimers(
  exitTimers: Map<string, ReturnType<typeof setTimeout>>,
  highlightTimers: Map<string, ReturnType<typeof setTimeout>>,
): void {
  exitTimers.forEach(clearTimeout);
  exitTimers.clear();
  highlightTimers.forEach(clearTimeout);
  highlightTimers.clear();
}

export function usePresenceList<T>(items: T[], getKey: (item: T) => string): PresenceItem<T>[] {
  const getKeyRef = useRef(getKey);
  getKeyRef.current = getKey;

  const [presence, setPresence] = useState<PresenceItem<T>[]>(() =>
    toPresentList(items, getKeyRef.current),
  );

  const exitTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const highlightTimersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const shouldPromoteEnteringRef = useRef(false);

  useLayoutEffect(() => {
    const keyFn = getKeyRef.current;
    const nextKeys = items.map((item) => keyFn(item));
    const nextKeySet = new Set(nextKeys);

    setPresence((prev) => {
      const activePrevKeys = prev
        .filter((entry) => entry.phase !== 'exiting')
        .map((entry) => entry.key);

      if (shouldInstantSwap(activePrevKeys, nextKeys)) {
        shouldPromoteEnteringRef.current = false;
        clearPendingTimers(exitTimersRef.current, highlightTimersRef.current);
        const next = toPresentList(items, keyFn);

        if (
          sameKeySet(activePrevKeys, nextKeys) &&
          !orderChanged(activePrevKeys, nextKeys) &&
          prev.length === next.length &&
          prev.every((entry, index) => entry.key === next[index]?.key && entry.phase === 'present')
        ) {
          return prev;
        }

        return next;
      }

      const prevByKey = new Map(prev.map((entry) => [entry.key, entry]));
      const result: PresenceItem<T>[] = [];
      let hasNew = false;

      for (const item of items) {
        const key = keyFn(item);
        const existing = prevByKey.get(key);

        if (existing) {
          result.push({
            key,
            item,
            phase: existing.phase === 'exiting' ? 'exiting' : existing.phase,
          });
          continue;
        }

        hasNew = true;
        result.push({ key, item, phase: 'entering' });
      }

      for (const entry of prev) {
        if (nextKeySet.has(entry.key)) {
          continue;
        }

        if (entry.phase !== 'exiting') {
          result.push({ ...entry, phase: 'exiting' });
          continue;
        }

        result.push(entry);
      }

      shouldPromoteEnteringRef.current = hasNew;
      return result;
    });
  }, [items]);

  useLayoutEffect(() => {
    if (!shouldPromoteEnteringRef.current) {
      return;
    }

    shouldPromoteEnteringRef.current = false;

    const frame = requestAnimationFrame(() => {
      setPresence((prev) => {
        if (!prev.some((entry) => entry.phase === 'entering')) {
          return prev;
        }

        return prev.map((entry) =>
          entry.phase === 'entering' ? { ...entry, phase: 'highlighted' } : entry,
        );
      });
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
