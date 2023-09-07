<script lang="ts">
	import InputFieldEmail from '$lib/components/Inputs/InputFieldEmail.svelte';
	import { t } from '$lib/translations';
	import { createEventDispatcher } from 'svelte';
	import InputField from '$lib/components/Inputs/InputField.svelte';
	import SpinnerSvg from '$lib/components/SVG/SpinnerSVG.svelte';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import { DEFAULT_COUNTRY } from '$lib/utils/constants';
	import type { FutureEntrep } from '$lib/types/sbTypes';
	import { page } from '$app/stores';

	const dispatch = createEventDispatcher<{ cancel: null; invite: FutureEntrep['Row'] }>();
	export let locationId: string;
	export let managerCountryCode: string | null | undefined;
	// export let futureEntrep: FutureEntrep['Row'][];
	// export let profileEmailSet: Set<string | null>;
	// export let supabase: SupabaseClient<Database>;

	const userId = $page.data.session?.user.id;
	let newEntrepEmail = '';
	let isEmailValid: boolean;
	let firstName = '';
	let lastName = '';
	let isLoading = false; // variable for loading state

	const handleAddEntrep = async () => {
		isLoading = true;
		if (!isEmailValid) {
			isLoading = false;
			return errorToast('Email Invalido');
		}
		if ($page.data.futureEntrep.map((x) => x.email).includes(newEntrepEmail)) {
			isLoading = false;
			return errorToast('Ya existe una invitacion con este email');
		}
		if ($page.data.profileEmailSet.has(newEntrepEmail)) {
			isLoading = false;
			return errorToast('Ya existe un usuario con este email');
		}
		if (firstName === '') {
			isLoading = false;
			return errorToast('Nombre es obligatorio');
		}

		const { data, error } = await $page.data.supabase
			.from('future_entrepreneurs')
			.insert({
				email: newEntrepEmail,
				invited_by: userId,
				location_id: locationId,
				first_name: firstName,
				last_name: lastName,
				country_code: managerCountryCode ?? DEFAULT_COUNTRY
			})
			.select();

		if (error) {
			if (error.code === '23505') {
				errorToast('Emprendedor ya fue invitado');
			} else {
				errorToast(error.message);
			}
		}

		if (data && data.length > 0) {
			// dispatch('invite', { newInvite: data[0] });
			successToast(`Invited ${data[0].email}`);
			dispatch('invite', data[0]);
		}

		isLoading = false;
	};

	// console.log(data);
</script>

<div class="space-y-2">
	<h5 class="h5">{$t('manager.inviteEntrep')}</h5>
	<form on:submit|preventDefault={handleAddEntrep} class="grid grid-cols-9 gap-2">
		<InputField placeholder="Nombre" label="Nombre *" bind:value={firstName} />
		<InputField placeholder="Nombre" label="Apellido" bind:value={lastName} />
		<InputFieldEmail
			bind:isValid={isEmailValid}
			bind:value={newEntrepEmail}
			label={$t('manager.newEntrepEmail') + ' *'}
			placeholder="email@example.com"
		/>
		<button type="submit" class="hidden">Submit</button>
		<!-- Hidden submit button to trigger form submit on 'Enter' -->
	</form>
	<div class="flex justify-between">
		<button on:click={() => dispatch('cancel')} class="btn btn-sm variant-ringed capitalize"
			>{$t('common.cancel')}</button
		>
		<!-- disable button when isLoading is true -->
		<button
			on:click={handleAddEntrep}
			class="btn btn-sm variant-filled-secondary capitalize"
			disabled={isLoading}
		>
			{#if isLoading}
				<SpinnerSvg />
			{/if}
			{$t('common.invite')}</button
		>
	</div>
</div>
