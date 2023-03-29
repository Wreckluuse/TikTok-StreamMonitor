<script>
	import mainContent from '../grid-config';

	function classBuilder(element) {
		const height = element.height;
		const width = element.width;
		const x = element.x;
		const y = element.y;
		const colStart = 'col-start-' + x;
		const rowStart = 'row-start-' + y;
		const colEnd = 'col-end-' + width;
		const rowEnd = 'row-end-' + height; 
		document.querySelector('div').classList.add(colStart, rowStart, colEnd, rowEnd);
	}

	// function determineSize(element) {
	// 	const height = element.height;
	// 	const width = element.width;
	// 	const x = element.x;
	// 	const y = element.y;
	// 	let colStart = ' col-start-' + x + ' ';
	// 	let rowStart = ' row-start-' + y + ' ';
	// 	let colEnd = ' col-end-' + width + ' ';
	// 	let rowEnd = ' row-end-' + height + ' ';
	// 	return colStart + colEnd + rowStart + rowEnd;
	// }
</script>

<div class="backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg ">
	<slot />
</div>
