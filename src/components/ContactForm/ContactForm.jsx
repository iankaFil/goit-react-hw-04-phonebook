// import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './contactForm.module.css';
import { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  // state = { name: '', number: '' };
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const handleChange = e => {
  //   const { name, value } = e.currentTarget;
  //   setName({ [name]: value });
  // };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.container} onSubmit={handleSubmit}>
      <label className={css.item}>
        <div className={css.wrap}>
          Name <span className={css.required}>*</span>
        </div>
        <input
          type="text"
          className={css.input}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className={css.item}>
        <div className={css.wrap}>
          Number <span className={css.required}>*</span>
        </div>
        <input
          type="tel"
          name="number"
          className={css.input}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => setNumber(e.target.value)}
        />
      </label>
      <button className={css.button}>Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
