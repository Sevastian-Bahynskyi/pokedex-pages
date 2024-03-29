export function getPokemonColorFromType(type) {
	const typeColors = {
		fire: '#ff9966', // Pastel orange
		water: '#66b2ff', // Pastel blue
		grass: '#99ff99', // Pastel green
		electric: '#ffff66', // Pastel yellow
		rock: '#cc9966', // Pastel brown
		ground: '#ffcc99', // Pastel tan
		ice: '#ccffff', // Pastel lightblue
		flying: '#99ccff', // Pastel skyblue
		bug: '#ccff99', // Pastel greenyellow
		poison: '#cc99ff', // Pastel purple
		psychic: '#ff99cc', // Pastel pink
		ghost: '#cc99ff', // Pastel lavender
		dark: '#666666', // Pastel gray
		steel: '#cccccc', // Pastel silver
		dragon: '#9966ff', // Pastel indigo
		fairy: '#ffccff', // Pastel lightpink
		normal: '#e0e0e0', // Pastel lightgray
		// Add more types and colors as needed
	};

	return typeColors[type.toLowerCase()] || '#c0c0c0'; // Default to pastel gray if type not found
}
