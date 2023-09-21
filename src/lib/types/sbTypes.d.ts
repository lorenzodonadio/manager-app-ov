import type { Database } from './SupabaseDefinition';

export type Locations = Database['public']['Tables']['locations'];
export type FutureEntrep = Database['public']['Tables']['future_entrepreneurs'];
export type Profiles = Database['public']['Tables']['profiles'];
export type Manager = Database['public']['Tables']['manager'];
export type FilterSales = Database['public']['Tables']['filter_sales'];
export type ManagedBy = Database['public']['Tables']['managed_by'];
export type InventoryRequest = Database['public']['Tables']['inventory_request'];
export type InventoryCheck = Database['public']['Tables']['inventory_checks'];
export type SupplyTransaction = Database['public']['Tables']['supplies_transaction'];

export type ManagerSupplies = SupplyTransaction['Row'] & {
	inventory_checks?: InventoryCheck['Row'] | null | undefined;
};

export type EntrepProfile = Profiles['Row'] & {
	location_id: string | null;
	manager_id: string;
	created_at: string | null;
	inventory_request: InventoryRequest['Row'] | undefined | null;
	is_managed_by_me: boolean;
	latestTransaction: ManagerSupplies | undefined;
	isTransactionComplete: boolean;
};
