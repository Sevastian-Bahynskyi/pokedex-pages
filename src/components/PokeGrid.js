import { useEffect, useState } from 'react';
import PokeCard from './PokeCard.js';
import { PuffLoader } from 'react-spinners';
import { getPokemonColorFromType } from '../utils/PokemonHelper.js';
import './PokeCard.css';
import '../styles.css';

function PokeGrid({ pokeUrlList, cardWidth, initialColumns, onPokeCardClick }) {
	const calculateColumns = () =>
		Math.floor(window.innerWidth / cardWidth) - 1;
	const [columns, setColumns] = useState(initialColumns);
	const [pokemonList, setPokemonList] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true

	useEffect(() => {
		let ignore = false;

		const fetchData = async () => {
			try {
				if (!pokeUrlList) return;

				setIsLoading(true);

				const responses = await Promise.all(
					pokeUrlList.map((url) =>
						fetch(url).then((response) => response.json())
					)
				);

				const newPokemonData = responses.map((data) => {
					const type = data.types.map((type) => type.type.name)[0];
					const color = getPokemonColorFromType(type);
					return {
						id: data.id,
						name: data.name,
						front_image: data.sprites.front_default,
						back_image: data.sprites.back_default,
						color: color,
						url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
					};
				});

				console.log(newPokemonData.color);

				setPokemonList(newPokemonData);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching Pokémon data:', error);
			}
		};

		fetchData();

		return () => (ignore = true);
	}, [pokeUrlList]);

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
		gridTemplateRows: `repeat(${Math.ceil(
			pokemonList.length / columns
		)}, 1fr)`,
		gap: `${cardWidth / 20}px`,
	};

	return (
		<div className="Pokedex" style={pokedexStyle}>
			{isLoading ? (
				<div className="loading">
					<PuffLoader color="green" a />
				</div>
			) : (
				pokemonList.map((pokemon) => (
					<PokeCard
						key={pokemon.id}
						cardWidth={cardWidth}
						pokemonData={pokemon}
						color={pokemon.color}
						onClick={onPokeCardClick}
					/>
				))
			)}
		</div>
	);
}

export default PokeGrid;
