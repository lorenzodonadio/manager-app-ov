<script lang="ts">
	import type { EntrepProfile } from '$lib/types/sbTypes';
	export let entrep: EntrepProfile;
</script>

<li>
	<a class="flex space-x-2" href="/manager-hub/entrep/{entrep.id}">
		<p class="p text-sm max-w-[224px] truncate">{entrep.first_name} {entrep.last_name}</p>
		<p class="p text-sm max-w-[248px] truncate">{entrep.email}</p>
		<p class="p text-sm max-w-[148px] truncate">{entrep.phone}</p>
	</a>
</li>
