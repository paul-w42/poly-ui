import type { Meta, StoryObj } from '@storybook/web-components';
import check from './assets/check.svg';

// Ensure the custom element is registered
// import '../lib/button.js';

interface ButtonArgs {
  label?: string;
  variant?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  css?: string;
}

const meta: Meta<ButtonArgs> = {
  title: 'poly-ui/Button',
  component: 'ui-button',
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'text' },
    icon: { control: 'text' },
    iconPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'right'],
    },
    css: { control: 'text' },
  },
  render: (args) => {
    const el = document.createElement('ui-button') as any;

    if (args.label) el.label = args.label;
    if (args.variant) el.variant = args.variant;
    if (args.icon) el.icon = args.icon;
    if (args.iconPosition) el.iconPosition = args.iconPosition;
    if (args.css) el.css = args.css;

    return el;
  },
};

export default meta;

type Story = StoryObj<ButtonArgs>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};


export const CssRedWithSlot: Story = {
  name: 'css(red) + slot',
  render: () => `
    <ui-button css="border: 2px solid red;">
      Click Me
    </ui-button>
  `,
};


export const CustomIcon: Story = {
  name: 'custom icon',
  args: {
    label: 'Confirm!',
    icon: check,
    iconPosition: 'right',
  },
};


export const VariantFilled: Story = {
  name: 'variant filled',
  args: {
    label: 'Filled Variant',
    variant: 'filled',
  },
};


