// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from '$lib/types/SupabaseDefinition';
import type {
	FutureEntrep,
	InventoryRequest,
	Locations,
	Manager,
	ManagerSupplies,
	Profiles
} from '$lib/types/sbTypes';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			supabase: SupabaseClient<Database>;
			session: Session | null;
			// Availible for /manager-hub onwards
			manager: Manager['Row'][];
			profile: Profiles['Row'][];
			entrepList: EntrepProfile[];
			allProfiles: Profiles['Row'][];
			profileEmailSet: Set<string | null>;
			futureEntrep: FutureEntrep['Row'][];
			supplies: ManagerSupplies[];
			locations: Locations['Row'][];
			inventoryRequests: InventoryRequest['Row'][];
		}
		// interface Error {}
		// interface Platform {}
	}
}
