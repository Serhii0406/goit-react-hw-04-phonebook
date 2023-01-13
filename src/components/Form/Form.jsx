import { useState } from 'react';
import css from './Form.module.css'

export const Form = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleNumberChange = event => {
    setNumber(event.target.value)
  }

  const reset = () => {
    setName('');
    setNumber('');
  }
  const handleSubmit = event => {
    event.preventDefault();

    onSubmit({name, number});

    reset();
  };
      return (
        <form onSubmit={handleSubmit} className={css.form}>
            <label className={css.label}>
            <span className={css.formTitle}>Name</span>
          <input
            className={css.formInput}
            value={name}
            onChange={handleNameChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
            <label className={css.label}>
            <span className={css.formTitle}>Number</span>
          <input
            className={css.formInput}
            value={number}
            onChange={handleNumberChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
            <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
}