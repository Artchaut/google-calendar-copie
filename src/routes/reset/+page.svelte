<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from '../$types';

	export let form: ActionData;

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<form class="form" action="?/reset" method="post" use:enhance={handleSubmit}>
	<div>
		<label for="email">Email</label>
		<input class="input input-bordered mb-8 w-full max-w-xs" id="email" name="email" type="email" />
	</div>
	<div>
		<div>
			<button type="submit" class="btn btn-primary" disabled={loading}>
				{#if loading}
					<span class="loading loading-infinity loading-lg"></span>
				{:else}
					<span>Changer le mot de passe</span>
				{/if}
			</button>
		</div>
	</div>
</form>
