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
    padding: 0.5em 1em;
    color: black;
    border-radius: 5px;
    background-color: rgba(176, 202, 235, 0.979);
    border: 2px solid #b5b7d8b9;
    outline: none;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:hover {
    border: 2px solid #0011f883;
  }
</style>

