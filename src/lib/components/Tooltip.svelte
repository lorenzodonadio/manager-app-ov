<script lang="ts">
	export let tooltipMessage = '';
	export let position: 'top' | 'bottom' = 'bottom';
	let isHovered = false;

	function mouseOver() {
		isHovered = true;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:focus on:mouseover={mouseOver} on:mouseleave={mouseLeave}>
	<slot />
	{#if isHovered}
		<div
			class:bottom-6={position === 'top'}
			class="absolute card variant-filled rounded-lg px-2 py-1 my-1 mx-2 max-w-[200px] z-40"
		>
			<p>
				{tooltipMessage}
			</p>
		</div>
	{/if}
</div>
