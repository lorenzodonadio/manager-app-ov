<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import HomeSvg from './SVG/HomeSVG.svelte';
	// import ShopSvg from './SVG/ShopSVG.svelte';
	import { fade, fly } from 'svelte/transition';
	import LangSelect from './Buttons/LangSelect.svelte';
	import { t } from '$lib/translations';
	import { LightSwitch, ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { SupabaseClient } from '@supabase/supabase-js';
	export let supabase: SupabaseClient;
	// import { redirect } from '@sveltejs/kit';
	const dispatch = createEventDispatcher();
	let loading = false;
	const signOut = async () => {
		loading = true;
		await supabase.auth.signOut();
		goto('/auth/login');
		loading = false;
	};
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative z-20">
	<div
		transition:fly={{ x: 400, duration: 250 }}
		class="w-full z-20 fixed flex inset-0 top-14 bg-surface-50 dark:bg-surface-900 mx-auto justify-center"
	>
		<div class="flex flex-col justify-between w-full items-center">
			<nav class="space-y-2 w-56 mt-4" aria-label="Sidebar">
				<!-- Current: "bg-gray-200 text-gray-900", Default: "w-56 text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
				<button
					on:click={() => {
						goto('/manager-hub');
						dispatch('closeNavbar');
					}}
					class="w-56 btn variant-ghost-primary flex items-center"
				>
					<HomeSvg />
					<span class="truncate pl-2 text-lg w-full text-center">{$t('common.home')} </span>

					<!-- Current: "bg-gray-50", Default: "bg-gray-200 text-gray-600" -->
					<!-- <span class="bg-gray-50 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"> 5 </span> -->
				</button>

				<div class="border-t border-darkblue-500" />

				<a
					href="/manager-hub/your-profile"
					on:click={() => {
						dispatch('closeNavbar');
					}}
					class="w-56 btn variant-ghost-primary flex items-center"
				>
					<img
						class="h-6 w-6 rounded-full"
						alt="profile"
						src="https://blbosiccwkpntqobciwj.supabase.co/storage/v1/object/public/openversum-images/app/default_avatar_openversum.png"
					/>

					<span class="truncate pl-2 text-lg w-full text-center">{$t('common.yourProfile')}</span>

					<!-- Current: "bg-gray-50", Default: "bg-gray-200 text-gray-600" -->
					<!-- <span class="bg-gray-50 ml-auto inline-block py-0.5 px-3 text-xs rounded-full"> 5 </span> -->
				</a>

				<div class="inline-flex px-3 w-56 justify-start space-x-8 mt-4 border-t py-2">
					<LangSelect />
					<div class=" my-auto">
						<LightSwitch height="h-6" />
					</div>
				</div>
			</nav>
			<div class="justify-center flex mb-8 w-full">
				<!-- <div class=" -z-10 absolute w-full bottom-0 h-40">
					<BottomWaves />
				</div> -->
				<!-- <form method="POST" action="/auth/signout"> -->
				<button disabled={loading} on:click={signOut} class="btn variant-filled" type="submit">
					{#if loading}
						<ProgressRadial width="w-6" />
					{:else}
						<span class="font-semibold capitalize">{$t('common.logout')}</span>
					{/if}
				</button>
				<!-- </form> -->
			</div>
		</div>
	</div>
</div>
