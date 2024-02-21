<script>
	export let form;
</script>

<h1 class="mb-4 text-2xl text-base-content">Créer un compte</h1>
<form method="post" class="flex w-full flex-col place-items-center">
	<input
		name="email"
		value={form?.email ?? ''}
		type="text"
		placeholder="Email"
		class="input mb-8 w-full max-w-xs"
	/>
	<br />
	<input
		name="password"
		type="password"
		placeholder="Mot de passe"
		class="input mb-8 w-full max-w-xs"
	/>
	<br />
	<button class="btn btn-primary mb-4" onclick="signup.showModal()" type="submit">Continuer</button>
</form>
<!-- Open the modal using ID.showModal() method -->
<dialog id="signup" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h3 class="text-lg font-bold">Hello!</h3>
		<p class="py-4">
			Un email vous a été envoyé, veuillez cliquer sur le lien pour vous authentifier
		</p>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<button class="btn">Fermer</button>
		</div>
	</form>
</dialog>
