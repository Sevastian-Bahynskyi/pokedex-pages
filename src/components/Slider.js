function Slider({
	from = 0,
	to = 100,
	id = '',
	onChange,
	width = '20%',
	thumbColor = 'hsla(50,90%,50%,1)',
	backgroundColor = '#333',
	value,
}) {
	return (
		<>
			<input
				class="slider"
				id={to}
				type="range"
				min={from}
				max={to}
				value={value}
				onChange={onChange}
			></input>

			<style>
				{`
                .slider {
                    -webkit-appearance: none; 
                    appearance: none;
                    position: relative;
                    width: ${width};
                    height: 1.2em;
                    padding: 0.375em;
                    color: inherit;
                    background-color: ${backgroundColor};
                    border-radius: 1em;
                    outline: none;
                    min-width: 50px;
                }

                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none; 
                    appearance: none;
                    position: relative;
                    z-index: 10;
                    width: 1.5em;
                    height: 1.5em;
                    background-color: ${thumbColor};
                    border-radius: 50%;
                    cursor: pointer;
                }

                .slider::-moz-range-thumb {
                    position: relative;
                    z-index: 10;
                    width: 1.5em;
                    height: 1.5em;
                    background-color: ${backgroundColor};
                    border-radius: 50%;
                    cursor: pointer;
                }
            `}
			</style>
		</>
	);
}

export default Slider;
