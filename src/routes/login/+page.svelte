<script lang="ts">
    export let form: PageData
  </script>
    
    <h1 class="text-base-content text-2xl mb-4 ">Connection</h1>
      <form method="post" class="place-items-center flex-col flex w-full">
    {#if form?.error}
      <div class="alert alert-warning max-w-xs mb-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Email ou Mot-de-passe incorrect</span>
      </div>
    {/if}
  
      <input required name="email" value={form?.email ?? ''} type="text" placeholder="Email" class={form?.error ? "input input-bordered input-warning w-full max-w-xs mb-8" : "input input-bordered input-secondary w-full max-w-xs mb-8"} />
      <br>
      <input required name="password" type="password" placeholder="Mot de passe"  class={form?.error ? "input input-bordered input-warning w-full max-w-xs mb-8" : "input input-bordered input-secondary w-full max-w-xs mb-8"} />
      <br>
      <button class="btn btn-primary mb-4" type="submit">Connection</button>
    </form>
  
    <p>Vous n'avez pas de compte ? <a href="/signup" class="link link-success">Cliquez ici pour en créer un</a></p> 
