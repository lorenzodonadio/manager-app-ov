<script lang="ts">
	export let level: number;
	export let size: 36 | 40 | 64 = 40;
	import gota from '$lib/assets/LvlGota.png';
	import arroyo from '$lib/assets/LvlArroyo.png';
	import rio from '$lib/assets/LvlRio.png';
	let src = level === 3 ? rio : level === 2 ? arroyo : gota;
</script>

<div style="width: {size}px; height: {size}px" class="rounded-full overflow-hidden shadow-md">
	<img style="zoom: 125%;" class="object-contain" alt="entrep icon" {src} />
</div>
