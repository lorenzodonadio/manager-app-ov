<script lang="ts">
	import { t } from '$lib/translations';
	import SlotModal from './SlotModal.svelte';
	import QrScanner from 'qr-scanner';
	import { createEventDispatcher, onMount } from 'svelte';
	import { errorToast } from '$lib/utils/general';
	const dispatch = createEventDispatcher();
	let videoElem: HTMLVideoElement;
	let qrScanner: QrScanner;

	onMount(() => {
		qrScanner = new QrScanner(
			videoElem,
			async (result) => {
				qrScanner.stop();
				dispatch('newCode', result.data);
			},
			{
				maxScansPerSecond: 10,
				highlightScanRegion: true
			}
		);

		qrScanner.start().catch(() => {
			errorToast('No camera found');
		});
	});

	const stopAndClose = () => {
		qrScanner?.stop();
		dispatch('close');
	};
</script>

<SlotModal on:closeModal={stopAndClose}>
	<div class="max-w-2xl bg-surface-500 py-2">
		<h4 class="h4">{$t('saleQ.filterQR')}</h4>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video class="border border-darkblue-500 rounded-md" bind:this={videoElem} />
		<div class="flex justify-end mx-2 pt-2">
			<button class="btn variant-filled" on:click={stopAndClose}>{$t('common.cancel')}</button>
		</div>
	</div>
</SlotModal>
