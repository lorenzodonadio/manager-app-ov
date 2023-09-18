<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let options: string[];
	export let selected: string[] = [];
	export let horizontal = false;
	export let showLabels = true;
	export let labels: string[] | undefined = undefined;

	if (!labels) {
		labels = options;
	}
	const dispatch = createEventDispatcher();
	const handleSelect = (item: string) => {
		if (selected.includes(item)) {
			selected = selected.filter((x) => x != item);
			dispatch('removeItem', item);
		} else {
			dispatch('addItem', item);
			selected = [...selected, item];
		}
	};
</script>

<ul class={horizontal ? 'flex gap-6 justify-around w-full' : 'flex-col'}>
	{#each Object.entries(options) as [i, opt]}
		<li class="my-1 relative flex items-start {horizontal ? 'my-auto' : ''}">
			<div class="flex items-center h-5">
				<input
					on:change={() => handleSelect(opt)}
					on:keydown={(e) => {
						if (e.key === 'Enter') handleSelect(opt);
					}}
					checked={selected.includes(opt)}
					id={opt}
					type="checkbox"
					class=" h-5 w-5 input"
				/>
			</div>
			{#if showLabels}
				<div class="ml-3">
					<label for={opt} class="flex space-x-4 font-normal">
						<span>
							{labels[i]}
						</span>
					</label>
				</div>
			{/if}
		</li>
	{/each}
</ul>
