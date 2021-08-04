import React, { useContext, useState } from 'react';
import AppContext from '../context/Context';

const SearchBar = () => {
  const {
    filterByName,
    filters,
    setFilters,
    deleteFilter,
    filterByNumericValues } = useContext(AppContext);
  const [filtersLocal, setFiltersLocal] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 'null',
  });

  const [dropdown, setdropdrown] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const handleChange = ({ target: { value } }) => {
    filterByName(value);
  };

  const handleFilter = ({ target: { name, value } }) => {
    setFiltersLocal({
      ...filtersLocal,
      [name]: value,
    });
  };

  const handleButton = (e) => {
    e.preventDefault();
    filterByNumericValues(filtersLocal);
    setdropdrown(dropdown.filter((item) => item !== filtersLocal.column));
    setFilters([
      ...filters,
      filtersLocal,
    ]);
  };

  return (
    <form>
      <section className="search-bar">
        <input
          type="text"
          name="searchText"
          id="searchText"
          onChange={ handleChange }
          data-testid="name-filter"
          className="input"
        />
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleFilter }
          required
        >
          {dropdown.map((item) => <option key={ item }>{item}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleFilter }
          required
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          onChange={ handleFilter }
          required
        />
        <button
          data-testid="button-filter"
          type="submit"
          onClick={ handleButton }
        >
          Filtrar
        </button>
        <div>
          {filters.map(({ column, comparison, value }, index) => (
            <>
              <span key={ column }>
                { `${column} ${comparison} ${value}`}
              </span>
              <button
                data-testid="filter"
                type="button"
                onClick={ () => deleteFilter(index) }
              >
                X
              </button>
            </>
          ))}
        </div>
      </section>
    </form>
  );
};

export default SearchBar;
