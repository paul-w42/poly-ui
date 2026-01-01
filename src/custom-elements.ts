// src/custom-elements.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-counter': Partial<HTMLButtonElement> & {
        startCount?: number;
        step?: number;
      };
    }
  }
}

export {}
