import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import styles from '../styles/resource.module.css';
import translations from '../assets/translations';


const Resource = ({ text, link, lang }) => (
  <p className={styles.resource}>
    {text}
    <a href={link} target="__blank" className={styles.link}>
      {translations.resourcesViewText[lang]}
    </a>
  </p>
);


Resource.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
};

export default Resource;
