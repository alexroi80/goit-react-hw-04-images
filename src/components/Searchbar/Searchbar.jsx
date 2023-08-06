import { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { notificationOptions } from 'components/Notification/Notification';
import PropTypes from 'prop-types';

export const Searchbar =({onChange})=> {
const [searchQuery, setsearchQuery] = useState('');


  const handleSearchQuery = evt => {
   setsearchQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if (searchQuery.trim() === '') {
      return toast.warn('Please enter search query', notificationOptions);
    }

   onChange(searchQuery);
   form.reset();
  };


    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchQuery}
          />
        </form>
      </header>
    );
  }
Searchbar.propTypes = {
  onChange: PropTypes.func.isRequired,
};