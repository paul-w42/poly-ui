// import Counter from './lib/Counter.svelte';   // use <ui-counter ... /> in HTML
// export { Counter };     // instantiate via js/ts if needed

// import './lib/Counter.svelte';

// src/index.ts
import Counter from './lib/Counter.svelte';

customElements.define('ui-counter', Counter);

