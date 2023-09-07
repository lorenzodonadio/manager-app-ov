<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/translations';
	import { page } from '$app/stores';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { loginSchema } from '$lib/utils/zfdSchemas';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import { formatZodError } from '$lib/utils/zodSchemas';
	import { delay } from '$lib/utils/general';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form;
	const supabase = data.supabase;
	// URL where we ping to check for internet connections
	let showResetPassword = false;
	let loading = false;
	let email = '';
	let password = '';

	$: if (form?.message) errorToast(form.message);

	const handleResetPassword = async () => {
		loading = true;

		const redirectTo = $page.url.origin + '/auth/password-reset';
		// console.log(redirectTo);
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
		alert($t('auth.alertReset'));
		showResetPassword = false;
		loading = false;
	};

	const handleLogin: SubmitFunction = ({ cancel, formData }) => {
		loading = true;

		const res = loginSchema.safeParse(formData);
		if (!res.success) {
			loading = false;
			cancel();
			return errorToast($t('auth.alertLoginError'));
		}
		return async ({ update, result }) => {
			await update();
			if (result.status != 300) {
				errorToast($t('auth.alertLoginError'));
			} else {
				successToast($t('common.success'));
			}
			loading = false;
		};
	};
</script>

<div class="h-full flex justify-center items-center">
	<div class="space-y-2 max-w-md w-full px-1">
		<div class="flex justify-around">
			<OvLogo />
			<h2 class="h2">{showResetPassword ? $t('auth.titleReset') : $t('auth.title')}</h2>
		</div>

		<div class="card p-3 sm:p-6 variant-ringed">
			<div class="space-y-4">
				{#if showResetPassword}
					<div class="">
						<label class="label" for="email">
							<span>{$t('auth.email')}</span>
						</label>
						<input
							bind:value={email}
							id="email"
							class="input"
							type="email"
							placeholder={$t('auth.emailPlace')}
						/>
					</div>
					<p>{$t('auth.resetMsg')}</p>

					<div class="flex justify-between">
						<button
							disabled={loading}
							on:click={handleResetPassword}
							class="btn min-w-[100px] capitalize variant-filled-primary"
						>
							{#if loading}
								<ProgressRadial width="w-6" />
							{:else}
								{$t('auth.reset')}
							{/if}
						</button>
						<button
							on:click={() => (showResetPassword = false)}
							type="submit"
							class="btn min-w-[100px] capitalize variant-filled-surface"
							>{$t('common.cancel')}</button
						>
					</div>
				{:else}
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<!-- on:keydown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								handleLogin();
							}
						}} -->
					<form method="POST" action="?/login" use:enhance={handleLogin}>
						<div class="">
							<label class="label" for="email">
								<span>{$t('auth.email')}</span>
							</label>
							<input
								bind:value={email}
								id="email"
								name="email"
								required={true}
								class="input"
								type="email"
								placeholder={$t('auth.emailPlace')}
							/>
						</div>

						<div class="">
							<label class="label" for="password">
								<span>{$t('auth.pwd')}</span>
							</label>
							<input
								bind:value={password}
								class="input"
								name="password"
								required={true}
								type="password"
								placeholder={$t('auth.pwd')}
							/>
						</div>

						<!-- {#if showSingUp}
							<InputPasswordStrenght
								label={$t('auth.pwdConfirm')}
								placeholder={$t('auth.pwdConfirm')}
								bind:value={confirmPassword}
							/>
						{/if} -->

						<div class="flex justify-between pt-4">
							<a href="/auth/signup" class="btn min-w-[100px] variant-ringed-secondary">
								{$t('auth.signup')}
							</a>
							<!-- on:click={handleLogin} -->
							<button
								disabled={loading}
								type="submit"
								class="btn min-w-[100px] variant-filled-primary"
							>
								{#if loading}
									<ProgressRadial width="w-6" />
								{:else}
									{$t('auth.login')}
								{/if}
							</button>
						</div>
					</form>

					<button
						on:click={() => (showResetPassword = true)}
						class="my-2 underline dark:hover:text-primary-400 dark:text-primary-500 text-sm"
					>
						{$t('auth.forgot')}
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
