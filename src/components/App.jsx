import { Component } from 'react';
import { Section } from './Section/Section';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';


export class App extends Component {
  state = {
    contacts: [ ],
    filter: '',
  };

  formSubmitHandler = data => {
    this.setState(prevState => {
      const hasName = prevState.contacts.find(
        item => item.name.toLowerCase() === data.name.toLowerCase()
      );
      if (hasName) {
        alert(`${data.name} is already in contacts`);
      }
      return {
        contacts: prevState.contacts.concat(data),
      };
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactId),
    }));
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({contacts: parseContacts})
    }    
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }
  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.formSubmitHandler}></Form>
        </Section>

        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            onChange={this.changeFilter}
          ></Filter>
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          ></ContactList>
        </Section>
      </>
    );
  }
}