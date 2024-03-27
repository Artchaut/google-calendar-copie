<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

{#if session}
	<h1 class="primary-content mb-3 size-5 w-full content-center font-bold">
		Modifier votre Profil:
	</h1>
	<div class="form-widget mb-7">
		<form
			class="form"
			method="post"
			action="?/update"
			use:enhance={handleSubmit}
			bind:this={profileForm}
		>
			<div>
				<label for="email">Email</label>
				<input
					class="input input-bordered mb-8 w-full max-w-xs"
					id="email"
					type="text"
					value={session.user.email}
					disabled
				/>
			</div>

			<div>
				<label for="fullName">Full Name</label>
				<input
					class="input input-bordered mb-8 w-full max-w-xs"
					id="fullName"
					name="fullName"
					type="text"
					value={form?.fullName ?? fullName}
				/>
			</div>

			<div>
				<label for="username">Username</label>
				<input
					class="input input-bordered mb-8 w-full max-w-xs"
					id="username"
					name="username"
					type="text"
					value={form?.username ?? username}
				/>
			</div>

			<div>
				<input
					type="submit"
					class="btn btn-primary"
					value={loading ? 'Loading...' : 'Update'}
					disabled={loading}
				/>
			</div>
		</form>

		<form method="post" action="?/signout" use:enhance={handleSignOut} class="mb-10">
			<div>
				<button class="btn btn-primary" disabled={loading}>Sign Out</button>
			</div>
		</form>
	</div>
{:else}
	<h1>Vous n'êtes pas connecté</h1>
	<a href="/login" class="btn btn-primary">Se Connecter</a>
{/if}
