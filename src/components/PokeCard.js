import { useState, useEffect } from 'react';
import '../styles/PokeCard.css';

function PokeCard({ pokemonData, cardWidth, color, onClick }) {
	const [nameChanged, setNameChanged] = useState(pokemonData.name);

	useEffect(() => {
		const maxNameSize = 20;

		const truncatedText =
			pokemonData.name.length > maxNameSize
				? pokemonData.name.slice(0, maxNameSize) + '...'
				: pokemonData.name;

		setNameChanged(truncatedText);
	}, []);

	const style = {
		width: `${cardWidth}px`,
		height: `${cardWidth / 2}px`,
		backgroundColor: color,
		borderRadius: `${cardWidth / 15}px`,
	};

	pokemonData.name =
		pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

	return (
		<div
			key={pokemonData.id}
			className="Poke-card"
			style={style}
			onClick={() => onClick(pokemonData)}
		>
			<div className="Poke-card-left-part">
				<label className="poke-id">#{pokemonData.id}</label>
				<h4
					style={{ fontSize: `${cardWidth / 15}px` }}
					className="poke-name"
				>
					{nameChanged}
				</h4>
			</div>
			<div className="Poke-card-right-part">
				<img src={pokemonData.front_image} alt="Don't cry Kasper :)" />
			</div>
		</div>
	);
}

export default PokeCard;
