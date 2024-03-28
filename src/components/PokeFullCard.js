import React, { useEffect, useState } from 'react';
import './PokeFullCard.css';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { PuffLoader } from 'react-spinners';

function PokeFullCard({ isVisible, pokemonSmallData, onClose }) {
	const [isLoading, setIsLoading] = useState(false);
	const [pokemonAllData, setPokemonAllData] = useState({
		...pokemonSmallData,
	});

	useEffect(() => {
		let ignore = false;
		if (!pokemonSmallData) return ignore;

		setIsLoading(true);

		fetch(pokemonSmallData.url)
			.then((response) => response.json())
			.then((data) => {
				setPokemonAllData((prev) => ({
					...prev,
					types: data.types.map((type) => type.type.name),
					stats: data.stats.map((stat) => {
						return {
							effort: stat.effort,
							name: stat.stat.name,
							value: stat.base_stat,
						};
					}),
				}));
			})
			.catch((error) => {
				console.error('Error fetching Pokémon data:', error);
			});

		setIsLoading(false);

		return () => (ignore = true);
	}, [pokemonSmallData]);

	if (!isVisible || !pokemonSmallData) return null;

	let content;
	if (isLoading) {
		content = <PuffLoader />;
	} else {
		content = (
			<>
				<Button className="close-button" onClick={onClose}>
					<CloseIcon />
				</Button>
				<img
					id="poke-img"
					src={pokemonAllData.front_image}
					alt="Don't cry Kasper 😭"
				/>
				<label className="poke-id">Id: #{pokemonAllData.id}</label>
				<label className="poke-name">Name: {pokemonAllData.name}</label>
			</>
		);
	}

	return (
		<>
			<div className={`modal-overlay`}>
				<div className={`modal poke-full-card`}>{content}</div>
			</div>
		</>
	);
}

export default PokeFullCard;
