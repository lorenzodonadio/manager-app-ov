<script lang="ts">
	// @ts-ignore
	import StarRating from '@ernane/svelte-star-rating';

	export let stars: number = 1;
	export let showScore = false;
	export let size: number = 30;
	export let readOnly = false;

	let config = {
		readOnly: readOnly,
		countStars: 5,
		range: {
			min: 1,
			max: 5,
			step: 1
		},
		score: stars,
		showScore,
		scoreFormat: function () {
			return `(${this.score.toFixed(0)}/${this.countStars})`;
		},
		name: '',
		starConfig: {
			size: size,
			fillColor: '#F9ED4F',
			strokeColor: '#BB8511',
			unfilledColor: '#FFF',
			strokeUnfilledColor: '#000'
		}
	};

	$: if (config.score) {
		stars = config.score;
	}
</script>

<StarRating bind:config />
