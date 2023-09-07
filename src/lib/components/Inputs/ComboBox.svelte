<script lang="ts">
	import ComboBoxSvg from '$lib/components/SVG/ComboBoxSVG.svelte';
	import SolidCheckSvg from '$lib/components/SVG/CheckSVG.svelte';
	import { clickOutside } from '$lib/utils/clickOutside';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	// Props
	export let input: string[];
	export let inputValue: string;
	export let placeholder = '';
	export let label = '';
	export let showEmptyItem = true;
	export let maxDropdownH = 'max-h-60';
	export let clientWidth: any | undefined = undefined;

	let value = inputValue;
	let isFilterApplied = false;
	// show combobox needs to be an object with a key of input value so that the closing works properly
	let showCombox = {};
	showCombox[inputValue] = false;
	$: if (showCombox) {
		if (showCombox[inputValue]) {
			dispatch('showCombox');
		} else {
			dispatch('hideCombox');
		}
	}
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
		showCombox[inputValue] = false;
		dispatch('selectedItem', item);
	};
</script>

<div
	bind:clientWidth
	use:clickOutside={() => (showCombox[inputValue] = false)}
	class="absolute flex"
	style="width: {clientWidth}px;"
>
	{#if label != ''}
		<label for="combobox" class="block text-base font-medium text-gray-700 mb-0.5">{label}</label>
	{/if}
	<div class="relative w-full">
		<input
			autocomplete="false"
			name="hidden"
			bind:value
			{placeholder}
			id="combobox"
			type="text"
			class="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-3 pr-12 shadow-sm focus:border-darkblue-500 focus:outline-none focus:ring-1 focus:ring-darkblue-500"
			role="combobox"
			aria-controls="options"
			aria-expanded="false"
			on:input={() => {
				showCombox[inputValue] = true;
				isFilterApplied = true;
			}}
			on:click
		/>
		<button
			on:click={() => {
				showCombox[inputValue] = !showCombox[inputValue];
				isFilterApplied = false;
			}}
			type="button"
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
		>
			<!-- Heroicon name: solid/selector -->
			<ComboBoxSvg />
		</button>
		{#if showCombox[inputValue]}
			<ul
				bind:this={UlElement}
				class="absolute z-10 mt-1 {maxDropdownH} overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				id="options"
				role="listbox"
				style="width: {clientWidth}px;"
			>
				{#if filter.length > 0}
					{#each filter as item}
						{#if item === value}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<li
								bind:this={selectedLi}
								on:click={() => handleLiClick(item)}
								class=" group font-semibold first-letter:hover:text-black-600 hover:bg-darkblue-600 hover:text-white relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
							>
								<span class="block truncate">{item}</span>
								<span
									class="absolute inset-y-0 right-0 flex items-center pr-4 text-darkblue-600 group-hover:text-white"
								>
									<SolidCheckSvg />
								</span>
							</li>
						{:else}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<li
								on:click={() => handleLiClick(item)}
								class="first-letter:hover:text-black-600 hover:bg-darkblue-600 hover:text-white relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
							>
								<span class="block truncate">{item}</span>
							</li>
						{/if}
					{/each}
					{#if showEmptyItem}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							on:click={() => {
								showCombox[inputValue] = false;
								dispatch('clickEmptyItem', value);
							}}
							class="border-t first-letter:hover:text-black-600 hover:bg-darkblue-600 hover:text-white relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
						>
							<slot name="emptyItem" />
						</li>
					{/if}
				{:else if showEmptyItem}
					{#if $$slots.emptyItem}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							on:click={() => {
								showCombox[inputValue] = false;
								dispatch('clickEmptyItem', value);
							}}
							class="border-t first-letter:hover:text-black-600 hover:bg-darkblue-600 hover:text-white relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
						>
							<slot name="emptyItem" />
						</li>
					{/if}
				{/if}
			</ul>
		{/if}
	</div>
</div>
