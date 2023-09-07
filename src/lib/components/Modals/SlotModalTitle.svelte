<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CloseButton from '../Buttons/CloseButton.svelte';
	import SlotModal from './SlotModal.svelte';
	const dispatch = createEventDispatcher();
	export let title = '';
	export let includeClose = true;
	export let fullWidth = false;
</script>

<SlotModal {fullWidth} on:closeModal>
	<div class="card">
		<div class="border-b py-4 pl-6 flex gap-2">
			<slot name="badge" />
			<h4 class="h4">{title}</h4>
		</div>
		<div class={$$slots.footer ? 'p-6 pb-2' : 'p-6'}>
			{#if includeClose}
				<div class="absolute origin-top-right top-4 right-2">
					<CloseButton size={6} on:click={() => dispatch('closeModal')} />
				</div>
			{/if}

			<slot />
		</div>
		{#if $$slots.footer}
			<div class="border-t p-4">
				<slot name="footer" />
			</div>
		{/if}
	</div>
</SlotModal>
