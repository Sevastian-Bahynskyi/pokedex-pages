import React, { useEffect, useState } from 'react';
import '../styles/PokeFullCard.css';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { PuffLoader } from 'react-spinners';
import { getPokemonColorFromType } from '../utils/PokemonHelper';
import tinycolor from 'tinycolor2';
import PokeStatsChart from './PokeStatsChart';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Modal from './Modal';

function PokeFullCard({ isVisible, pokemonSmallData, onClose }) {
	const [isLoading, setIsLoading] = useState(false);
	const [pokemonAllData, setPokemonAllData] = useState();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [windowWidth]);

	useEffect(() => {
		if (!pokemonSmallData) return;

		setIsLoading(true);

		fetch(pokemonSmallData.url)
			.then((response) => response.json())
			.then((data) => {
				setPokemonAllData((prevState) => {
					return {
						...pokemonSmallData,
						abilities: data.abilities.map((abilities) =>
							abilities.ability.name.replace('-', ' ')
						),
						types: data.types.map((type) => type.type.name),
						stats: data.stats.map((stat) => {
							return {
								effort: stat.effort,
								name: stat.stat.name,
								value: stat.base_stat,
							};
						}),
						weight: data.weight,
						height: data.height,
						cry: data.cries.latest,
					};
				});
			})
			.catch((error) => {
				console.error('Error fetching Pokémon data:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [pokemonSmallData]);

	if (!isVisible || !pokemonAllData) return null;

	const secondaryColor = tinycolor(pokemonAllData.color)
		.darken(50)
		.toHexString();

	let content;
	if (isLoading) {
		content = <PuffLoader />;
	} else {
		const typesSection = pokemonAllData.types.map((type) => (
			<label
				key={type}
				className="pokemon-type"
				style={{
					backgroundColor: tinycolor(getPokemonColorFromType(type))
						.darken(50)
						.toHexString(),
					color: getPokemonColorFromType(type),
					border: `1px solid ${tinycolor(
						getPokemonColorFromType(type)
					)
						.darken(50)
						.toHexString()}`,
				}}
			>
				{type}
			</label>
		));

		const abilitiesSection = pokemonAllData.abilities.map((ab) => (
			<label
				key={ab}
				className="pokemon-type"
				style={{
					color: secondaryColor,
				}}
			>
				{ab.charAt(0).toUpperCase() + ab.slice(1)}
			</label>
		));

		const playAudio = () => {
			const audio = document.getElementById('poke-cry');
			if (audio) {
				audio.play();
			}
		};

		content = (
			<>
				<h1 className="poke-name">{pokemonAllData.name}</h1>
				<div className="top-section">
					<div className="abilities-section">
						<h3>Abilities:</h3>
						<div
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							{abilitiesSection}
						</div>
					</div>
					<img
						id="poke-img"
						src={pokemonAllData.front_image}
						alt="Don't cry Kasper 😭"
					/>
					<div className="types-section">{typesSection}</div>
				</div>

				<div className="bottom-section">
					<div className="poke-details">
						<label className="poke-id">
							<b>ID</b>: #{pokemonAllData.id}
						</label>

						<label className="poke-height">
							<b>Weight</b>: {pokemonAllData.weight} kg
						</label>
						<label className="poke-weight">
							<b>Height</b>: {pokemonAllData.height * 10} sm
						</label>
					</div>
					<PokeStatsChart
						stats={pokemonAllData.stats}
						color={tinycolor(pokemonAllData.color)
							.lighten(10)
							.toHexString()}
					/>
				</div>

				<Button onClick={playAudio} title="Play Cry">
					<PlayCircleOutlineIcon
						style={{ fontSize: '4rem', color: secondaryColor }}
					></PlayCircleOutlineIcon>
				</Button>
				<audio id="poke-cry">
					<source src={pokemonAllData.cry} type="audio/ogg" />
					Your browser does not support the audio element.
				</audio>
			</>
		);
	}

	return (
		<>
			<Modal
				content={content}
				style={{
					backgroundColor: pokemonAllData.color,
					color: secondaryColor,
				}}
				onClose={onClose}
				isVisible={isVisible}
				closeBtnColor={secondaryColor}
			></Modal>
		</>
	);
}

export default PokeFullCard;
