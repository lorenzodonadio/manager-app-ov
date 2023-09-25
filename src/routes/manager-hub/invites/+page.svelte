<script lang="ts">
	import ArrowLeft from '$lib/components/SVG/ArrowLeft.svelte';
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';
	import TrashSvg from '$lib/components/SVG/TrashSVG.svelte';
	import { errorToast } from '$lib/utils/toasts';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { t } from '$lib/translations/index.js';
	const modalStore = getModalStore();

	export let data;
	const supabase = data.supabase;

	const cancelEntrepInvitation = async (email: string) => {
		const { data: _fe, error } = await supabase
			.from('future_entrepreneurs')
			.delete()
			.match({ email });

		if (error) return errorToast('Error');

		data.futureEntrep = data.futureEntrep.filter((x) => x.email != email);
		invalidate('managerhub:root');
	};

	const cancelInvitation = (email: string) => {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: $t('manager.cancelInviteTitle'),
			// @ts-ignore
			body: $t('manager.cancelInviteMessage', { email }),
			buttonTextCancel: $t('common.no'),
			buttonTextConfirm: $t('common.yes'),
			// TRUE if confirm pressed, FALSE if cancel pressed
			response: async (r: boolean) => {
				if (r) {
					await cancelEntrepInvitation(email);
				}
			}
		};
		modalStore.trigger(modal);
	};
</script>

<div class="flex space-x-4 -mt-2">
	<a class="btn" href="/manager-hub"><ArrowLeft /></a>
	<h6 class="h6 my-auto truncate">
		{$t('manager.pendingInvites')}: {$page.data.futureEntrep.length}
	</h6>
</div>

{#if data.futureEntrep.length > 0}
	<ul class="my-2 divide-y border rounded-md p-2 max-h-96 overflow-y-auto">
		{#each data.futureEntrep as entrep}
			{@const name = `${entrep.first_name ?? ''} ${entrep.last_name ?? ''}`}
			{@const location = data.locations.find((x) => x.id === entrep.location_id)}

			<li class="py-1 flex justify-between">
				<div class="">
					<p>{name} {entrep.email}</p>
					{#if location}
						<p class="p truncate">{location.display_name}</p>
					{/if}
				</div>
				<button
					on:click={() => cancelInvitation(entrep.email)}
					class="text-error-600 dark:text-error-400 hover:text-error-500"
				>
					<TrashSvg />
				</button>
			</li>
		{/each}
	</ul>
{/if}
