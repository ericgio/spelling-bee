import * as React from 'react';

import { isLetter } from './utils';

const noop = () => {};

type ClipboardEventHandler = (e: ClipboardEvent) => void;

export function useOnPaste(onPaste: ClipboardEventHandler) {
  React.useEffect(() => {
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [onPaste]);
}

type KeyboardEventHandler = (e: KeyboardEvent) => void;

export function useOnKeyDown(onKeyDown: KeyboardEventHandler) {
  React.useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
}

export interface UseMultiInputOptions {
  count: number;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onPaste?: (e: ClipboardEvent) => void;
  value: string;
}

export function useMultiInput({
  count,
  onChange,
  onEnter,
  value,
}: UseMultiInputOptions) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }

      if (e.key === 'Enter') {
        onEnter?.();
      }

      // onKeyDown?.(e);
      const char = e.key.toLowerCase();

      if (e.key === 'Backspace') {
        onChange?.(value.slice(0, -1));
        return;
      }

      if (isLetter(char) && value.length < count) {
        onChange?.(value + char);
      }
    },
    [count, onChange, onEnter, value]
  );

  const onPaste = React.useCallback(
    (e: ClipboardEvent) => {
      const pastedStr = e.clipboardData?.getData('Text').toLowerCase();

      if (!pastedStr) {
        return;
      }

      const newLetters = pastedStr
        .split('')
        .filter(isLetter)
        .slice(0, count)
        .join('');

      onChange?.(newLetters);
    },
    [count, onChange]
  );

  useOnKeyDown(onKeyDown);
  useOnPaste(onPaste || noop);

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const inputs = containerRef.current.querySelectorAll('input');

    // Focus the next or previous input when typing or deleting letters.
    if (value.length < count) {
      inputs[value.length].focus();
    }

    // If a value is pasted in, focus the last input.
    if (value.length === count) {
      inputs[value.length - 1].focus();
    }
  }, [count, value.length]);

  return containerRef;
}
