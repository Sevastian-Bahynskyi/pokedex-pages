import { useState, useEffect } from 'react';
import Slider from './Slider';
import PokeGrid from './PokeGrid';
import './PokeDex.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import PokeFullCard from './PokeFullCard';

function PokeDex() {
	const [cardWidth, setCardWidth] = useState(200);
	const [columns, setColumns] = useState(4);
	const [pokemonUrlList, setPokemonUrlList] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [pagination, setPagination] = useState(50);
	const [pokeFullCardArgs, setPokeFullCardArgs] = useState({
		isVisible: false,
		pokemonUrl: null,
	});

	useEffect(() => {
		let ignore = false;

		fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${pagination}&offset=${
				(currentPage - 1) * pagination
			}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (!ignore) {
					const pokemonList = data.results.map((p) => p.url);
					setPokemonUrlList(pokemonList);
					setTotalPages(Math.ceil(data.count / pagination));
					if (currentPage > Math.ceil(data.count / pagination)) {
						setCurrentPage(Math.ceil(data.count / pagination));
					}
				}
			})
			.catch((error) =>
				console.error('Error fetching Pokémon data:', error)
			);

		return () => (ignore = true);
	}, [currentPage, pagination]);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const openFullCard = (pokemon) => {
		setPokeFullCardArgs({
			isVisible: true,
			pokemon: pokemon,
		});
	};

	const closeFullCard = () => {
		setPokeFullCardArgs((prevState) => ({
			...prevState,
			isVisible: false,
		}));
	};

	return (
		<div className="main">
			<div className="control-panel">
				<div className="my-slider">
					<label>Width of a dex: {cardWidth}</label>
					<Slider
						from={100}
						to={400}
						backgroundColor="#201E1F"
						thumbColor="#50B2C0"
						width="200px"
						value={cardWidth}
						onChange={(event) => setCardWidth(event.target.value)}
					/>
				</div>
				<div className="my-slider">
					<label>Pagination: {pagination}</label>
					<Slider
						from={15}
						to={150}
						backgroundColor="#201E1F"
						thumbColor="#50B2C0"
						width="200px"
						step={5}
						value={pagination}
						onChange={(event) => setPagination(event.target.value)}
					/>
				</div>
				<div className="pagination-buttons">
					<Button
						className="pagination-button App-pagination-button-previous"
						onClick={handlePreviousPage}
					>
						<NavigateBeforeIcon />
					</Button>

					<label>
						{currentPage}/{totalPages}
					</label>

					<Button
						className="pagination-button App-pagination-button-next"
						onClick={handleNextPage}
					>
						<NavigateNextIcon />
					</Button>
				</div>
			</div>
			<div className="chosen-pokemon-card">
				<PokeFullCard
					isVisible={pokeFullCardArgs.isVisible}
					pokemonSmallData={pokeFullCardArgs.pokemon}
					onClose={closeFullCard}
				/>
			</div>
			<div className="grid">
				<PokeGrid
					cardWidth={cardWidth}
					initialColumns={columns}
					pokeUrlList={pokemonUrlList}
					onPokeCardClick={openFullCard}
				/>
			</div>
		</div>
	);
}

export default PokeDex;
