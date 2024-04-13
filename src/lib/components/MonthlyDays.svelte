<script lang="ts">
	export let days: number[];
	export let today: number;
</script>

<div class="flex items-center justify-between overflow-x-auto">
	<tbody>
		{#each days as day, index}
			{#if index % 7 === 0}
				<tr> </tr>{/if}
			{#if day == today}
				<td>
					<div class="h-full w-full">
						<div class="flex w-full cursor-pointer items-center justify-center rounded-full">
							<button
								role="link"
								tabindex="0"
								class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-base font-medium text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
								on:click={() => console.log(day)}>{day}</button
							>
						</div>
					</div>
				</td>
			{:else}
				<td class="pt-8">
					<div class="flex w-full cursor-pointer justify-center px-2 py-2">
						<button
							class="text-base font-medium text-gray-500 dark:text-gray-100"
							on:click={() => console.log(day)}>{day}</button
						>
					</div>
				</td>
			{/if}
		{/each}
	</tbody>
</div>
