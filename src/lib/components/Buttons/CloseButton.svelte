<script lang="ts">
	export let size = 8;
</script>

<button
	on:click
	type="button"
	class="p-0.5 rounded-full text-gray-800 dark:text-gray-200 transition-all ease-in-out duration-250 hover:rotate-90"
>
	<span class="sr-only">Close</span>
	<svg
		class="h-{size} w-{size}"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
</button>
