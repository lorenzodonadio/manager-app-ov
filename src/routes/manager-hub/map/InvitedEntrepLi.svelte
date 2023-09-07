<script lang="ts">
	import type { FutureEntrep } from '$lib/types/sbTypes';

	export let entrep: FutureEntrep['Row'];
</script>

<li class="flex space-x-2">
	<p class="p text-sm max-w-[112px] truncate">{entrep.first_name}</p>
	<p class="p text-sm max-w-[112px] truncate">{entrep.last_name}</p>
	<p class="p text-sm max-w-[248px] truncate">{entrep.email}</p>
</li>
