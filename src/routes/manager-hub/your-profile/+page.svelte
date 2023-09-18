<script lang="ts">
	import GenderRadioGroup from '$lib/components/Inputs/GenderRadioGroup.svelte';
	import BasicPhoneInput from '$lib/components/Inputs/BasicPhoneInput.svelte';
	import InputField from '$lib/components/Inputs/InputField.svelte';
	import EditSvg from '$lib/components/SVG/EditSVG.svelte';
	import { t } from '$lib/translations';
	import { getGenderOptions } from '$lib/utils/i18utils';
	import type { Profiles } from '$lib/types/sbTypes';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import { DEFAULT_COUNTRY } from '$lib/utils/constants';
	export let data;

	const supabase = data.supabase;
	let disabled = true;
	let newProfile = data.profile ?? {
		age_year: null,
		country: DEFAULT_COUNTRY,
		email: data.session?.user.email,
		first_name: '',
		gender: '',
		id: data.session?.user.email,
		is_complete: true,
		last_name: '',
		phone: '',
		profile_picture: ''
	};
	// console.log($profile);
	// let selectedCountry = countries.getName(newProfile?.country ?? '', $locale);
	const genderLabel = getGenderOptions();

	const upsertProfile = async (newprofile: Profiles['Insert']) => {
		const { data: p, error } = await supabase.from('profiles').upsert(newprofile).select();
		if (p && p.length > 0) {
			data.profile = p[0];
			successToast($t('common.success'));
		}
		if (error) errorToast(`Profile Error - ${error.code}`);
	};
	// $: genderLabel = $locale === 'es' ? ['Hombre', 'Mujer', 'Otro'] : ['Male', 'Female', 'Other'];
</script>

<div class="grid grid-cols-6 gap-2 mt-4 relative">
	{#if newProfile}
		<div class="absolute right-0">
			{#if disabled}
				<button on:click={() => (disabled = false)}>
					<EditSvg />
				</button>
				<!-- View Mode -->
			{:else}
				<!-- Edit Mode -->
				<div class="flex space-x-2">
					<button
						class="btn btn-sm variant-ghost-primary"
						on:click={() => {
							disabled = true;
							upsertProfile(newProfile);
						}}
					>
						{$t('common.saveChanges')}
					</button>
					<button
						class="btn btn-sm variant-ringed"
						on:click={() => {
							disabled = true;
							newProfile = data.profile;
						}}
					>
						{$t('common.cancel')}
					</button>
				</div>
			{/if}
		</div>
		{#if disabled}
			<div class="col-span-6 flex mx-auto pt-1">
				<img
					class="h-24 w-h-24 rounded-full"
					alt="profile"
					src="/assets/default_avatar_openversum.png"
				/>
			</div>
			<div class="flex mx-auto col-span-6 text-sm pb-2">
				<p>{data.session?.user.email}</p>
			</div>
			<div class="col-span-6 md:col-span-3 p-1">
				<p>{$t('profile.firstName')}: <strong> {newProfile.first_name}</strong></p>
			</div>
			<div class="col-span-6 md:col-span-3 p-1">
				<p>{$t('profile.lastName')}: <strong> {newProfile.last_name}</strong></p>
			</div>
			<div class="col-span-6 md:col-span-3 p-1">
				<p>{$t('profile.phone')}: <strong> {newProfile.phone}</strong></p>
			</div>
			<div class="col-span-6 md:col-span-3 p-1">
				<p>{$t('profile.gender')}: <strong> {genderLabel[newProfile.gender] ?? ' - '}</strong></p>
			</div>
		{:else}
			<div class="col-span-6 flex mx-auto pt-1">
				<img
					class="h-24 w-h-24 rounded-full"
					alt="profile"
					src="/assets/default_avatar_openversum.png"
				/>
			</div>

			<div class="flex mx-auto col-span-6 text-sm pb-2">
				<p>{data.session?.user.email}</p>
			</div>
			<InputField
				{disabled}
				label={$t('profile.firstName')}
				placeholder={$t('profile.firstName')}
				bind:value={newProfile.first_name}
			/>

			<InputField
				{disabled}
				label={$t('profile.lastName')}
				placeholder={$t('profile.lastName')}
				bind:value={newProfile.last_name}
			/>

			<div class="col-span-6 md:col-span-3">
				{#if disabled}
					<p class="label mb-1">{$t('profile.phone')}</p>
					<p class="opacity-80">{newProfile.phone}</p>
				{:else}
					<BasicPhoneInput label={$t('profile.phone')} bind:value={newProfile.phone} />
				{/if}
			</div>

			<div class="my-2 col-span-6 md:col-span-3 md:pt-6">
				<GenderRadioGroup bind:value={newProfile.gender} />
			</div>
		{/if}
	{/if}
</div>
