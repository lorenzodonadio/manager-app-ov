import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';
import { errorToast } from '$lib/utils/general';
import type { SupplyTransaction, ScheduledInventoryCheck } from '$lib/stores/salesAndSupplies';

// This file is for the Manager to all transactions and inventory of all the entrepreneurs he or she manages
import type { Database } from '$lib/types/SupabaseDefinition';
export type InventoryCheck = Database['public']['Tables']['inventory_checks'];
export type ManagerSuppliesT = SupplyTransaction['Row'] & {
	inventory_checks: InventoryCheck['Row'][] | null;
};

export const managerSupplies = writable<ManagerSuppliesT[]>([]);
export const managerInventoryChecks = writable<ScheduledInventoryCheck['Row'][]>([]);

// TODO: loadAllTransactions - Loads all the transactions of the manager
export const loadAllTransactions = async (managerId: string) => {
	const { data, error } = await supabase
		.from('supplies_transaction')
		.select('* , inventory_checks ( * )')
		.match({ manager_id: managerId })
		.order('transaction_date', { ascending: false })
		.limit(1, { foreignTable: 'inventory_checks' });

	if (data) {
		managerSupplies.set(data);
	} else if (error) {
		errorToast(`Error - ${error.message}`);
	}
};

// ADD supplies
export const addSupplyTransaction = async (newTransaction: SupplyTransaction['Insert']) => {
	const { data, error } = await supabase
		.from('supplies_transaction')
		.insert(newTransaction)
		.select();

	if (error) return errorToast(`Error -  ${error.message}`);
	if (data && data.length > 0) {
		managerSupplies.update((curr) => [data[0], ...curr]);
		return data[0];
	}
};

// TODO: loadAllInventoryChecks - Loads all the scheduled checks of the manager
export const loadAllInventoryChecks = async (managerId: string) => {
	const { data, error } = await supabase
		.from('inventory_checks')
		.select()
		.match({ manager_id: managerId })
		.order('scheduled_date', { ascending: false });

	if (data) {
		managerInventoryChecks.set(data);
	} else if (error) {
		errorToast(`Error - ${error.message}`);
	}
};

// TODO: scheduleCheck
export const insertInventoryCheck = async (newCheck: ScheduledInventoryCheck['Insert']) => {
	const { data, error } = await supabase.from('inventory_checks').insert(newCheck).select();

	if (error) return errorToast(`Error - ${error.message}`);
	if (data && data.length > 0) {
		managerInventoryChecks.update((curr) => [data[0], ...curr]);
	}
};

// TODO: performInventoryCheck
export interface InventCheck {
	checkId: string;
	notes: string | null;
	is_completed: boolean;
	extension_granted: boolean | null;
	second_check_date: string | null;
}

export const updateInventoryCheck = async (newCheck: InventCheck) => {
	const { data, error } = await supabase
		.from('inventory_checks')
		.update({
			is_completed: newCheck.is_completed,
			notes: newCheck.notes,
			extension_granted: newCheck.extension_granted,
			second_check_date: newCheck.second_check_date
		})
		.match({ id: newCheck.checkId, is_completed: false })
		.select();

	if (error) return errorToast(`Error - ${error.message}`);

	if (data && data.length > 0) {
		managerInventoryChecks.update((curr) => curr.filter((x) => x.id != data[0].id));
		managerInventoryChecks.update((curr) => [data[0], ...curr]);
	}
};
