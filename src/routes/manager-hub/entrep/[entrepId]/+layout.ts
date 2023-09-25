import { redirect } from '@sveltejs/kit';
import { filterArrByDate } from '$lib/utils/dateHelpers';
import type { FilterSales } from '$lib/types/sbTypes';

export const load = async ({ depends, params, parent }) => {
	depends(`entrep:${params.entrepId}`);
	const p = await parent();
	const entrepProfile = p.entrepList.find((x) => x.id === params.entrepId);
	// TODO throw an error entrep not found or something, not sure redirect is the best
	if (!entrepProfile) throw redirect(301, '/manager-hub');

	// We load the Filter sales for the entrepreneur
	// We load the supplies transactions again, since in layout.server.ts we only load the ones for the logged in manager
	//  an entrepreneur can have supplies given by various managers (in theory) this is not the encouraged behaviour
	// const suppData = p.supplies.filter((x) => x.entrep_id === params.entrepId);
	const [{ data: _entrepSales, error: salesErr }, { data: _suppData, error: suppErr }] =
		await Promise.all([
			p.supabase
				.from('filter_sales')
				.select('*')
				.order('created_at', { ascending: false })
				.match({ sold_by: params.entrepId }),

			p.supabase
				.from('supplies_transaction')
				.select('* , inventory_checks ( * )')
				.match({ entrep_id: params.entrepId })
				.order('transaction_date', { ascending: false })
				.limit(1, { foreignTable: 'inventory_checks' })
		]);
	// Return empty array instead of null in case of error or something unexpected
	const entrepSales = _entrepSales ?? [];
	const suppData = _suppData ?? [];

	const location = p.locations.find((x) => x.id === entrepProfile.location_id);

	// Same logic as in suppliesStore.ts WARNING! make sure they are the same
	const totFilterSales = entrepSales?.reduce((acc, sale) => acc + sale.number_sold, 0) ?? 0;
	//TODO fix this type error
	const currentSales: FilterSales['Row'][] = filterArrByDate(
		entrepSales,
		entrepProfile.latestTransaction?.transaction_date
	);
	//TODO: implement enum for item-> also type it in the db, filter & cartridge for now
	const s =
		suppData?.filter((x) => x.item === 'FILTER').reduce((acc, s) => acc + s.quantity, 0) ?? 0;

	const currentTotalSales = currentSales.reduce((p, c) => c.number_sold + p, 0);
	return {
		entrepSales,
		currentSales,
		currentTotalSales,
		entrepProfile,
		supplyTransactions: suppData,
		location,
		totFilterSales,
		availibleFilters: s - totFilterSales
	};
};
