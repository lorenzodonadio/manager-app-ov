<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	const dispatch = createEventDispatcher();
	export let shadow = true;
	export let center = true;
	export let fullWidth = false;
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div
	transition:fade={{ duration: 100 }}
	class="fixed z-40 inset-0 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div class="flex items-end justify-center min-h-screen p-1 sm:pt-4 sm:px-4 text-center sm:block">
		<div
			on:click={() => dispatch('closeModal')}
			class="fixed inset-0 bg-gray-400 bg-opacity-90"
			aria-hidden="true"
		/>
		{#if center}
			<!-- This element is to trick the browser into centering the modal contents. -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span
			>
		{/if}

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click|stopPropagation
			class:w-full={fullWidth}
			class:shadow-xl={shadow}
			class="z-50 my-auto relative inline-block rounded-lg text-left overflow-hidden transform transition-all align-middle max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
		>
			<slot />
		</div>
	</div>
</div>
