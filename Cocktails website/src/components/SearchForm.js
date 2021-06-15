import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
	const { setSearchTerm } = useGlobalContext();
	const searachValue = React.useRef('');

	React.useEffect(() => {
		searachValue.current.focus();
	}, []);

	const searachCocktail = () => {
		setSearchTerm(searachValue.current.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<section className="search section">
			<form className="search-form" onSubmit={handleSubmit}>
				<div className="form-control">
					<label htmlFor="name">search your favourite cocktail</label>
					<input
						type="text"
						id="name"
						ref={searachValue}
						onChange={searachCocktail}
					/>
				</div>
			</form>
		</section>
	);
};

export default SearchForm;
