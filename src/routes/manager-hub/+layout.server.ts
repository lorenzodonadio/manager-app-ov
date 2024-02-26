import { redirect } from '@sveltejs/kit';
import { DEFAULT_COUNTRY } from '$lib/utils/constants';
import type { EntrepProfile, ManagerSupplies } from '$lib/types/sbTypes';

export const load = async ({ depends, locals: { supabase, getSession } }) => {
	depends('managerhub:root');
	const session = await getSession();
	if (!session) throw redirect(300, '/auth/login');
	// Load manager info
	const { data: manager, error: manErr } = await supabase
		.from('manager')
		.select('*')
		.match({ id: session.user.id })
		.single();

	if (!manager) {
		//TODO notify Openversum and the user if this happens
		// It should not happen since login creates a record in manager table
		await supabase.auth.signOut();
		throw redirect(300, '/auth/login');
	}
	// Load Profile
	const { data: profile, error: profErr } = await supabase
		.from('profiles')
		.select()
		.match({ id: session.user.id })
		.single();
	// Add user Id and email to the empty profile, the user can change other fields but not these ones, at least not yet
	if (profile && !profile.is_complete) {
		profile.id = session.user.id;
		profile.email = session.user.email ?? '';
		profile.country = manager.country_code ?? DEFAULT_COUNTRY;
	}

	const suppliesTransactionQuery = supabase
		.from('supplies_transaction')
		.select('* , inventory_checks ( * )')
		.match({ manager_id: session.user.id })
		.order('transaction_date', { ascending: false })
		.returns<ManagerSupplies[]>();
	// .limit(1, { foreignTable: 'inventory_checks' });
	const [
		{ data: entreps, error: err1 },
		{ data: allProfiles, error: err2 },
		{ data: futureEntrep, error: err4 },
		{ data: supplies, error: err5 },
		{ data: locations, error: err6 },
		{ data: inventoryRequests, error: err7 },
		{ data: entrepreneurLevels, error: err8 }
	] = await Promise.all([
		supabase.from('managed_by').select(),
		supabase.from('profiles').select(),
		supabase.from('future_entrepreneurs').select(),
		suppliesTransactionQuery,
		supabase.from('locations').select(),
		supabase.from('inventory_request').select('*').match({ is_completed: false }),
		supabase.from('entrep_level').select().order('id')
	]);
	const entrepList: EntrepProfile[] = [];

	if (entreps && entreps.length > 0) {
		entreps.forEach((e) => {
			const p = allProfiles?.find((x) => x.id === e.entrep_id);
			if (p) {
				const latestTransaction = supplies?.find((x) => x.entrep_id === e.entrep_id);
				const isTransactionComplete = latestTransaction?.inventory_checks?.is_completed === true;

				entrepList.push({
					...p,
					...e,
					inventory_request: inventoryRequests?.find((x) => x.user_id === e.entrep_id),
					is_managed_by_me: e.manager_id === session.user.id,
					latestTransaction,
					isTransactionComplete
				});
			}
		});
	}
	return {
		manager,
		profile,
		entrepList,
		allProfiles: allProfiles ?? [],
		profileEmailSet: new Set((allProfiles ?? []).map((x) => x.email).filter((x) => !!x)),
		futureEntrep: futureEntrep ?? [],
		supplies: supplies ?? [],
		locations: locations ?? [],
		inventoryRequests: inventoryRequests ?? [],
		entrepreneurLevels
	};
};
