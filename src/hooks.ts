import * as React from 'react';

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
