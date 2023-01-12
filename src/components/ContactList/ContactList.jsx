import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ visibleContacts, onDeleteContact }) => {
  return (
    <ul>
      {visibleContacts.map(item => (
        <li key={item.id} className={css.contactListItem}>
          <span className={css.contact}>
            {item.name}: {item.number}
          </span>
          <button
            type="submit"
            className={css.contactBtn}
            onClick={() => onDeleteContact(item.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};