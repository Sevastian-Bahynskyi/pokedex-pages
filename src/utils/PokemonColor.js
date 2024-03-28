export function GetPokemonColor(type) {
	const typeColors = {
		fire: 'rgba(255, 153, 102, 0.8)', // Pastel orange
		water: 'rgba(102, 178, 255, 0.8)', // Pastel blue
		grass: 'rgba(153, 255, 153, 0.8)', // Pastel green
		electric: 'rgba(255, 255, 102, 0.8)', // Pastel yellow
		rock: 'rgba(204, 153, 102, 0.8)', // Pastel brown
		ground: 'rgba(255, 204, 153, 0.8)', // Pastel tan
		ice: 'rgba(204, 255, 255, 0.8)', // Pastel lightblue
		flying: 'rgba(153, 204, 255, 0.8)', // Pastel skyblue
		bug: 'rgba(204, 255, 153, 0.8)', // Pastel greenyellow
		poison: 'rgba(204, 153, 255, 0.8)', // Pastel purple
		psychic: 'rgba(255, 153, 204, 0.8)', // Pastel pink
		ghost: 'rgba(204, 153, 255, 0.8)', // Pastel lavender
		dark: 'rgba(102, 102, 102, 0.8)', // Pastel gray
		steel: 'rgba(204, 204, 204, 0.8)', // Pastel silver
		dragon: 'rgba(153, 102, 255, 0.8)', // Pastel indigo
		fairy: 'rgba(255, 204, 255, 0.8)', // Pastel lightpink
		normal: 'rgba(224, 224, 224, 0.8)', // Pastel lightgray
		// Add more types and colors as needed
	};

	return typeColors[type.toLowerCase()] || 'rgba(192, 192, 192, 0.8)'; // Default to pastel gray if type not found
}
