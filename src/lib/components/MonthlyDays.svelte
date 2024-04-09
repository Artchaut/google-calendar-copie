<script lang="ts">
	import { fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';

	export let days: number[];
</script>

<div transition:fade|slide={{ duration: 500 }}>
	{#each days as day, index}
		{#if index % 7 === 0}
			<tr> </tr>{/if}
		<td>{day}</td>
	{/each}
</div>
