<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let loading = false;
	let resetPasswordForm: HTMLFormElement;

	let email: string;
	let newPassword: string;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<form class="form" action="?/change" method="post" use:enhance={handleSubmit}>
	<div>
		<label for="email">Email</label>
		<input class="input input-bordered mb-8 w-full max-w-xs" id="email" type="text" />
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
