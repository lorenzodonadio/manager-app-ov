<script lang="ts">
	import { clickOutside } from '$lib/utils/clickOutside';
	import { createEventDispatcher } from 'svelte';
	import ComboxSvg from '$lib/components/SVG/ComboxSVG.svelte';
	import SolidCheckSvg from '$lib/components/SVG/SolidCheckSVG.svelte';
	const dispatch = createEventDispatcher();
	// Props
	export let input: string[];
	export let inputValue: string;
	export let placeholder = '';
	export let label = '';
	export let w: number;
	let value = inputValue;
	let isFilterApplied = false;
	let showCombox = false;
	let UlElement: HTMLUListElement | undefined;
	let selectedLi: HTMLLIElement | undefined;
	$: if (UlElement && selectedLi) {
		UlElement.scrollTop = selectedLi.offsetTop;
	}
	$: startswithfilter = input.filter((s) => s.toLowerCase().startsWith(value.toLowerCase()));
	$: includesfilter = input.filter((s) => s.toLowerCase().includes(value.toLowerCase()));
	$: filter = isFilterApplied
		? startswithfilter.length > 0
			? startswithfilter
			: includesfilter
		: input;
	const handleLiClick = (item: string) => {
		value = item;
		showCombox = false;
		dispatch('selectedItem', item);
	};
</script>

<!-- class="absolute flex" -->
<div style="width:{w}px;" class="absolute" use:clickOutside={() => (showCombox = false)}>
	{#if label != ''}
		<label for="combobox" class="block text-sm font-medium text-gray-700">{label}</label>
	{/if}
	<div class="relative mt-1 w-full z-10">
		<input
			bind:value
			{placeholder}
			id="combobox"
			type="text"
			class="w-full text-md rounded-md border border-gray-300 bg-white py-2 px-4 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
			role="combobox"
			aria-controls="options"
			aria-expanded="false"
			on:click={() => (showCombox = true)}
			on:input={() => {
				showCombox = true;
				isFilterApplied = true;
			}}
		/>
		<button
			on:click={() => {
				showCombox = !showCombox;
				isFilterApplied = false;
			}}
			type="button"
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
		>
			<!-- Heroicon name: solid/selector -->
			<ComboxSvg />
		</button>
		{#if showCombox && filter.length > 0}
			<!-- style="width:{w}px;" -->
			<ul
				bind:this={UlElement}
				class="fixed mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				style="width:{w}px;"
			>
				{#each filter as item}
					{#if item === value}
						<li
							bind:this={selectedLi}
							on:click={() => handleLiClick(item)}
							class="relative group font-semibold first-letter:hover:text-black-600 hover:bg-cyan-600 hover:text-white cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
						>
							<span class="block truncate">{item}</span>
							<span
								class="absolute inset-y-0 right-0 flex items-center pr-4 text-cyan-600 group-hover:text-white"
							>
								<SolidCheckSvg />
							</span>
						</li>
					{:else}
						<li
							on:click={() => handleLiClick(item)}
							class="relative first-letter:hover:text-black-600 hover:bg-cyan-600 hover:text-white cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
						>
							<span class="block truncate">{item}</span>
						</li>
					{/if}
				{/each}
			</ul>
		{/if}
	</div>
</div>
