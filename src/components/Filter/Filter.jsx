import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, onChange }) => {
  return (
      <label className={css.searchLabel}>
        <span className={css.searchTitle}>Find contacts by name</span>
      <input
        className={css.searchInput}
        type="text"
        value={filter}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};