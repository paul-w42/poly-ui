
<svelte:options
  customElement={{
    tag: 'ui-code-highlight'
  }}
/>


<script lang="ts">
  // @ts-ignore
  import Prism from './libs/prism.js';
  import './libs/prism.css';

  interface CodeProps {
    // code: string;
    language?: string;
    css?: string;
  }

  let { 
    // code, 
    language = 'typescript', /* javascript typescript jsx tsx shell webassembly json xml */
    css = '' 
  }:CodeProps = $props();

  let codeEl: HTMLElement;

  // Re-run Prism whenever code or language changes
  $effect(() => {
    if (codeEl) {
      Prism.highlightElement(codeEl);
    }
  });
</script>

<pre>
  <code
    bind:this={codeEl}
    class={"language-" + language}
    style={css}
  >
    <slot />
  </code>
</pre>
