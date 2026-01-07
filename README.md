# Poly-UI Custom Elements library

This is a custom elements library that can in theory be used anywhere that supports html and javascript, this applies to web applications created with frameworks other than Svelte as long as they support custom elements.  This includes React 19+, Angular, Vue, and even plain html with javascript.

## Requirements for creating custom elements

Example custom component, note the **`svelte:options`** element at the top that defines the custom element name as well as any name changes for its attributes as well as type definitions.


```ts
  <svelte:options
    customElement={{
      tag: "ui-counter",
      props: {
        // rename startCount to start-count when used in consuming app
        startCount: { attribute: 'start-count', type: 'Number'},
        // set 'step' to a type 'Number' vs default String typing
        step: { attribute: 'step', type: 'Number'}
      }
    }}
  />

  <script lang="ts">
    let {startCount = 0, step = 1} = $props();

    let count: number = $derived(startCount)

    const increment = () => {
      count += step;
    }
  </script>

  <button onclick={increment}>
    count is {count}
  </button>
// ...
```

See the [Svelte Custom Elements documentation](https://svelte.dev/docs/svelte/custom-elements) page for more information.

- use the **`svelte:options`** tag to define the custom element tag name and props. 
  - Custom Elements must have a **-** (dash) in the name, i.e. **my-element**
  - see [Custom Elements](https://svelte.dev/docs/svelte/custom-elements) for more information
  - prop/attribute names must be converted to kebab-case, i.e. "startCount" to "start-count"
  - valid property types in the **`svelte:options`** props object are 'String', 'Number', 'Boolean', 'Array', and 'Object'.
- an import entry must be added to the **`src/index.ts`** file, i.e. for the **Counter** component the entry is: **`import './lib/Counter.svelte';`**, this triggers compilation of the component to a custom web element.
- define the custom element by its registered name in two places inside the **`src/custom-elements.d.ts file`** to define its attribute/prop types used by consuming applications depending on type. Use the registered attribute names to do this, i.e. **`start-count`** inside the **`Counter`** component, and not **`startCount`** which is used inside the Svelte code


## Storybook

Storybook is currently setup to test custom web elements (NOT Svelte components), so what we see by executing storybook right now is the custom element as it appears after the build step, not a svelte component inside a svelte application.

Run storybook via:

```sh
npm run storybook
```

This will start the storybook runtime and load a page in your browser that displays the storybook dashboard.  This window will contain a list of components on the left hand side that there are stories for, as well as a story for each component (there can be multiple) that has been included in that comopnents story file.

See the **`./src/stories/Counter.stories.ts`** file for an example of a stories file. 

This stories file sets up a default meta object, and then below that contains separate blocks detailing different instances of the component we would like to display, each instance using or exercising the component in a slightly different manner.

[Storybook for Custom Web Elements](https://storybook.js.org/docs/get-started/frameworks/web-components-vite)

Note: as the configuration currently stands, when you add a new component to test, you must import that component into the **`./.storybook/preview.ts`** file, as done with the **`Counter`** component.

```ts
  // .storybook/preview.ts import for each component tested
  import '../src/lib/Counter.svelte';
```

## Developing

Executing a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To test that you can build your library:

```sh
npm pack --dry-run
```

Execute w/o the option to build a usable package.

To create a production version of your showcase app (note - update the version number inside **package.json** if installing or elsewhere or publishing):

```sh
npm run build
```

The build script includes a **`cp`** command to copy a types file into the output dist folder, this is to be used by a consuming client as to alleviate any linting or type errors during client development.

To package the build output after executing **`npm run build`**:

```sh
npm pack
```

This packaged file can be copied to another project and installed there directly using the **`npm install`** command, i.e. **`npm install poly-ui-0.0.1.tgz`**. This will register the **poly-ui** package at verison **0.0.1** as installed in your application.

To publish to npm after packaging the output:

```sh
npm publish --access=public
```


## Consuming application

To make **`poly-ui`** components available to the largest namespace possible, import the library in an originating file, i.e. an index or main.tsx file.  For instance, you can import it in the top of a main.tsx file as:

```ts
  import 'poly-ui';
```

In our demo React application we also had to add a **poly-ui.d.ts** file in the **`src/`** directory with the following content:

```ts
  /// <reference types="poly-ui/types" />
```