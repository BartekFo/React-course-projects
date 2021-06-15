import React, { useState } from 'react';
import SingleColor from './SingleColor';

import Values from 'values.js';

function App() {
	const [color, setColor] = useState('');
	const [error, setError] = useState(false);
	const [select, setSelect] = useState(5);
	const [list, setList] = useState(new Values('#f15025').all(+select));

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			setError(false);
			let colors = new Values(color).all(+select);
			setList(colors);
			console.log(colors);
		} catch (error) {
			setError(true);
			console.log(error);
		}
	};

	return (
		<>
			<section className="container">
				<h3>color generator</h3>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={color}
						onChange={(e) => setColor(e.target.value)}
						placeholder="#f15025"
						className={`${error ? 'error' : null}`}
					/>
					<select
						value={select}
						onChange={(e) => setSelect(e.target.value)}
					>
						<option value="1">200</option>
						<option value="2">100</option>
						<option value="3">66</option>
						<option value="4">50</option>
						<option value="5">40</option>
						<option value="10">20</option>
						<option value="20">10</option>
					</select>
					<button className="btn" type="submit">
						submit
					</button>
				</form>
			</section>
			;
			<section className="colors">
				{list.map((color, index) => {
					return (
						<SingleColor
							key={index}
							{...color}
							index={index}
							hexColor={color.hex}
						/>
					);
				})}
			</section>
		</>
	);
}

export default App;
