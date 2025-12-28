<svelte:options
  customElement="ui-counter"
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


<style>
  /* Style is automatically scoped to the component */
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ffffff;
    background-color: rgba(100, 163, 245, 0.979);
    border-radius: 2em;
    border: 2px solid #0011ff;
    outline: none;
  width: 200px; 
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #0011ff;
  }

  button:hover {
    border: 2px solid #5762f7b9;
  }
</style>

