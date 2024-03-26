import { useState, useEffect } from 'react';
import './PokeCard.css';

function PokeCard({ id, name, img, cardWidth }) {
	const style = {
		width: `${cardWidth}px`,
		height: `${cardWidth / 2}px`,
	};

	return (
		<div className="Poke-card" style={style}>
			<label class="poke-id">{id}</label>
			<h3 class="poke-name">{name}</h3>
			<img src={img} alt="nothing"></img>
		</div>
	);
}

export default PokeCard;
