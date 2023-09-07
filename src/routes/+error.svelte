<script lang="ts">
	import { page } from '$app/stores';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
</script>

<!--
  This example requires updating your template:

  ```
  <html class="h-full">
  <body class="h-full">
  ```
-->
<main class="container h-full flex flex-col justify-center items-center space-y-4">
	<div class="flex space-x-4">
		<OvLogo />
		<h1 class="h1 text-error-200-700-token">{$page.status}</h1>
	</div>
	{#if $page.error}
		<h2 class="h2">{$page.error.message}</h2>
	{/if}
	<div class="flex justify-center space-x-8">
		<a href="mailto:info@openversum.com" class="btn variant-ghost-tertiary"
			>Contact support at info@openversum.com</a
		>
		<a href="/manager-hub" class="btn variant-ghost-primary">Go back home</a>
	</div>
</main>
