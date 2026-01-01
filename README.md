# Svelte library

Everything you need to build a Svelte library, powered by [`sv`](https://npmjs.com/package/sv).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

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


To package the build output after executing **`npm run build`**:

```sh
npm pack
```

This packaged file can be copied to another project and installed there directly using the **`npm install`** command, i.e. **`npm install poly-ui-0.0.1.tgz`**. This will register the **poly-ui** package at verison **0.0.1** as installed in your application.

To publish to npm after packaging the output:

```sh
npm publish --access=public
```


## Storybook

Storybook is currently setup to test native svelte components, so what we see by executing storybook right now is a svelte component, not a custom element.

Storybook can be configured to consume a custom element that has been built, but this does not support live code reloading (that I know of), and is a little slower in development.

Run storybook via:

```sh
npm run storybook
```

This will start the storybook runtime and load a page in your browser that displays the storybook dashboard.  This window will contain a list of components on the left hand side that there are stories for, as well as a story for each component (there can be multiple) that has been included in that comopnents story file.

See the **`./src/stories/Counter.stories.svelte`** file for an example of a stories file. 

This stories file imports the svelte component from **`./src/lib/Counter.svelte`**, sets up a default meta object, and then below that contains four separate lines detailing four different instances of the component we would like to display, each instance using or exercising the component in a slightly different manner.

[Storybook for Svelte tutorial](https://storybook.js.org/tutorials/intro-to-storybook/svelte/en/get-started/)


## Requirements for creating custom elements

- there must have a **-** (dash) in the name, i.e. **my-element**
- 


## Consuming application

To make **`poly-ui`** components available to the largest namespace possible, import the library in an originating file, i.e. an index or main.tsx file.  For instance, you can import it in the top of a main.tsx file as:

```ts
  import 'poly-ui';
  import 'poly-ui/types';
```

