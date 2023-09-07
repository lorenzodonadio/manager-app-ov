<script lang="ts">
	import { t } from '$lib/translations';
	import { AppBar, AppShell, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
	import CloseSvg from '$lib/components/SVG/CloseSVG.svelte';
	import MenuSvg from '$lib/components/SVG/MenuSVG.svelte';
	import SideNavbar from '$lib/components/SideNavbar.svelte';
	import ProfileModal from '$lib/components/Modals/ProfileModal.svelte';
	import { invalidateAll } from '$app/navigation';
	import { onMount, setContext } from 'svelte';
	import { getPosition } from '$lib/stores/positionStore';
	import { writable } from 'svelte/store';

	export let data: LayoutData;

	// export const pageTitle = writable(get(t)('common.managerHub'));
	const pageTitle = writable<string>($t('common.managerHub'));
	setContext('pageTitle', pageTitle);

	let showNavbar = false;
	let showProfileModal = !data.profile || !data.profile.is_complete;

	onMount(() => {
		getPosition();
	});
</script>

{#if showProfileModal}
	<ProfileModal
		profile={data.profile}
		supabase={data.supabase}
		id={data.session?.user.id ?? ''}
		email={data.session?.user.email ?? ''}
		on:complete={(e) => {
			showProfileModal = false;
			invalidateAll();
		}}
	/>
{/if}

{#if showNavbar}
	<SideNavbar supabase={data.supabase} on:closeNavbar={() => (showNavbar = false)} />
{/if}
<AppShell>
	<svelte:fragment slot="header">
		<div class="flex justify-center">
			<div class="max-w-7-xl w-full">
				<AppBar background="bg-transparent" slotDefault="flex justify-center">
					<svelte:fragment slot="lead">
						<a href="/manager-hub">
							<OvLogo height={32} width={32} />
						</a>
					</svelte:fragment>
					<!-- <h3 class="capitalize truncate">{$t('common.managerHub')}</h3> -->
					<h3 class="capitalize truncate">{$pageTitle}</h3>
					<svelte:fragment slot="trail">
						<button on:click={() => (showNavbar = !showNavbar)} class="my-auto text-darkblue-700">
							{#if showNavbar}
								<CloseSvg />
							{:else}
								<MenuSvg />
							{/if}
						</button></svelte:fragment
					>
				</AppBar>
			</div>
		</div>
		<!-- <div class="justify-center flex">HEADER</div> -->
	</svelte:fragment>
	<div class="flex justify-center">
		<div class="max-w-7-xl px-1 sm:px-4 w-full">
			<slot />
		</div>
	</div>
	<!-- Only a footer on home page for now -->
	<!-- <svelte:fragment slot="footer">
		
	</svelte:fragment> -->
</AppShell>
