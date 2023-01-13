import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contact => {
    const isIncontacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isIncontacts) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(), ...contact }]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(item => item.id !== contactId));
  };

  return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={formSubmitHandler}></Form>
        </Section>

        <Section title="Contacts">
          <Filter
            value={filter}
            onChange={changeFilter}
          ></Filter>
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteContact={deleteContact}
          ></ContactList>
        </Section>
      </>
    );
}