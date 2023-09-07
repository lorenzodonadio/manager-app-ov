<script lang="ts">
	import { goto } from '$app/navigation';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
	import { t } from '$lib/translations';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import InputFieldPasswordWithCheck from '$lib/components/Inputs/InputFieldPasswordWithCheck.svelte';
	import InputFieldPassword from '$lib/components/Inputs/InputFieldPassword.svelte';

	export let data: PageData;
	const supabase = data.supabase;

	let newPassword = '';
	let confirmPassword = '';
	let passwordsMatch: boolean | null = null;
	$: if (confirmPassword && newPassword) {
		passwordsMatch = newPassword === confirmPassword;
	}

	const handleResetPassword = async () => {
		const { data, error } = await supabase.auth.updateUser({ password: newPassword });
		if (error) {
			alert($t('pwReset.passwordUpdateError'));
		} else {
			alert($t('pwReset.passwordUpdateSuccess'));
			goto('/');
		}
	};
</script>

<div class="h-full w-full min-h-screen font-nunito flex">
	<div class="relative w-full max-w-2xl mx-auto">
		<div class="space-y-2">
			<div class="my-4">
				<OvLogo />
			</div>
			<h4 class="h4">{$t('pwReset.header')}</h4>

			<InputFieldPasswordWithCheck
				label={$t('pwReset.newPasswordLabel')}
				bind:value={newPassword}
			/>
			<InputFieldPassword label={$t('pwReset.confirmPasswordLabel')} bind:value={confirmPassword} />
			{#if passwordsMatch === false}
				<span class="text-red-500 text-sm">{$t('pwReset.passwordsNotMatching')}</span>
			{/if}

			<div class="flex justify-between">
				<button
					on:click={handleResetPassword}
					disabled={!passwordsMatch}
					type="submit"
					class:opacity-70={!passwordsMatch}
					class="w-40 btn variant-filled-primary">{$t('pwReset.resetPasswordButton')}</button
				>
				<button class="btn variant-filled" on:click={() => goto('/')}>
					<span class="capitalize font-semibold"> {$t('pwReset.cancelButton')} </span>
				</button>
			</div>
		</div>
	</div>
</div>
