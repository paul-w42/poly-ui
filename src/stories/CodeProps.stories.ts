import type { Meta, StoryObj } from '@storybook/web-components';
import check from './assets/check.svg';

// Ensure the custom element is registered
// import '../lib/button.js';

interface CodePropsArgs {
  code: string;
  language?: string;
  css?: string;
}

const meta: Meta<CodePropsArgs> = {
  title: 'poly-ui/CodeProps',
  component: 'ui-code-props',
  argTypes: {
    code: { control: 'text' },
    language: { control: 'text' },
    css: { control: 'text' },
  },
  render: (args) => {
    const el = document.createElement('ui-code-props') as any;

    if (args.code) el.code = args.code;
    if (args.language) el.language = args.language;
    if (args.css) el.css = args.css;

    return el;
  },
};

export default meta;

type Story = StoryObj<CodePropsArgs>;

export const Default: Story = {
  // name: '',
  render: () => `
    <ui-code-props>
    // this is a test comment
    import j from './lib/j.js;

    console.log('j is: ' + j);
    </ui-code-props>
  `,
};


// export const CssRedWithSlot: Story = {
//   name: 'css(red) + slot',
//   render: () => `
//     <ui-button css="border: 2px solid red;">
//       Click Me
//     </ui-button>
//   `,
// };



// export const CustomEventHandler: Story = {
//   name: 'with custom event handler',
//   render: (args) => {
//     let left = true;

//     const container = document.createElement('div');

//     const button = document.createElement('ui-button') as any;
//     button.label = args.label || 'Click with handler';
//     button.setAttribute('click-event', 'custom-button-clicked');

//     // Create the message element once
//     const message = document.createElement('p');
//     message.style.color = 'green';
//     message.textContent = 'Click the button to trigger the event';

//     // Attach a custom event listener
//     container.addEventListener('custom-button-clicked', (e) => {
//       message.textContent = left
//         ? '✅ Custom event received!'
//         : 'Custom event received! ✅';

//       // console.log('Custom event triggered:', e);
//       left = !left;
//     });

//     container.appendChild(button);
//     container.appendChild(message);

//     return container;
//   },
//   args: {
//     label: 'Click with handler',
//   },
// };

