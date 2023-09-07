<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let checked: boolean = false;
	export let label = '';
	export let required = false;
	export let name: string | null = null;
	const dispatch = createEventDispatcher();
	const handleSelect = () => {
		if (checked) {
			dispatch('removeItem');
		} else {
			dispatch('addItem');
		}
	};
</script>

<div class="flex items-center h-5 space-x-2">
	<input
		on:change={handleSelect}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				if (!checked) dispatch('addItem');
				checked = true;
			}
		}}
		bind:checked
		{required}
		name={name ?? label}
		id="checkbox-individual"
		type="checkbox"
		class="checkbox h-5 w-5"
	/>

	<label for="checkbox-individual" class="text-sm">{label}</label>
</div>
