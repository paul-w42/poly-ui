// src/svelte-shims.d.ts
declare module '*.svelte' {
	// When compiled with compilerOptions.customElement: true,
	// the default export is a custom element class (constructor), not a Svelte component.
	const element: CustomElementConstructor;
	export default element;
}
