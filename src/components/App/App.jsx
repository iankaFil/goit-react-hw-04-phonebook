import { Component } from 'react';
import css from './app.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addName = ({ name, number }) => {
    const names = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );
    const lowerCaseName = name.toLowerCase();

    if (names.indexOf(lowerCaseName) >= 0) {
      alert(name + ' is already in contacts');
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
      };
    });
  };
  removeName = idx => {
    this.setState(prevState => {
      let newContacts = [];
      prevState.contacts.forEach(contact => {
        if (contact.id !== idx) {
          newContacts.push(contact);
        }
      });
      return { contacts: newContacts };
    });
  };
  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    let { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const newArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return newArray;
  };
  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.title}>
          Phone<span className={css.titleAccent}>book</span>
        </h1>
        <ContactForm onSubmit={this.addName} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter onChange={this.handleFilter} value={filter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onRemove={this.removeName}
        />
      </div>
    );
  }
}

export default App;
