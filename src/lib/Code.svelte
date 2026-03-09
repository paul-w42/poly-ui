<svelte:options
  customElement={{
    tag: 'ui-code-highlight'
  }}
/>
<script lang="ts">
  interface CodeProps {
    language?: string;
    theme?: 'default' | 'coy' | 'dark' | 'okaidia' | 'solarized' | 'tomorrow' | 'twilight';
    css?: string;
  }

  let {
    language = 'typescript',
    theme = 'default',
    css = ''
  }: CodeProps = $props();

  let prismInstance = $state<any>(null);
  let source = $state('');
  let highlighted = $state('');
  let themeCss = $state('');


  const SERVER_LANGUAGES = new Set([
    'go', 'http', 'aspnet', 'java', 'ruby', 'rb', 'kotlin', 'kt', 'kts',
    'go-module', 'go-mod', 'csharp', 'cs', 'dotnet', 'vbnet', 'php',
    'phpdoc', 'php-extras', 'javadoc', 'javadoclike'
  ]);

  const EARLY_LANGUAGES = new Set([
    'ada', 'haskell', 'hs', 'plsql', 'powershell', 'smalltalk', 'cobol',
    'lua', 'lisp', 'emacs', 'elisp', 'emacs-lisp', 'matlab', 'tcl',
    'fortran', 'pascal', 'objectpascal', 'verilog', 'perl'
  ]);

  const SUPPORT_LANGUAGES = new Set([
    'docker', 'dockerfile', 'nginx', 'ocaml', 'xml-doc', 'yaml', 
    'yml', 'xquery', 'markdown', 'md', 'markup-templating', 'systemd',
    'sql', 'json5', 'json', 'webmanifest', 'sass', 'scss', 'graphql',
    'markup', 'html', 'xml', 'svg', 'mathml', 'ssml', 'atom', 'rss', 'css'
  ]);

  const MISC_LANGUAGES = new Set([
    'wasm', 'python', 'py', 'basic', 'eiffel', 'elixir', 'elm', 'erlang',
    'fsharp', 'visual-basic', 'vb', 'vba', 'typescript', 'ts', 'git',
    'javascript', 'js', 'clike'
  ]);

  const COMP_LANGUAGES = new Set([
    'r', 'rust', 'clojure', 'mongodb', 'c', 'cpp', 'd', 'zig'
  ]);
  
  const TSX_LANGUAGES = new Set([
    'jsx', 'tsx'
  ])

  const jsModules = import.meta.glob('./libs/*.js');
  const cssThemes = import.meta.glob('./libs/*.css', {
    query: '?raw',
    import: 'default'
  });

  function getLightDomText(host: HTMLElement) {
    return Array.from(host.childNodes)
      .map((node) => node.textContent ?? '')
      .join('');
  }

  function getLibName(language: string) {
    if (SERVER_LANGUAGES.has(language)) return 'prism-web.js';
    if (EARLY_LANGUAGES.has(language)) return 'prism-early.js';
    if (SUPPORT_LANGUAGES.has(language)) return 'prism-support.js';
    if (MISC_LANGUAGES.has(language)) return 'prism-misc.js';
    if (COMP_LANGUAGES.has(language)) return 'prism-comp.js';
    if (TSX_LANGUAGES.has(language)) return 'prism-tsx.js';       // react jsx or tsx
    return 'prism-misc.js'; // Fallback to misc which contains JS/TS/Clike
  }
  $effect(() => {
    const host = $host();

    const update = () => {
      source = getLightDomText(host);
    };

    queueMicrotask(update);

    const observer = new MutationObserver(() => update());

    observer.observe(host, {
      childList: true,
      characterData: true,
      subtree: true
    });

    return () => observer.disconnect();
  });

  $effect(() => {
    const libName = getLibName(language);
    const jsKey = `./libs/${libName}`;
    const cssKey = `./libs/prism-${theme}.css`;

    const loadJs = jsModules[jsKey];
    const loadThemeCss = cssThemes[cssKey];

    if (!loadJs) {
      console.error(`Missing Prism JS file: ${jsKey}`);
      return;
    }

    if (!loadThemeCss) {
      console.error(`Missing Prism CSS file: ${cssKey}`);
      return;
    }

    loadThemeCss()  
      .then((cssText) => {
        themeCss = cssText as string;
      })
      .catch((err) => {
        console.error('Failed to load Prism CSS:', err);
      });

    loadJs()
      .then((module: any) => {
        prismInstance = (window as any).Prism || module.default || module;
      })
      .catch((err) => {
        console.error('Failed to load Prism bundle:', err);
      });
  });

  $effect(() => {
    if (!prismInstance) return;

    const grammar =
      prismInstance.languages[language] ??
      prismInstance.languages.typescript ??
      prismInstance.languages.plain;

    highlighted = prismInstance.highlight(source, grammar, language);
  });
</script>

{#if themeCss}
  {@html `<style>${themeCss}</style>`}
{/if}

<pre class={"language-" + language}><code class={"language-" + language} style={css}>{@html highlighted}</code></pre>