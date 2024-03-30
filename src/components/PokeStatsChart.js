import { useState, useEffect } from 'react';
import '../styles/PokeStatsChart.css';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	Filler,
	LineElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import hexRgb from 'hex-rgb';

function PokeStatsChart({ stats, color = 'white', max = 120 }) {
	ChartJS.register(
		RadialLinearScale,
		PointElement,
		LineElement,
		Filler,
		Tooltip,
		Legend
	);
	const data = {
		labels: stats.map((stat) =>
			(stat.name.charAt(0).toUpperCase() + stat.name.slice(1)).replace(
				'-',
				' '
			)
		),
		datasets: [
			{
				label: 'Stats',
				data: stats.map((stat) => stat.value),
				backgroundColor: hexRgb(color, { alpha: 0.6, format: 'css' }),
			},
		],
	};

	console.log(data.datasets[0].backgroundColor);

	const options = {
		responsive: false,
		maintainAspectRatio: false,
		scales: {
			r: {
				ticks: {
					color: 'black',
					backdropColor: 'transparent',
					max: { max },
					stepSize: 20,
				},
				label: {
					color: 'white',
				},
			},
		},
	};

	return (
		<div>
			<Radar className="radar-chart" data={data} options={options} />
		</div>
	);
}

export default PokeStatsChart;
