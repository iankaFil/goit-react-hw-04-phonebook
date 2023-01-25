import css from './app.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const firstContact = localStorage.getItem('contacts');
    const contacts = firstContact ? JSON.parse(firstContact) : [];
    return contacts;
  });
  const [filterContact, setFilterContact] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const names = contacts.map(contact => contact.name.toLowerCase());
    const lowerCaseName = name.toLowerCase();

    if (names.indexOf(lowerCaseName) >= 0) {
      alert(name + ' is already in contacts');
      return;
    }
    setContacts([...contacts, { name, number, id: nanoid() }]);
  };
  const removeContact = idx => {
    setContacts(
      contacts.filter(contact => {
        return contact.id !== idx;
      })
    );
  };
  const handleFilter = e => {
    setFilterContact(e.currentTarget.value);
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filterContact.toLowerCase();
    const newArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return newArray;
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Phone<span className={css.titleAccent}>book</span>
      </h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.subtitle}>Contacts</h2>
      <Filter onChange={handleFilter} value={filterContact} />
      <ContactList contacts={getVisibleContacts()} onRemove={removeContact} />
    </div>
  );
};

export default App;
