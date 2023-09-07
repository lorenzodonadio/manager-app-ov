<script lang="ts">
	import { goto } from '$app/navigation';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
	import { t } from '$lib/translations';
	import { onMount } from 'svelte';
	import InputFieldPasswordWithCheck from '$lib/components/Inputs/InputFieldPasswordWithCheck.svelte';
	import InputFieldPassword from '$lib/components/Inputs/InputFieldPassword.svelte';
	import { errorToast, successToast } from '$lib/utils/toasts.js';

	export let data;

	const supabase = data.supabase;
	let loaded = false;
	let newPassword = '';
	let confirmPassword = '';
	let passwordsMatch: boolean | null = null;
	$: if (confirmPassword && newPassword) {
		passwordsMatch = newPassword === confirmPassword;
	}

	const handleResetPassword = async () => {
		const { data, error } = await supabase.auth.updateUser({ password: newPassword });
		if (error) {
			errorToast($t('pwReset.passwordUpdateError'));
		} else {
			loaded = false;
			successToast($t('pwReset.passwordUpdateSuccess'));
			goto('/manager-hub');
		}
	};
	let message = '';
	let success = true;
	onMount(async () => {
		const {
			data: { user },
			error: err
		} = await supabase.auth.getUser();
		if (user?.recovery_sent_at) {
			const recoverySent = new Date(user?.recovery_sent_at);
			const enalapsed = (Date.now() - recoverySent.getTime()) / 1000;
			// console.log(enalapsed);
			// console.log(recoverySent);
			if (enalapsed > 30 * 60) {
				success = false;
				message = 'Expired password reset request - pleaes make a new one';
				errorToast(message);
			}
		} else {
			success = false;
			message = 'You cant change your password - ask for a recovery link';
			errorToast(message);
		}
		loaded = true;
	});
</script>

{#if loaded}
	{#if success}
		<div class="h-full w-full min-h-screen font-nunito flex">
			<div class="relative w-full max-w-2xl mx-auto">
				<div class="space-y-2">
					<a href="/auth/login">
						<div class="my-4">
							<OvLogo />
						</div>
					</a>
					<h4 class="h4">{$t('pwReset.header')}</h4>

					<InputFieldPasswordWithCheck
						label={$t('pwReset.newPasswordLabel')}
						bind:value={newPassword}
					/>
					<InputFieldPassword
						label={$t('pwReset.confirmPasswordLabel')}
						bind:value={confirmPassword}
					/>
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
						<button
							class="btn variant-filled"
							on:click={async () => {
								await supabase.auth.signOut();
								goto('/auth/login');
							}}
						>
							<span class="capitalize font-semibold"> {$t('pwReset.cancelButton')} </span>
						</button>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="h-full w-full flex justify-center items-center">
			<div class="space-y-4">
				<p>{message}</p>
				<a class="btn variant-ghost-primary" href="/auth/login">Home</a>
			</div>
		</div>
	{/if}
{:else}
	<div class="h-full w-full flex justify-center items-center">
		<div class="animate-bounce">
			<OvLogo />
		</div>
	</div>
{/if}
