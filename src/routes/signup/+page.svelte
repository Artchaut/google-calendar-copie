<script>
    export let form
  </script>
  
    <h1 class="text-base-content text-2xl mb-4 ">Créer un compte</h1>
    <form method="post" class="place-items-center flex-col flex w-full">
      <input name="email" value={form?.email ?? ''} type="text" placeholder="Email" class="input w-full max-w-xs mb-8" />
      <br>
      <input name="password" type="password" placeholder="Mot de passe" class="input w-full max-w-xs mb-8" />
      <br>
      <button class="btn btn-primary mb-4" onclick="signup.showModal()" type="submit">Continuer</button>
    </form>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="signup" class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Un email vous a été envoyé, veuillez cliquer sur le lien pour vous authentifier</p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Fermer</button>
      </div>
    </form>
  </dialog>
  
