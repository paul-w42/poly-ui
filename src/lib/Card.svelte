<!-- 
<svelte:options
  customElement={{
    tag: 'ui-card',
    props: {
      clickEvent: { attribute: 'click-event', type: 'String' },
      cssImage: { attribute: 'css-image', type: 'String' },
      imageURL: { attribute: 'image-url', type: 'String'},
      inset: { type: 'Boolean' },
      variant: { reflect: true, type: 'String' },
    }
  }}
/>

<script lang="ts">
  // import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type VariantKey = 'default' | 'filled' | 'outline' | 'transparent';

  interface CardProps {
    children?: Snippet;
    css?: string;
    cssImage?: string;
    clickEvent?: string;
    imageURL?: string;
    inset?: boolean;
    variant?: string;
    // clickHandler?: (e:Event) => void;
  }

  let {
    children,
    clickEvent,
    css,
    cssImage,
    imageURL,
    inset = false,
    variant = 'default',
    ...restProps
  }: CardProps = $props();

  // console.log('label: ' + label);

  function handleClick(event: Event) {
    if (clickEvent) {
      $host().dispatchEvent(
        new CustomEvent(clickEvent, {
          bubbles: true
        })
      );
    }

    // if (clickHandler) clickHandler(event);
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  }

  let buttonClasses = $derived.by(() => {
    let classes = ['ui-button', `variant-${variant}`];

    if (selected) {
      classes.push('selected');
    }


    if (iconPosition === 'iconOnly') {
      classes.push('icon-only');
    }

    if (css) classes.push(css);

    // console.log('classes: ' + classes);
    // console.log('css: ' + css);
    // console.log();

    return classes.join(' ');
  });

</script>

<button
  type={type}
  onclick={handleClick}
  onkeydown={handleKey}
  disabled={disabled}
  class={buttonClasses}
  style={css}
  {...restProps}
>
  {#if icon && iconPosition === 'left'}
    <img src={icon} alt="" class="icon icon-left" style={cssImage} />
  {/if}

  {#if icon && iconPosition === 'iconOnly'}
    <img src={icon} alt="" class="icon" style={cssImage} />
  {/if}

  <slot>{label}</slot>

  {#if icon && iconPosition === 'right'}
    <img src={icon} alt="" class="icon icon-right" style={cssImage} />
  {/if}
</button>

<style>
  .ui-button {
    font-family: Arial, sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s;
    padding: 0 1.5rem;
    height: 40px;
  }

  .ui-button:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .variant-default {
    background: #e5e7eb;
    border: 2px solid #d1d5db;
    color: black;
  }

  .variant-default:hover, .variant-default:focus {
    background: #c4c9d1;
    border-color: #475569;
  }

  /* .variant-default:focus {
    background: #94a3b8;
    border-color: #475569;
  } */

  .variant-filled {
    background: #092068;
    color: white;
  }

  .variant-filled:hover {
    background: #0c2c8e;
  }

  .variant-outline {
    background: white;
    border: 2px solid #092068;
    color: #092068;
  }

  .variant-outline:hover {
    background: #d1dbfb;
  }

  .variant-transparent {
    background: transparent;
    border: none;
    color: #092068;
  }

  .variant-transparent:hover {
    background: #d1dbfb;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .icon-left {
    margin-right: 0.75rem;
  }

  .icon-right {
    margin-left: 0.75rem;
  }

  .icon-only {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
</style>
 -->
