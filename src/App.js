import { useState, useEffect } from 'react';
import Slider from './components/Slider';
import './App.css';
import Button from '@mui/material/Button';
import PokeDex from './components/PokeDex';

function App() {
	return (
		<div className="App-main">
			<PokeDex></PokeDex>
		</div>
	);
}

export default App;
