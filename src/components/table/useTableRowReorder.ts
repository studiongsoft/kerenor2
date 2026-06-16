import { useLayoutEffect, useRef, type RefObject } from 'react';
import { TABLE_ROW_SORT_MS } from './tableRowAnimations';

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

function collectRowOffsets(
  tbody: HTMLTableSectionElement,
  keys: string[],
): Map<string, number> {
  const offsets = new Map<string, number>();

  for (const key of keys) {
    const row = tbody.querySelector<HTMLTableRowElement>(`tr[data-row-key="${key}"]`);
    if (row) {
      offsets.set(key, row.offsetTop);
    }
  }

  return offsets;
}

function clearRowMotion(row: HTMLTableRowElement): void {
  for (const cell of row.cells) {
    cell.style.transition = '';
    cell.style.transform = '';
  }
}

function setRowOffset(row: HTMLTableRowElement, delta: number): void {
  for (const cell of row.cells) {
    cell.style.transition = 'none';
    cell.style.transform = `translateY(${delta}px)`;
  }
}

function playRowOffset(row: HTMLTableRowElement): void {
  const transition = `transform ${TABLE_ROW_SORT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  for (const cell of row.cells) {
    cell.style.transition = transition;
    cell.style.transform = 'translateY(0)';
  }
}

/** FLIP slide animation when rows reorder with the same keys (e.g. column sort). */
export function useTableRowReorder(
  tbodyRef: RefObject<HTMLTableSectionElement | null>,
  orderedKeys: string[],
): void {
  const prevKeysRef = useRef<string[]>(orderedKeys);
  const prevOffsetsRef = useRef<Map<string, number>>(new Map());
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    const tbody = tbodyRef.current;
    const prevKeys = prevKeysRef.current;

    if (!tbody) {
      return;
    }

    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }

    const isReorder =
      sameKeySet(prevKeys, orderedKeys) && orderChanged(prevKeys, orderedKeys);

    if (!isReorder) {
      prevOffsetsRef.current = collectRowOffsets(tbody, orderedKeys);
      prevKeysRef.current = orderedKeys;
      return;
    }

    const prevOffsets = prevOffsetsRef.current;
    const animatingRows: HTMLTableRowElement[] = [];

    for (const key of orderedKeys) {
      const row = tbody.querySelector<HTMLTableRowElement>(`tr[data-row-key="${key}"]`);
      const prevOffset = prevOffsets.get(key);
      if (!row || prevOffset === undefined) {
        continue;
      }

      const delta = prevOffset - row.offsetTop;
      if (Math.abs(delta) < 0.5) {
        continue;
      }

      animatingRows.push(row);
      setRowOffset(row, delta);
    }

    prevKeysRef.current = orderedKeys;
    prevOffsetsRef.current = collectRowOffsets(tbody, orderedKeys);

    if (animatingRows.length === 0) {
      return;
    }

    tbody.style.overflow = 'visible';

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        for (const row of animatingRows) {
          playRowOffset(row);
        }

        cleanupTimerRef.current = window.setTimeout(() => {
          for (const row of animatingRows) {
            clearRowMotion(row);
          }
          tbody.style.overflow = '';
          cleanupTimerRef.current = null;
        }, TABLE_ROW_SORT_MS);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }
      tbody.style.overflow = '';
      for (const row of animatingRows) {
        clearRowMotion(row);
      }
    };
  }, [orderedKeys, tbodyRef]);
}
