<script lang="ts">
	import "../app.pcss";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
  
	export let data
  
	let { supabase, session } = data
	  $: ({ supabase, session } = data)
  
	  onMount(() => {
		  const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			  if (_session?.expires_at !== session?.expires_at) {
				  invalidate('supabase:auth')
			  }
		  })
  
		  return () => data.subscription.unsubscribe()
	  })
  
	const handleSignOut = async () => {
	  await supabase.auth.signOut()
	}
  </script>
  
  <navbar> 
	<header class="navbar bg-accent mb-12">
	  <div class="flex-1">
		<a class="btn btn-ghost normal-case text-x1" href="/">Hades Calendar</a>
	  </div>
	  <div class="flex-none">
		<div class="flex justify-end flex-1 px-2">
		  <div class="flex items-stretch">
			<div class="flex place-items-center">
			  {#if !session}
				<a href="/login" class="link">Connection</a>
			  {:else}
				<p class="inline-block mr-3">Connecté</p>
			  {/if}
			</div>
			<div class="dropdown dropdown-end">
			  <label tabindex="0" class="btn btn-ghost rounded-btn">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
			  </label>
			  <ul tabindex="-1" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
				<li><a class="link" href="/profile">Profile</a></li> 
				<li><button onclick="logout.showModal()" on:click="{handleSignOut}" class="link">Déconnexion</button></li>
			  </ul>
			</div>
		  </div>
		</div>
	  </div>
	</header>
  </navbar>
  
  
  <section class="flex flex-col w-full place-items-center" style="height: 70vh;">
	<slot />
  </section>
  
  <bottom>
	<footer class="footer p-10 bg-neutral text-neutral-content">
	  <div>
		<span class="footer-title">Services</span> 
		<a class="link link-hover" href="/">Branding</a>
		<a class="link link-hover" href="/">Design</a>
		<a class="link link-hover" href="/">Marketing</a>
		<a class="link link-hover" href="/">Advertisement</a>
	  </div> 
	  <div>
		<span class="footer-title" href="/">Company</span> 
		<a class="link link-hover" href="/">About us</a>
		<a class="link link-hover" href="/">Contact</a>
		<a class="link link-hover" href="/">Jobs</a>
		<a class="link link-hover" href="/">Press kit</a>
	  </div> 
	  <div>
		<span class="footer-title" href="/">Legal</span> 
		<a class="link link-hover" href="/">Terms of use</a>
		<a class="link link-hover" href="/">Privacy policy</a>
		<a class="link link-hover" href="/">Cookie policy</a>
	  </div>
	</footer>
  </bottom>
  
  <dialog id="logout" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
	  <h3 class="font-bold text-lg">Vous avez bien été déconnecté</h3>
	  <p class="py-4"><button class="link" href="/login">Se connecter avec un autre compte</button></p>
	  <div class="modal-action">
		<!-- if there is a button in form, it will close the modal -->
		<button class="btn">Fermer</button>
	  </div>
	</form>
  </dialog>
  