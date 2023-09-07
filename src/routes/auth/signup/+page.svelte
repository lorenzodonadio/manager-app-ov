<script lang="ts">
	import { t } from '$lib/translations';
	import OvLogo from '$lib/components/SVG/OVLogo.svelte';
	import InputPasswordStrenght from '$lib/components/Inputs/InputPasswordStrenght.svelte';
	import { errorToast, successToast } from '$lib/utils/toasts';
	import { enhance } from '$app/forms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data;
	export let form;
	// URL where we ping to check for internet connections
	let loading = false;
	let email = '';
	let password = '';
	let passwordConfirm = '';

	$: if (form?.message) errorToast(form.message);

	const handleSignUp: SubmitFunction = async ({ cancel, formData }) => {
		loading = true;
		formData.append('redirectTo', `${location.origin}/auth/callback`);
		if (formData.get('passwordConfirm') != formData.get('password')) {
			cancel();
			loading = false;
			return errorToast($t('auth.pwdMsg'));
		}

		// check if user in allowed list
		const res = await fetch(`/api/validate-email?email=${email}`, {
			method: 'GET',
			mode: 'same-origin'
		});

		// IF the user email is in the allowed table then go forward,
		if (!res.ok || !(await res.json())?.isEmailManager) {
			cancel();
			loading = false;
			return errorToast($t('auth.needInvitation'));
		}

		return async ({ update, result }) => {
			await update();
			// console.log(result);
			if (result.status === 200) {
				successToast($t('common.success'));
				alert($t('auth.alertSign'));
			} else if (result.status === 400) {
				return errorToast($t('auth.pwdMsg'));
			} else if (result.status === 400) {
				errorToast($t('auth.needInvitation'));
			} else {
				errorToast($t('auth.alertLoginError'));
			}
			loading = false;
		};
	};
</script>

<div class="h-full flex justify-center items-center">
	<div class="space-y-2 max-w-md w-full px-1">
		<div class="flex justify-around">
			<OvLogo />
			<h2 class="h2">{$t('auth.title')}</h2>
		</div>

		<div class="card p-3 sm:p-6 variant-ringed">
			<div class="space-y-4">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<form method="POST" action="?/signup" use:enhance={handleSignUp}>
					<div class="">
						<label class="label" for="email">
							<span>{$t('auth.email')}</span>
						</label>
						<input
							bind:value={email}
							id="email"
							class="input"
							type="email"
							name="email"
							autocomplete="email"
							required
							placeholder={$t('auth.emailPlace')}
						/>
					</div>

					<InputPasswordStrenght
						name="password"
						label={$t('auth.pwd')}
						placeholder={$t('auth.pwd')}
						bind:value={password}
					/>
					<div class="">
						<label class="label" for="password">
							<span>{$t('auth.pwdConfirm')}</span>
						</label>
						<input
							bind:value={passwordConfirm}
							class="input"
							type="password"
							name="passwordConfirm"
							placeholder={$t('auth.pwdConfirm')}
							required
						/>
					</div>

					<div class="flex justify-between pt-1">
						<!-- type="submit" -->
						<a href="/auth/login" class="btn min-w-[100px] capitalize variant-filled-surface">
							{$t('common.cancel')}
						</a>

						<button
							disabled={loading}
							type="submit"
							class="btn min-w-[100px] variant-filled-secondary"
						>
							{#if loading}
								<ProgressRadial width="w-6" />
							{:else}
								{$t('auth.singupConf')}
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
