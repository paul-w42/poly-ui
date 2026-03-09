import type { Meta, StoryObj } from '@storybook/web-components';

interface CodePropsArgs {
  language?: string;
  theme?: 'default' | 'coy' | 'dark' | 'okaidia' | 'solarized' | 'tomorrow' | 'twilight';
  css?: string;
}

const meta: Meta<CodePropsArgs> = {
  title: 'poly-ui/CodeHighlight',
  component: 'ui-code-highlight',
  argTypes: {
    language: { control: 'text' },
    theme: {
      control: { type: 'select' },
      options: ['default', 'coy', 'dark', 'okaidia', 'solarized', 'tomorrow', 'twilight'],
    },
    css: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<CodePropsArgs>;

export const Default: Story = {
  render: () => `
<ui-code-highlight language="typescript" theme="default">
  // this is a test comment
  import j from './lib/j.js';

  console.log('j is: ' + j);
</ui-code-highlight>
  `,
};
