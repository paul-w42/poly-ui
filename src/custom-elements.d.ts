import type * as React from 'react';

declare global {
  // Modern React (18 / 19)
  namespace React.JSX {
    interface IntrinsicElements {
      'ui-counter': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'start-count'?: number;
        step?: number;
      };

      'ui-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'click-event'?: string;
        disabled?: boolean;
        icon?: string;
        'icon-position'?: 'left' | 'right' | 'iconOnly';
        label?: string;
        selected?: boolean;
        type?: 'button' | 'submit' | 'reset';
        variant?: 'default' | 'filled' | 'outline' | 'transparent';
      };
    }
  }

  // Fallback for tooling that still reads global JSX
  namespace JSX {
    interface IntrinsicElements {
      'ui-counter': any;
      'ui-button': any;
    }
  }
}

export {};
