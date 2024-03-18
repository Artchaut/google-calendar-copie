<script lang="ts">
    export let showModal: Boolean;

    let dialog: HTMLDialogElement;

    $: if (dialog && showModal) dialog.showModal()
</script>

<dialog
    bind:this={dialog}
    on:close={() => (showModal= false)}
    on:click={() => (dialog.close())}
    class="modal"
>
    <div on:click|stopPropagation class="modal-box">
        <button on:click={() => (dialog.close())} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <slot />
    </div>
</dialog>