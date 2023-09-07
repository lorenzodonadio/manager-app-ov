<script lang="ts">
	export let title = '';
	export let description = '';
	export let options: any[] = [];
	export let labels: string[] | undefined = undefined;
	export let value: string = '';
	export let horizontal = false;
	export let disabled = false;
	if (!labels) {
		labels = options;
	}
</script>

<div class:opacity-80={disabled} class={horizontal ? 'flex space-x-4' : ''}>
	<div class=" my-auto mb-1">
		<p class="text-base">{title}</p>
		<p class="text-sm leading-5">{description}</p>
	</div>
	<fieldset class={horizontal ? 'my-auto' : 'mt-4'}>
		<legend class="sr-only">Notification method</legend>
		<div class={horizontal ? 'flex space-x-2 my-auto' : 'space-y-1'}>
			{#each Object.entries(options) as [i, opt]}
				<div class="flex items-center space-x-2">
					<input
						{disabled}
						on:input={() => (value = opt)}
						on:keydown={(e) => {
							if (e.key === 'Enter') value = opt;
						}}
						id={opt + title}
						name={description}
						type="radio"
						checked={value === opt}
						class="input h-5 w-5 text-primary-500"
					/>
					<label for={opt + title} class="label"
						><span>
							{labels[i]}
						</span>
					</label>
				</div>
			{/each}
		</div>
	</fieldset>
</div>
