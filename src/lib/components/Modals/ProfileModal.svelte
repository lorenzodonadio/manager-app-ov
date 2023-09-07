<script lang="ts">
	import BasicPhoneInput from '$lib/components/Inputs/BasicPhoneInput.svelte';
	import GenderRadioGroup from '$lib/components/Inputs/GenderRadioGroup.svelte';
	import IndividualCheckBox from '$lib/components/Inputs/IndividualCheckBox.svelte';
	import InputField from '$lib/components/Inputs/InputField.svelte';
	import InputFieldNumber from '$lib/components/Inputs/InputFieldNumber.svelte';
	import SlotModalTitle from '$lib/components/Modals/SlotModalTitle.svelte';
	import { t } from '$lib/translations';
	import type { Database } from '$lib/types/SupabaseDefinition';
	import type { Profiles } from '$lib/types/sbTypes';
	import { DEFAULT_COUNTRY } from '$lib/utils/constants';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let supabase: SupabaseClient<Database>;
	export let profile: Profiles['Row'] | null | undefined;
	export let id: string;
	export let email: string;

	let loading = false;
	let undestoodPrivacy = false;
	let isValidP: boolean;
	const newProfile: Profiles['Insert'] | Profiles['Row'] = profile ?? {
		id,
		email,
		first_name: '',
		last_name: '',
		country: DEFAULT_COUNTRY,
		profile_picture: '',
		is_complete: true,
		phone: '',
		gender: '',
		age_year: null
	};

	$: disabled =
		!isValidP ||
		newProfile.country === '' ||
		newProfile.first_name === '' ||
		newProfile.last_name === '' ||
		newProfile.gender === '' ||
		!undestoodPrivacy;

	const handleSave = async () => {
		loading = true;
		newProfile.is_complete = true;
		const { data, error } = await supabase.from('profiles').upsert(newProfile).select();
		if (error) return errorToast(`Error ${error.code}`);
		loading = false;
		successToast($t('common.success'));
		dispatch('complete', { data: data[0] });
	};

	// function getKeyByValue(object: Object, value: any) {
	// 	return Object.keys(object).find((key) => object[key] === value);
	// }

	const handleLogOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<!-- {$t('profile.')} -->
<SlotModalTitle includeClose={false} on:closeModal title={$t('profile.modalTitle')}>
	{#if newProfile}
		<div class="grid grid-cols-6 gap-2 max-w-4xl">
			<InputField
				required={true}
				label={$t('profile.firstName') + ' *'}
				placeholder={$t('profile.firstName')}
				bind:value={newProfile.first_name}
			/>
			<InputField
				required={true}
				label={$t('profile.lastName') + ' *'}
				placeholder={$t('profile.lastName')}
				bind:value={newProfile.last_name}
			/>

			<!-- <InputField
				label={$t('profile.phone') + ' *'}
				placeholder={$t('profile.phonePlace')}
				bind:value={newProfile.phone}
			/> -->
			<div class="col-span-6 md:col-span-3">
				<BasicPhoneInput
					required={true}
					label={$t('profile.phone') + ' *'}
					bind:value={newProfile.phone}
					bind:valid={isValidP}
				/>
			</div>

			<InputFieldNumber
				min={18}
				max={100}
				label={$t('profile.age')}
				placeholder={18}
				bind:value={newProfile.age_year}
			/>
			<div class="my-2 col-span-6">
				<GenderRadioGroup bind:value={newProfile.gender} />
			</div>
		</div>

		<div class="w-full border-b py-1" />
		<span class="text-base pt-2">{$t('profile.privacyTitle')}</span>

		<div class="max-h-20 overflow-y-scroll py-1">
			<p class="text-gray-500 text-sm">
				{@html $t('common.privacyDisclaimer')}
			</p>
		</div>

		<div class="flex space-x-2 mt-1">
			<IndividualCheckBox
				required={true}
				label={$t('profile.privacyCheck')}
				bind:checked={undestoodPrivacy}
			/>
		</div>
	{/if}
	<div class="flex justify-between" slot="footer">
		<button disabled={loading} on:click={handleLogOut} class="btn variant-ghost-tertiary">
			<span class="capitalize">
				{$t('common.logout')}
			</span>
		</button>

		<button disabled={disabled ?? loading} class="btn variant-ghost-primary" on:click={handleSave}>
			{#if loading}
				<ProgressRadial width="w-6" />
			{:else}
				{$t('common.saveContinue')}
			{/if}
		</button>
	</div>
</SlotModalTitle>
