<script lang="ts">
	export let buttonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let color: 'primary' | 'red' = 'primary';
</script>

<button
	on:click
	type="button"
	class={`${
		buttonSize === 'xs'
			? 'p-1.5   text-xs font-medium'
			: buttonSize === 'sm'
			? 'p-2 text-sm font-medium'
			: buttonSize === 'md'
			? 'p-2.5 text-sm font-medium'
			: buttonSize === 'lg'
			? 'p-3 text-base font-medium'
			: buttonSize === 'xl'
			? 'p-3.5 text-base font-medium'
			: ''
	}

    ${
			color === 'primary'
				? 'bg-darkblue-600 hover:bg-darkblue-700 focus:ring-darkblue-500'
				: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
		}
        inline-flex items-center rounded-full border border-transparent  text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2`}
>
	<slot />
</button>
