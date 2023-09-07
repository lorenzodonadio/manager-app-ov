<script lang="ts">
	export let percent = 0;
	const radius = 15;
	const circumference = radius * 2 * Math.PI;
</script>

<!-- Circle -->
<div class="inline-flex items-center justify-center overflow-hidden rounded-full relative">
	<!-- Building a Progress Ring: https://css-tricks.com/building-progress-ring-quickly/ -->
	<svg style="transform: rotate(-90deg)" class="w-10 h-10">
		<circle
			class="text-gray-300"
			stroke-width="5"
			stroke="currentColor"
			fill="transparent"
			r={radius}
			cx="20"
			cy="20"
		/>
		<circle
			stroke-width="5"
			stroke-dasharray={circumference}
			stroke-dashoffset={circumference - (percent / 100) * circumference}
			stroke-linecap="round"
			stroke="currentColor"
			fill="transparent"
			r={radius}
			cx="20"
			cy="20"
		/>
	</svg>
	<div class="absolute my-auto flex">
		<slot />
	</div>
</div>
