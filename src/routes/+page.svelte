<script lang="ts">
	import { goto } from '$app/navigation';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/auth/login');
	});
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<div class="h-full w-full flex justify-center items-center">
	<a href="/auth/login">
		<div class="animate-bounce">
			<OvLogo />
		</div>
	</a>
</div>
