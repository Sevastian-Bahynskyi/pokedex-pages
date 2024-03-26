import { useState, useEffect } from 'react';
import Slider from './components/Slider';
import PokeGrid from './components/PokeGrid';
import './App.css';

function App() {
	const [cardWidth, setCardWidth] = useState(200);
	const [columns, setColumns] = useState(4);

	return (
		<div className="App-main">
			<div className="App-slider-holder">
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

			<div className="App-slider-holder">
				<label>Number of columns: {columns}</label>
				<Slider
					from={1}
					to={10}
					backgroundColor="#201E1F"
					thumbColor="#50B2C0"
					width="200px"
					value={columns}
					onChange={(event) => setColumns(event.target.value)}
				/>
			</div>

			<PokeGrid cardWidth={cardWidth} initialColumns={columns} />
		</div>
	);
}

export default App;
