import { useEffect, useState } from 'react';
import PokeCard from './PokeCard.js';

function PokeGrid({ data, cardWidth, initialColumns }) {
	const pagination = 50;

	const calculateColumns = () =>
		Math.floor(window.innerWidth / cardWidth) - 1;
	const [columns, setColumns] = useState(initialColumns);

	useEffect(() => {
		const handleResize = () => {
			setColumns(calculateColumns());
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [cardWidth]);

	const pokedexStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gridTemplateRows: `repeat(${Math.floor(pagination / columns)}, 1fr)`,
		gap: `${cardWidth / 20}px`,
	};

	const renderPokeCards = () => {
		const pokeCards = [];
		for (let i = 0; i < pagination; i++) {
			pokeCards.push(<PokeCard key={i} cardWidth={cardWidth} />);
		}
		return pokeCards;
	};

	return (
		<div className="Pokedex" style={pokedexStyle}>
			{renderPokeCards()}
		</div>
	);
}

export default PokeGrid;
